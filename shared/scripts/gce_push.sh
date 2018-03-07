#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

NODE_ENV=production yarn build:cron

cd gce-cron

echo -e "\n${BLUE}Copying files...${NC}"
gcloud compute scp .build/* .jobber jobberNotifier.sh $GCE_USERNAME@$GCE_INSTANCE_NAME:~ \
  --zone=us-east1-b

echo -e "\n${BLUE}Installing node dependencies...${NC}"
gcloud compute ssh $GCE_USERNAME@$GCE_INSTANCE_NAME \
  --zone=us-east1-b \
  --command="sudo mv jobberNotifier.sh /usr/local/bin && yarn && jobber reload"
