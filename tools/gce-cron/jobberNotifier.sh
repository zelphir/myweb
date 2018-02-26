#!/usr/bin/env bash

LOG=$(cat - | jq .)

SUCCESS=$(echo $LOG | jq '.succeeded')
STDOUT=$(echo $LOG | jq '.stdout')
STDERR=$(echo $LOG | jq '.stderr')

if [[ $SUCCESS = "true" ]]; then
  if [[ ! $STDOUT =~ "Skipping" ]]; then
    gcloud logging write --severity=INFO cron-log "${STDOUT}"
  fi
else
  gcloud logging write --severity=ERROR cron-log "${STDERR}"
fi
