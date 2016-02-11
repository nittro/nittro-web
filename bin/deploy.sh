#!/bin/bash

BASE_DIR=$(dirname $(dirname $(realpath $0)))
set -e


cd "$BASE_DIR"

cp -f www/.maintenance.php www/maintenance.php

rm -rf temp/cache/*
git reset --hard
git pull
COMPOSER_HOME="$BASE_DIR/.composer" composer install
bower install
npm install
./node_modules/.bin/grunt

rm www/maintenance.php
