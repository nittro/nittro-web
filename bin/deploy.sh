#!/bin/bash

BASE_DIR=$(dirname $(dirname $(realpath $0)))

export COMPOSER_HOME="$BASE_DIR/.composer"

function deploy {
    set -e

    rm -rf temp/cache/*

    git reset --hard
    git pull
    composer install
    bower install
    npm install
    ./node_modules/.bin/grunt

}

cd "$BASE_DIR"

cp -f www/.maintenance.php www/maintenance.php

deploy

rm www/maintenance.php
