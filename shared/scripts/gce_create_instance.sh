#!/usr/bin/env bash

source "${BASH_SOURCE%/*}/utils.sh"

echo -e "\n${BLUE}Creating Google Cloud Instance ${GCE_INSTANCE_NAME}...${NC}"
gcloud compute \
  --project $GOOGLE_PROJECT_ID instances create $GCE_INSTANCE_NAME \
  --zone "us-east1-b" \
  --machine-type "f1-micro" \
  --scopes "https://www.googleapis.com/auth/cloud-platform" \
  --image "debian-9-stretch-v20180227" \
  --image-project "debian-cloud" \
  --metadata startup-script='#! /bin/bash
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn nodejs build-essential jq
wget https://github.com/dshearer/jobber/releases/download/v1.3.2/jobber_1.3.2-1_amd64_deb9.deb -P /tmp
sudo dpkg -i /tmp/jobber_1.3.2-1_amd64_deb9.deb
sudo apt-get install -f'
