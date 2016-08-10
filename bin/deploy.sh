#!/usr/bin/env bash
set -e

host=s3://dev.mockbrian.com
# host=s3://mockbrian.com

bundle exec jekyll build
convert favicon-16.png favicon.ico
s3cmd sync \
    --no-mime-magic \
    --acl-public \
    --no-progress \
    "_site/" \
    "$host/"
