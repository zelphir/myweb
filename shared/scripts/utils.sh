#!/usr/bin/env bash

export $(cat ../.env.production | grep -v ^# | xargs)
