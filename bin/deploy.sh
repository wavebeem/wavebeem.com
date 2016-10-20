#!/usr/bin/env bash
set -e

cf_distro="E1ENR65WLK5LCW"
dev="s3://dev.mockbrian.com"
prod="s3://mockbrian.com"

bundle exec jekyll build
convert favicon-16.png favicon-32.png favicon.ico

cd _site
if [[ $1 = "-p" ]]; then
  aws s3 sync --acl public-read ./ "$prod"
  aws cloudfront create-invalidation \
    --distribution-id "$cf_distro" \
    --paths "/*"
else
  aws s3 sync --acl public-read ./ "$dev"
fi
