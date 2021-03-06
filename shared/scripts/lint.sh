#!/usr/bin/env bash

set -e

DIRS=(
  functions
  shared
  tools
)

for i in "${DIRS[@]}"; do
  cd $i
  eslint --ignore-pattern '**/dist/*' --ignore-pattern '**/.build/*' .
  cd ..
done

cd web
eslint  --config ../node_modules/eslint-config-react-app/index.js src scripts
cd ..
