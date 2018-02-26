#!/usr/bin/env bash

set -e

RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
NC='\033[0m' # no color

trap 'echo -e "
${RED}
================== ERROR ====================
|                                           |
|     Please create the .env file           |
|                                           |
=============================================
${NC}
"' ERR
[[ -f "../.env" ]]
trap - ERR

ENV=${1:-production}
DOTENV="../.env.${ENV}"

if [[ ! -f "$DOTENV" ]]; then
  DOTENV="../.env"
fi

export $(cat $DOTENV | grep -v ^# | xargs)

VARIABLES=($(sed -r '/^(\s*#|$)/d;' ../.env.sample))

for v in "${VARIABLES[@]}" ; do
  var=${v%=}
  trap 'echo -e "${RED}
================== ERROR ====================

        ${var} is not set

=============================================
${NC}"' ERR
  [[ ! -z ${!var} ]]
  trap - ERR
done
