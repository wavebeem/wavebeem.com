#!/usr/bin/env bash
set -eu

cd src/static

convert \
  "favicon-16.png" \
  -scale "32x32" \
  -strip \
  "favicon-32.png"

for size in 48 96 180 192 512; do
  convert \
    "brian-24.png" \
    -scale "${size}x${size}" \
    -strip \
    "brian-${size}.png"

  convert \
    "brian-alpha-24.png" \
    -scale "${size}x${size}" \
    -strip \
    "brian-alpha-${size}.png"
done
