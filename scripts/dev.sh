#!/usr/bin/env bash

set -e

./scripts/dev-infra.sh

echo "Starting Barber Platform..."

pnpm dev