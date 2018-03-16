#!/usr/bin/env bash

FUNCTION=${1:-instagram}

functions-emulator start

nodemon \
  --watch src \
  --watch ../shared \
  -e js,graphql,gql \
  --exec "NODE_ENV=development \
    yarn build src/${FUNCTION}.js --env.fnName=${FUNCTION} && \
    cd .build/${FUNCTION} && \
    functions-emulator deploy $FUNCTION --trigger-http"

functions-emulator stop
