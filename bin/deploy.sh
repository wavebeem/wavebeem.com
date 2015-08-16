#!/usr/bin/env bash
set -e

# host=s3://dev.mockbrian.com
host=s3://mockbrian.com

Sync() {
    s3cmd sync \
        --no-mime-magic \
        --acl-public \
        --no-progress \
        "$1" "$host/"
}

Sync _site/ /
