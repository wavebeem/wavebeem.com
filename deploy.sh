#!/bin/bash
set -e

# host=s3://dev.mockbrian.com
host=s3://mockbrian.com

Sync() {
    s3cmd sync --acl-public --no-progress "$@" "$host"
}

files=(
    index.html
    style.css
    me.jpg
    bootstrap
    resume
)

make

for file in "${files[@]}"; do
    Sync "$file"
done
