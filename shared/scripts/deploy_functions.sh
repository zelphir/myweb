#!/usr/bin/env bash

FUNCTION=${1:-instagram}

NODE_ENV=production \
  yarn build src/$FUNCTION.js --env.fnName=$FUNCTION && \
  cd .build/$FUNCTION && \
  gcloud beta functions deploy $FUNCTION --trigger-http
