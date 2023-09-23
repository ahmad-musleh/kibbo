FROM docker:cli
RUN apk update && apk add jq
COPY entrypoint.sh entrypoint.sh

ENTRYPOINT [ "sh", "entrypoint.sh" ]
