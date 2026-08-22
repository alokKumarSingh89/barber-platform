#!/usr/bin/env bash

set -e

echo "Starting development infrastructure..."

docker compose \
  -f infrastructure/docker/docker-compose.yml \
  up -d

echo "Waiting for PostgreSQL..."

until docker exec barber-postgres \
  pg_isready \
  -U barber \
  -d barber \
  > /dev/null 2>&1
do
  sleep 1
done

echo "PostgreSQL is ready."

echo "Waiting for NATS..."

until curl \
  --silent \
  --fail \
  http://localhost:8222/healthz \
  > /dev/null
do
  sleep 1
done

echo "NATS is ready."

echo "Infrastructure ready."