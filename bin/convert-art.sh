#!/usr/bin/env bash
set -eu

cd src/static/img/art

for filename in *.{png,gif}; do
  name="$filename"
  name="${name%%.png}"
  name="${name%%.gif}"
  magick "$filename" -quality 100 "$name.webp"
  rm "$filename"
done
