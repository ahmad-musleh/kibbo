# Kibbo

A simple docker compose logger to a local directory.

## Setup

All you need is to add the following lines to your compose file:
```yaml
version: "3"
services:
  kibbo:
    image: musleh/kibbo:1.0.0
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./logs:/logs
```

Now you are logging all of your compose containers to `logs`
