#!/usr/bin/env bash

FUNCTION=${1:-instagram}

functions-emulator start
nodemon \
  --watch src \
  --watch ../shared \
  -e js,graphql,gql \
  --exec "yarn build && functions-emulator deploy $FUNCTION --trigger-http --local-path=.build"
functions-emulator stop
