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

VARIABLES=($(sed -r '/^(\s*#|$)/d;s/="?(.*)"?//g' ../.env))
SCHEMA=($(sed -r '/^(\s*#|$)/d;s/=//g' ../.env.example))

for v in "${SCHEMA[@]}" ; do
  var=${v}
  trap 'echo -e "${RED}
================== ERROR ====================

        ${var} is not set

=============================================
${NC}"' ERR
  [[ ${VARIABLES[*]} =~ $var ]]
  trap - ERR
done

ENV=${1:-production}
DOTLOCAL="../.env"
DOTENV="../.env.${ENV}"

export $(cat $DOTLOCAL | grep -v ^# | xargs)
export $(cat $DOTENV | grep -v ^# | xargs)
