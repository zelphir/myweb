#!/usr/bin/env bash

source .env

FUNCTION=${1:-instagram}

NODE_ENV=production \
X_CLIENT_ID=$X_CLIENT_ID \
  yarn build && \
  cd build && \
  gcloud beta functions deploy $FUNCTION --trigger-http
