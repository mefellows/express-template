#!/bin/bash -e

cat << EOF > .env
LOG_LEVEL=debug
LOG_PATH=logs/app-debug-development.tmp
API_ENDPOINT=http://localhost:5001/foo
STUB_HOST=localhost
STUB_PORT=2525
METRICS_ENABLED=false
METRICS_HOST=disabled
METRICS_PREFIX=disabled
ENVIRONMENT=development
VERSION=development
NODE_ENV=development
EOF
