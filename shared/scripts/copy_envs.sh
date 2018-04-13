#!/usr/bin/env bash

ENV=${1:-.env}

sed -e 's/#.*$//' -e '/^$/d' -e 's/^/REACT_APP_/' ../$ENV > $ENV
