#!/usr/bin/env bash

export $(cat .env | grep -v ^# | xargs)

IMAGE="gcr.io/${GOOGLE_PROJECT_ID}/cron"

yarn precron
cd gce-cron
cp ../package.json .
mv ../.build .
docker build -t gce-cron .
docker tag gce-cron $IMAGE
gcloud docker -- push $IMAGE
rm -rf .build package.json
