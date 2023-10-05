FROM docker:cli
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories 
RUN apk update && apk add jq etcd etcd-ctl openrc
COPY . .
ENTRYPOINT [ "sh", "entrypoint.sh" ]
