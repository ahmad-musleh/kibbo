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
            opt_setting="optout"
    esac
}


run_loggers_on_currently_running_containers() {

    echo "Looking for runnning containers that want to be logged"
    # Get tsv of container ID and Name
    docker network inspect $network | jq -r ".[0].Containers | to_entries[] | [.key, .value.Name] | @tsv" | 
        while IFS=$'\t' read -r container_id container_name; do
            shortened_id=${container_id:0:12}
            if [ "$hostname" != "$shortened_id" ]
            then
                container_logging_label_active=$(docker container inspect "$container_id" | jq -r ".[0].Config.Labels.\"kibbo.config.logging.active\"" )
                logging_active=$(container_logging_status "$container_name" $container_logging_label_active)

                echo "$container_name has ID: $container_id and logging is $logging_active"

                case "$logging_active" in
                    "true")
                        echo "Running logs for $container_name"
                        run_logs_for_container "$container_id" "$container_name" &
                        ;;
                    *)
                        echo "Skipping logging for $container_name"
                        ;;
                esac
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

container_logging_status() {

    local container_name=$1
    local logging_status=$2

    echo "logging $container_name with logging_status set to: $logging_status" >&2

    case $logging_status in
        "false")
            echo "$container_name explicity set logging to false." >&2
            echo "false"
            ;;
        "true")
            echo "$container_name explicitly set logging to true" >&2
            echo "true"
            ;;
        *)
            echo "$container_name using default logging settings" >&2
            case "$opt_setting" in
                "optin")
                    echo "false"
                    ;;
                "optout")
                    echo "true"
                    ;;
            esac
            ;;
    esac
}

process_events() {
    docker events --filter 'event=start' --format '{{json .}}' | while read event
    do
        local container_id
        local container_name
        local logging_active

        container_id=$(echo "$event" | jq ".Actor.ID")
        container_name=$(echo "$event" | jq ".Actor.Attributes.name")
        container_logging_label_active=$(echo "$event" | jq -r ".Actor.Attributes.\"kibbo.config.logging.active\"" )
        logging_active=$(container_logging_status "$container_name" $container_logging_label_active)

        echo "$container_name has ID: $container_id and logging is $logging_active"

        case "$logging_active" in
            "true")
                echo "Running logs for $container_name"
                run_logs_for_container "$container_id" "$container_name" &
                ;;
            *)
                echo "Skipping logging for $container_name"
                ;;
        esac
    done
}

main() {
    setup_etcd
    set_hostname
    set_network
    set_opt_in_out
    set_file_redirect_operator
    set_timestamps_arg

    run_loggers_on_currently_running_containers
    process_events

}

main
