#!/usr/bin/env bash

export $(cat .env | grep -v ^# | xargs)

FUNCTION=${1:-instagram}

NODE_ENV=production \
  yarn build && \
  cd .build && \
  gcloud beta functions deploy $FUNCTION --trigger-http
