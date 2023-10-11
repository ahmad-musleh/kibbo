cleanup() {
    echo "Received SIGINT/SIGTERM signal. Stopping all logging jobs"
    exit 0
}

trap 'cleanup' SIGINT SIGTERM

setup_etcd()
{
    echo "Setting up etcd"
    mkdir -p /run/openrc
    touch /run/openrc/softlevel
    rc-update add etcd
    rc-status -a
    rc-service etcd start
}

check_if_logger_running() {
    local key=$1

    container_status=$(etcdctl get $key)
    if [ -z "$container_status" ]; then
        echo 0
        return
    else
        echo 1
        return
    fi
}

run_logs_for_container() {
    local container_id=$1
    local container_name=$2

    if [ "$APPEND" = "TRUE" ]; then
        local append=">>"
    else
        local append=">"
    fi

    if [ "$INCLUDE_TIMESTAMPS" = "TRUE" ]; then
        local include_timestamps="--timestamps"
    else
        local include_timestamps=""
    fi

    echo "Inserting $container_name into etcd"

    etcdctl put "$container_id" "$container_name"

    command="docker logs -f $include_timestamps $container_id $append /logs/$container_name.log 2>&1"
    eval "$command"

    echo "Removing $container_name from etcd"
    etcdctl del $container_id

}


check_and_update_loggers() {
    # Get tsv of container ID and Name
    docker network inspect $network | jq -r ".[0].Containers | to_entries[] | [.key, .value.Name] | @tsv" | 
        while IFS=$'\t' read -r container_id container_name; do
            shortened_id=${container_id:0:12}
            if [ "$hostname" != "$shortened_id" ]
            then
                
                logger_running=$(check_if_logger_running "$container_id")

                if [ $logger_running -eq "0" ]; then
                    echo "$container_name logger not started. Starting..."
                    run_logs_for_container "$container_id" "$container_name" &
                    
                else
                    echo "$container_name logger running already. Skipping..."
                fi
            fi
        done
    return
}

setup_etcd

hostname=$(cat /etc/hostname)
etcdctl put hostname $hostname
echo "hostname is $hostname"
network=$(docker ps --format json | jq -r 'select(.ID=="'$hostname'") | .Networks')
etcdctl put network $network
echo "Network is $network"

while true; do
    check_and_update_loggers;
    sleep 10; # TODO: wait for all background processes to exit instead
done
