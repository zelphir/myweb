#!/usr/bin/env bash

LOG=$(cat - | jq .)
SUCCESS=$(echo $LOG | jq '.succeeded')
STDOUT=$(echo $LOG | jq -c '.stdout|fromjson')
STDERR=$(echo $LOG | jq '.stderr')

if [[ $SUCCESS = "true" ]]; then
  if [[ ! $STDOUT =~ "Skipping" ]]; then
    # NOTE: wrap variablein single quote
    gcloud logging write --severity=INFO --payload-type=json cron-log ''"$STDOUT"''
  fi
else
  gcloud logging write --severity=ERROR cron-log "${STDERR}"
fi
