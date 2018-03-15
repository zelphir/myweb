#!/usr/bin/env bash

set -e

DIRS=(
  functions
  shared
  tools
  web
)

for i in "${DIRS[@]}"; do
  cd $i
  eslint --ignore-pattern '**/dist/*' --ignore-pattern '**/.build/*' .
  cd ..
done
