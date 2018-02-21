#!/usr/bin/env bash

export $(cat .env | grep -v ^# | xargs)

gcloud beta compute \
  instances \
  update-container \
  gce-cron \
  --container-image "gcr.io/${GOOGLE_PROJECT_ID}/cron"
