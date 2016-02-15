#!/bin/bash

BASE_DIR=$(dirname $(dirname $(realpath $0)))
set -e


cd "$BASE_DIR"

cp -f www/.maintenance.php www/maintenance.php

rm -rf temp/cache/*
HOME="$BASE_DIR/.home" git reset --hard
HOME="$BASE_DIR/.home" git pull
HOME="$BASE_DIR/.home" composer install
HOME="$BASE_DIR/.home" bower install
HOME="$BASE_DIR/.home" npm install
HOME="$BASE_DIR/.home" ./node_modules/.bin/grunt

rm www/maintenance.php
