#!/bin/bash
files=(
    favicon.ico
    index.html
    resume.pdf
    style.css
)

rm -rf dist
mkdir dist
cp -v "${files[@]}" dist/
cd dist
www
