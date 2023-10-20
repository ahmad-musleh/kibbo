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
        echo "false"
        return
    else
        echo "true"
        return
    fi
}

container_logging_set_to_active(){
    local container_id=$1
    local status

    status=$(eval "docker container inspect $container_id | jq -r \".[0].Config.Labels.\\\"kibbo.config.logging.active\\\"\"")

    case $status in
        "true")
            echo "true"
            ;;
        "false")
            echo "false"
            ;;
        *)
            case $opt_setting in
                "optout")
                    echo "true"
                    ;;
                "optin")
                    echo "false"
                    ;;
            esac
    esac

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

get_file_redirect_operator() {
    echo "$file_redirect_operator"
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

get_timestamps_arg() {
    echo "$log_file_include_timestamps"
}


run_logs_for_container() {
    local container_id=$1
    local container_name=$2
    local include_timestamps=$3
    local file_redirect_operator=$4

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
        "optin")
            echo "Services: Opt in"
            ;;
        *)
            echo "Invalid opt mode: $opt_setting. Defaulting to Opt out"
            opt_setting="optout"
    esac
}

get_is_opt_out() {
    case "$opt_setting" in
        "optin")
            echo "false"
            ;;
        "optout")
            echo "true"
            ;;
    esac
}

get_container_info() {
    local container_id
    container_id=$1

    local inspect_result
    inspect_result=$(eval "docker container inspect $container_id")
    
    echo "$inspect_result"

}

container_network_membership() {
    local container_id
    local network_name

    container_id=$1
    network_name=$2

    local membership
    membership="docker ps --no-trunc --format json | jq -r 'select(.ID==\"$container_id\") | .Networks==\"$network_name\"'"
    membership=$(eval "$membership")

    echo "$membership"
    
}

process_container() {
    local container_id
    local container_name
    container_id=$1
    container_name=$2

    local member
    member=$(container_network_membership "$container_id" "$(get_network)")

    if [ "$member" == "false" ]
    then
        return
    fi
    
    local container_info
    container_info=$(get_container_info "$container_id")

    local logging_status
    logging_status=$(check_logging_active_status "$container_info")

    if [ "$logging_status" == "false" ]
    then
        return
    fi

    local file_redirect
    file_redirect=$(check_file_redirect_status "$container_info")

    local timestamps_override
    timestamps_override=$(check_timestamps_override "$container_info")

    echo "$container_name:"
    echo "  id: $container_id"
    echo "  logging_status: $logging_status"
    echo "  file redirect: $file_redirect"
    echo "  timestamps override: $timestamps_override"

    run_logs_for_container "$container_id" "$container_name" "$timestamps_override" "$file_redirect" &

}


process_currently_running_containers() {

    echo "Looking for runnning containers that want to be logged"
    # Get tsv of container ID and Name
    docker network inspect $network | jq -r ".[0].Containers | to_entries[] | [.key, .value.Name] | @tsv" | 
        while IFS=$'\t' read -r container_id container_name; do
            shortened_id=${container_id:0:12}
            if [ "$hostname" != "$shortened_id" ]
            then
                process_container "$container_id" "$container_name"
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

get_network() {
    echo "$network"
}

check_logging_active_status() {

    local container_info
    container_info=$1

    local logging_status
    logging_status=$(echo $container_info | jq -r ".[0].Config.Labels.\"kibbo.config.logging.active\"")

    case $logging_status in
        "false")
            echo "false"
            ;;
        "true")
            echo "true"
            ;;
        *)
            echo $(get_is_opt_out)
    esac
}

check_file_redirect_status() {
    # check manual file redirect override for container
    local container_info
    container_info=$1

    local file_redirect_override
    file_redirect_override=$(echo $container_info | jq -r ".[0].Config.Labels.\"kibbo.config.log_file_update_mode\"")

    case $file_redirect_override in
        "append")
            echo ">>"
            ;;
        "replace")
            echo ">"
            ;;
        *)
            echo $(get_file_redirect_operator)
    esac

}

check_timestamps_override(){
    # check manual timestamps override for container

    local container_info
    container_info=$1

    local timestamps_override
    timestamps_override=$(echo $container_info | jq -r ".[0].Config.Labels.\"kibbo.config.log_file_include_timestamps\"")

    case $timestamps_override in
        "true")
            echo "--timestamps"
            ;;
        "false")
            echo ""
            ;;
        *)
            echo $(get_timestamps_arg)
    esac

}

process_events() {

    process_currently_running_containers

    docker events --filter 'event=start' --format '{{json .}}' | while read event
    do
        local container_id
        local container_name

        container_id=$(echo "$event" | jq -r ".Actor.ID")
        container_name=$(echo "$event" | jq -r ".Actor.Attributes.name")
        
        process_container "$container_id" "$container_name"

    done
}

main() {
    setup_etcd
    set_hostname
    set_network
    set_opt_in_out
    set_file_redirect_operator
    set_timestamps_arg

    process_events

}

main
