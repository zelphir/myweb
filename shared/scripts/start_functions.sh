#!/usr/bin/env bash

source .env

NODE_ENV=development \
X_CLIENT_ID=$X_CLIENT_ID \
nodemon --watch src --exec "yarn serve"
