#!/usr/bin/env bash
set -e

BASE_URL="http://localhost:3000"

echo "Checking API health..."

curl \
  --fail \
  "$BASE_URL/api/v1/health"

echo

echo "API Gateway is healthy."

echo "Testing user endpoint..."

if curl \
  --silent \
  --fail \
  "$BASE_URL/api/v1/users/test-id"; then

  echo
  echo "User endpoint responded."

else
  echo
  echo "User endpoint returned an expected application error."

fi