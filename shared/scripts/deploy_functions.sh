#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

FUNCTION=${1:-instagram}

NODE_ENV=production \
  yarn build && \
  cd .build && \
  gcloud beta functions deploy $FUNCTION --trigger-http
