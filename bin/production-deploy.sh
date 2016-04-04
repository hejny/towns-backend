#!/bin/bash

# format current date
NOW=$(date +"%F_%H%M%S")

# copy and symlink new build
cp -r $PWD /var/www/omega_towns_cz/api-$NOW
rm /var/www/omega_towns_cz/current
ln -s /var/www/omega_towns_cz/api-$NOW /var/www/omega_towns_cz/current

# replace test .env file with staging
cp /var/www/ci_towns_cz/dotenv/.env.production /var/www/omega_towns_cz/api-$NOW/.env

# restart node server
# pm2 start /var/www/omega_towns_cz/current/bin/www --name omega-api
pm2 restart omega-api

# TODO: remove old build
# sudo rm -rf /var/www/omega_towns_cz/nieco