#!/usr/bin/env bash
set -eu

:resize() (
  src="$1"
  size="$2"
  dest="$3"
  magick "$src" -scale "$size" -strip "$dest"
)

cd src/static

:resize "favicon-16.png" 32 "favicon-32.png"

magick "photo.png" -background "#b5d6c5" -flatten "photo.jpg"

for size in 48 96 180 192 360 512; do
  :resize "photo.jpg" "$size" "photo-${size}.jpg"
  :resize "photo.png" "$size" "photo-${size}.png"
done
