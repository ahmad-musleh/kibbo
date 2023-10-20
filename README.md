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

If you are interested in having your logs persisted across services updates (ie. Your logs stay if you rebuild and deploy the same service.) then all you need to do is add the following to the yaml above:

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
      - kibbo.config.log_file_update_mode=append
```

## Timestamps

Timestamps can be included in the logs. Just add `- kibbo.config.log_file_include_timestamps=true` to the following:

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
      - kibbo.config.log_file_include_timestamps=true
```

## Opt Out: Excluding services

You can exclude a specific service if you have the default setting of Opt Out by adding the following to your service yaml.

```yaml
    labels:
      - kibbo.config.logging.active=false
```

Full example:

```yaml
version: "3"
services:
  example:
    image: hello-world:latest
    labels:
      - kibbo.config.logging.active=false
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    labels:
      - kibbo.config.log_mode=optout
      - kibbo.config.log_file_include_timestamps=true

```

## Opt In: Include specific services

With opt-in you are in control of which service to have logged. Opt-In by adding the following to your service yaml.

```yaml
    labels:
      - kibbo.config.logging.active=true
```

And modify the default opt mode in the main service.

```yaml
      - kibbo.config.log_mode=optin
```

Full example:

```yaml
version: "3"
services:
  example:
    image: hello-world:latest
    labels:
      - kibbo.config.logging.active=true
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    labels:
      - kibbo.config.log_mode=optin
      - kibbo.config.log_file_include_timestamps=true

```

## Service level overrides

You can customize specific services using the same flags for logging, file redirect and timestamps using the same labels:

```yaml
version: "3"
services:
  example_1:
    image: hello-world:latest
    labels:
      - kibbo.config.logging.active=true
  example_2:
    image: hello-world:latest
    labels:
      - kibbo.config.logging.active=true
      - kibbo.config.log_file_update_mode=append
  example_3:
    image: hello-world:latest
    labels:
      - kibbo.config.logging.active=true
      - kibbo.config.log_file_update_mode=replace
      - kibbo.config.log_file_include_timestamps=false
  kibbo:
    image: musleh/kibbo:latest
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
    labels:
      - kibbo.config.log_mode=optin
      - kibbo.config.log_file_include_timestamps=true

```