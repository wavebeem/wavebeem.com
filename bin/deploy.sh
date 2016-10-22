#!/usr/bin/env bash
set -e

cf_distro="E1ENR65WLK5LCW"
dev="s3://dev.mockbrian.com"
prod="s3://mockbrian.com"

convert favicon-16.png favicon-32.png favicon.ico

if [[ $1 = "-p" ]]; then
  bundle exec jekyll build
  aws s3 sync --acl public-read _site/ "$prod"
  aws cloudfront create-invalidation \
    --distribution-id "$cf_distro" \
    --paths "/*"
else
  bundle exec jekyll build --drafts
  aws s3 sync --acl public-read _site/ "$dev"
fi
