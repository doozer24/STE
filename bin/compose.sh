#!/usr/bin/env bash
cat docker-compose.yml | /usr/local/bin/docker-compose -f selenium.yml -f - "$@"
