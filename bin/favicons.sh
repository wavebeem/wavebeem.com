#!/usr/bin/env bash
set -eu

cd src/static
for size in 32 180 192 512; do
  convert \
    "favicon-16.png" \
    -scale "${size}x${size}" \
    "favicon-${size}.png"
done
