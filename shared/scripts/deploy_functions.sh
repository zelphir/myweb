#!/usr/bin/env bash

FUNCTION=${1:-instagram}

if [ $1 = "web" ]; then
  cd ../web
  rm -rf .next
  yarn build
  cd -
fi

NODE_ENV=production \
  yarn build src/$FUNCTION.js --env.fnName=$FUNCTION && \
  cd .build/$FUNCTION && \
  gcloud beta functions deploy $FUNCTION --trigger-http
