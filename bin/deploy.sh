#!/bin/bash

set -e

BASE_DIR=$(dirname $(dirname $(realpath $0)))

cd "$BASE_DIR"

cp -f www/.maintenance.php www/maintenance.php

rm -rf "$BASE_DIR/temp/cache/*"

git reset --hard
git pull
composer install
bower install
npm install
./node_modules/.bin/grunt

rm www/maintenance.php
