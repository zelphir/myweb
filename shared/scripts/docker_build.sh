#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

IMAGE="gcr.io/${GOOGLE_PROJECT_ID}/cron"

NODE_ENV=production yarn precron

cd gce-cron
cp ../package.json .build
docker build -t gce-cron .
docker tag gce-cron $IMAGE
gcloud docker -- push $IMAGE
