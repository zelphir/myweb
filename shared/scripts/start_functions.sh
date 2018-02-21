#!/usr/bin/env bash

FUNCTION=${1:-instagram}

functions-emulator start
nodemon \
  --watch src \
  -e js,graphql \
  --exec "yarn build && functions-emulator deploy $FUNCTION --trigger-http --local-path=.build"
functions-emulator stop
