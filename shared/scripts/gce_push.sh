#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

NODE_ENV=production yarn precron

cd gce-cron

echo -e "\n${BLUE}Copying files...${NC}"
gcloud compute scp .build/* .jobber jobberNotifier.sh cron:~ \
  --zone=us-east1-b

echo -e "\n${BLUE}Installing node dependencies...${NC}"
gcloud compute ssh cron \
  --zone=us-east1-b \
  --command="sudo mv jobberNotifier.sh /usr/local/bin && yarn && jobber reload"
