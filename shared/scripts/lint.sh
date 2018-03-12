#!/usr/bin/env bash

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
