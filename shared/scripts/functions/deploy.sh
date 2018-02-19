#!/usr/bin/env bash

rm -rf ../build
mkdir -p ../build
rsync -avz -q --exclude "node_modules/" --exclude "yarn.lock" build/* ../build
firebase deploy --only $1
