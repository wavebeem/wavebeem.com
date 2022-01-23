#!/usr/bin/env bash
set -eu

export PATH="$HOME/Applications/aseprite/Aseprite.app/Contents/MacOS:$PATH"

date="2021-12-26"
root="$HOME/Dropbox/Art/$date self portrait"

aseprite \
  --batch \
  "$root/$date-self-portrait.ase" \
  --scale 1 \
  --save-as "$root/brian-48.png"

aseprite \
  --batch \
  "$root/$date-self-portrait.ase" \
  --scale 10 \
  --save-as "$root/$date-self-portrait.png"

cp \
  "$root/$date-self-portrait.png" \
  "src/static/img/art/$date-self-portrait.png"

cp \
  "$root/$date-self-portrait.png" \
  "$HOME/Dropbox/Avatars/nya.png"

cp \
  "$root/brian-48.png" \
  "src/static/brian-48.png"

./bin/favicons.sh
