#!/bin/bash

# format current date
NOW=$(date +"%F_%H%M%S")

# copy and symlink new build
cp -r $PWD /var/www/alpha_towns_cz/api-$NOW
rm /var/www/alpha_towns_cz/current
ln -s /var/www/alpha_towns_cz/api-$NOW /var/www/alpha_towns_cz/current

# replace test .env file with staging
cp /var/www/ci_towns_cz/dotenv/.env.alpha /var/www/alpha_towns_cz/api-$NOW/.env

# restart node server
# pm2 start /var/www/alpha_towns_cz/current/bin/www --name alpha-api
pm2 restart alpha-api

# TODO: remove old build
# sudo rm -rf /var/www/alpha_towns_cz/nieco