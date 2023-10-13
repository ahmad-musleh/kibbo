# Kibbo

A simple docker compose logger to a local directory.

![main branch status](https://github.com/ahmad-musleh/kibbo/actions/workflows/push-image.yaml/badge.svg)
## Setup

All you need is to add the following lines to your compose file:
```yaml
version: "3"
services:
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    labels:
      - kibbo.config.log_mode=optout
```

Now you are logging all of your compose containers to `logs`

## Persisted Logs

If you are interested in having your logs persisted across services updates (ie. You logs to stay if you rebuild and deploy the same service.) then all you need to do is add the following to the yaml above:

```yaml
version: "3"
services:
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    labels:
      - kibbo.config.log_mode=optout
      - kibbo.config.logfile_update_mode=append
```

## Timestamps

Timestamps can also be included in the logs. Just add `- INCLUDE_TIMESTAMPS=TRUE` to the following:

```yaml
version: "3"
services:
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    environment:
     - INCLUDE_TIMESTAMPS=TRUE
```
