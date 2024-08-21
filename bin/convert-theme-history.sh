#!/usr/bin/env bash
set -eu

cd src/static/img/theme-history

for filename in *.png; do
  name="$filename"
  name="${name%%.png}"
  magick "$filename" -quality 100 "$name.webp"
  rm "$filename"
done
