#!/usr/bin/env bash
set -eu

Resize() {
  local src="$1"
  local size="$2"
  local dest="$3"
  magick convert "$src" -scale "$size" -strip "$dest"
}

cd src/static

Resize "favicon-16.png" 32 "favicon-32.png"

for size in 48 96 180 192 360 512; do
  Resize "photo.jpg" $size "photo-${size}.jpg"
done
