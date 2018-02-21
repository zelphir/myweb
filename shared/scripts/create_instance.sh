#!/usr/bin/env bash

export $(cat .env | grep -v ^# | xargs)

gcloud beta compute \
  --project "${GOOGLE_PROJECT_ID}" instances create-with-container "gce-cron" \
  --zone "us-east1-b" \
  --machine-type "f1-micro" \
  --image "cos-stable-64-10176-62-0" \
  --image-project "cos-cloud" \
  --boot-disk-device-name "gce-cron" \
  --container-image "gcr.io/${GOOGLE_PROJECT_ID}/cron" \
  --container-restart-policy "always"
