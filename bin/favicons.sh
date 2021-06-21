#!/usr/bin/env bash
set -eu

cd src/static
for size in 32; do
  convert \
    "favicon-16.png" \
    -scale "${size}x${size}" \
    -strip \
    "favicon-${size}.png"
done
for size in 48 96 180 192 512; do
  convert \
    "brian-24.png" \
    -scale "${size}x${size}" \
    -strip \
    "brian-${size}.png"
done
