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

set_file_redirect_operator() {
    local append
    append=$(eval "docker container inspect $hostname | jq -r \".[0].Config.Labels.\\\"kibbo.config.log_file_update_mode\\\"\"")

    case $append in
        "append")
            echo "Log file redirect mode: append"
            file_redirect_operator=">>"
            ;;
        "replace")
            echo "Log file redirect mode: replace"
            file_redirect_operator=">"
            ;;
        *)
            echo "Invalid redirect mode: $append. Defaulting to replace"
            file_redirect_operator=">"
    esac
}

set_timestamps_arg() {
    local include_timestamps
    include_timestamps=$(eval "docker container inspect $hostname | jq -r \".[0].Config.Labels.\\\"kibbo.config.log_file_include_timestamps\\\"\"")

    case $include_timestamps in
        "true")
            echo "Log file include timestamps: true"
            log_file_include_timestamps="--timestamps"
            ;;
        "false")
            echo "Log file include timestamps: false"
            log_file_include_timestamps=""
            ;;
        *)
            echo "Invalid include timestamps option: $append. Defaulting to true"
            log_file_include_timestamps="--timestamps"
    esac
}


run_logs_for_container() {
    local container_id=$1
    local container_name=$2

    echo "Inserting $container_name into etcd"

    etcdctl put "$container_id" "$container_name"

    command="docker logs -f $include_timestamps $container_id $file_redirect_operator /logs/$container_name.log 2>&1"
    eval "$command"

    echo "Removing $container_name from etcd"
    etcdctl del $container_id
}

set_opt_in_out() {
    opt_setting=$(eval "docker container inspect $hostname | jq -r \".[0].Config.Labels.\\\"kibbo.config.log_mode\\\"\"")
    case $opt_setting in
        "optout")
            echo "Services: Opt out"
            ;;
        "replace")
            echo "Services: Opt in"
            ;;
        *)
            echo "Invalid opt mode: $opt_setting. Defaulting to Opt out"
    esac
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

set_hostname() {
    hostname=$(cat /etc/hostname)
    etcdctl put hostname $hostname
    echo "Hostname: $hostname"
}

set_network() {
    network=$(docker ps --format json | jq -r 'select(.ID=="'$hostname'") | .Networks')
    etcdctl put network $network
    echo "Network: $network"
}

main() {
    setup_etcd
    set_hostname
    set_network
    set_opt_in_out
    set_file_redirect_operator
    set_timestamps_arg

    while true; do
        check_and_update_loggers;
        sleep 10; # TODO: wait for all background processes to exit instead
    done
}

main