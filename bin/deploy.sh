#!/bin/bash
set -e

# host=s3://dev.mockbrian.com
host=s3://mockbrian.com

Sync() {
    s3cmd sync \
        --no-mime-magic \
        --acl-public \
        --no-progress \
        "$@" "$host"
}

files=(
    favicon.ico
    index.html
    style.css
    me.jpg
    bootstrap
    resume
)

for file in "${files[@]}"; do
    Sync "$file"
done
