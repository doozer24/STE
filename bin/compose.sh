#!/usr/bin/env bash
cat docker-compose.yml | docker-compose -f - "$@"
