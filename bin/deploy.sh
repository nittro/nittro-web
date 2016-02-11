#!/bin/bash

set -e

BASE_DIR=$(dirname $(dirname $(realpath $0)))

cd "$BASE_DIR"

rm -rf "$BASE_DIR/temp/cache/*"

composer install
bower install
npm install
./node_modules/.bin/grunt
