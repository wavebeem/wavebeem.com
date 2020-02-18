#!/usr/bin/env bash
set -eux

convert "static/favicon-16.png" -scale "32x32" "static/favicon-32.png"

for size in 180 192 512; do
  convert \
    "static/img/avatars/brian-bluer-800.png" \
    -scale "${size}x${size}" \
    "static/favicon-${size}.png"
done
