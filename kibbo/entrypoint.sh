cleanup() {
    echo "Received SIGINT/SIGTERM signal. Stopping all logging jobs"
    exit 0
}

trap 'cleanup' SIGINT SIGTERM

hostname=$(cat /etc/hostname)
echo "hostname is $hostname"

network=$(docker ps --format json | jq -r 'select(.ID=="'$hostname'") | .Networks')

echo "Network is $network"
# Get tsv of container ID and Name
docker network inspect $network | jq -r ".[0].Containers | to_entries[] | [.key, .value.Name] | @tsv" | 
    while IFS=$'\t' read -r container_id container_name; do
        shortened_id=${container_id:0:12}
        if [ "$hostname" != "$shortened_id" ]
        then
            # Log all containers but this one
            echo "Short ID: $shortened_id Name: $container_name ID: $container_id";
            docker logs -f --timestamps $container_id >& "/logs/$container_name.log" &
        fi
    done
while true; do
    sleep 1; # TODO: wait for all background processes to exit instead
done
