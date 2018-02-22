#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

gcloud beta compute \
  instances \
  update-container \
  gce-cron \
  --container-image "gcr.io/${GOOGLE_PROJECT_ID}/cron"
