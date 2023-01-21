#!/bin/sh

set -e

echo "migrate for deployment"
sudo npm run migrate:dev
echo "migration success"

echo "generate database"
sudo npm run generate
echo "generate success"

echo "Seeding database"
sudo npm run  dbseed
echo "seeding success"


echo "start app"
exec "$@"