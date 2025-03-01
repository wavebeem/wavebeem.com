---
date: "2025-02-09"
title: >-
  Image manipulation with ImageMagick
description: >-
  ImageMagick is one of the best tools I've ever used for automating image
  manipulation. This post explains some of my common use cases, and links to
  ImageMagick's full list of commands.
---

## How to install ImageMagick

You can look at the
[official documentation](https://imagemagick.org/script/download.php) or run one
of the following commands, based on your operating system.

```sh
# Windows
$ winget install ImageMagick.ImageMagick

# macOS
$ brew install imagemagick
```

### A note about Linux

Ubuntu and Debian provide `imagemagick` packages for version 6, despite the fact
that version 7 came out almost 10 years ago. Fedora and Arch Linux both provide
packages for version 7.

For simple commands, you can substitute `magick` with `convert` and
`magick mogrify` with `mogrify` to convert a version 7 command to a version 6
command, but I suggest installing an up to date version if possible.

## Creating WebP images for your website

```sh
magick INPUT.png -resize '128x128>' -quality 100 OUTPUT.webp
```

![](./assets/1a.png)

![](./assets/1b.png)

Don't worry about the `128x128` being a square aspect ratio, ImageMagick will
never change the aspect ratio of your image without you explicitly requesting
it. The `>` suffix means "down to" that size, so ImageMagick won't upscale
smaller images. You can also use `<` for "up to" to avoid resizing already large
images, and `!` to disregard the aspect ratio.

Be sure to include `-quality 100` when converting PNG files that contain flat
colors or pixel art, since the default with ImageMagick's WebP conversion is to
use _lossy_ encoding for WebP files. You can simply omit the quality flag to get
the default quality, or supply any number you want from 1 to 100.

[WebP has a massive list of options](https://imagemagick.org/script/webp.php) in
ImageMagick if you want even more contorl over the output.

## Upscaling pixel art

For [nearest-neighbor scaling](https://en.wikipedia.org/wiki/Image_scaling),
you'll want to use `-scale` instead of `-resize`.

```sh
magick INPUT.png -scale '200%' -quality 100 OUTPUT.webp
```

![](./assets/2a.png)

![](./assets/2b.png)

Even though a 200% image is two times the size of the input, if it's pixel art,
it will barely be any larger as a WebP files. Upscaling pixel art to a large
size tends to be one of the best ways to retain its visual clarity.

## Making an animated image

```sh
magick -delay 100 f-1.png f-2.png f-3.png animated.gif
```

WebP also supports animation:

```sh
magick -delay 100 f-1.png f-2.png f-3.png animated.webp
```

![](./assets/3.webp)

By default the delay is 0, and 100 means 1 second of delay. This lines up with
the GIF format using centiseconds as the frame delay value.

## Making a favicon.ico

```sh
magick favicon-16.png favicon-32.png favicon-192.png favicon.ico
```

favicon.ico is just a collection of images put in one file, and ImageMagick will
automatically put all the images together for you.

## Updating an image instead of making a copy

**Note:** Make sure to make a copy of your images before doing this, or use
version control so you can restore changes if you mess up.

```sh
$ magick mogrify -scale '200%' *.png
```

This replace all PNG files with an upscaled version in the current directory.

## Removing image metadata

This will remove image metadata, which can include sensitive info like GPS
coordinates. Some images metadata is useful, though, so this isn't always an
ideal solution.

```sh
$ magick mogrify -strip INPUT.png
# ---or---
$ magick INPUT.png -strip OUTPUT.png
```

## Making a script

Writing these commands repeatedly can get tedious, so I think these tips are
best paired with a script to process images for you. I usually write a bash
script or Node.js script. I could write an entire blog post about scripting
techniques, but I don't want to right now, so just take this example and do your
own research.

**bash**

```sh
#!/usr/bin/env bash
set -eu

cd src
for size in 180 360; do
  magick photo.webp -resize "$size" "photo-${size}.webp"
done
```

**JavaScript**

```js
import { spawnSync } from "node:child_process";
import { chdir } from "node:process";

async function main([flag]) {
  chdir("src");
  for (const size of [180, 360]) {
    const ret = spawnSync("magick", [
      "photo.webp",
      "-resize",
      size,
      `photo-${size}.webp`,
    ]);
    if (x.status) {
      console.error("Failed to convert photo.webp");
    }
  }
}

main(process.argv.slice(2));
```

It doesn't support as many options, but if you're using JS then you might prefer
[sharp](https://sharp.pixelplumbing.com/) since it can be installed through npm
and has TypeScript definitions so you can better integrate it into your code.

## The sky's the limit

ImageMagick has an
[absurd amount of commands](https://imagemagick.org/script/command-line-options.php).
Here's a small sample:

- `-flip` &rarr; **mirror upside-down**

- `-flop` &rarr; **mirror side-to-side**

- `-trim` &rarr; **remove a solid colored border around an image**

- `-crop` &rarr; **crop the image**

- `-append` &rarr; **join two images top-to-bottom**

- `+append` &rarr; **join two images side-by-side**

ImageMagick also lets you use a special filename `magick:logo` which is the
ImageMagick logo. This is useful if you want to test commands without having an
image ready to use. There's also a few other
[built-in images](https://imagemagick.org/script/formats.php) you can use.

```sh
$ magick magick:logo -fill "#ff0000" -tint 50 red-logo.png
```

To open the file in your preferred image viewer:

```sh
# Windows
$ start FILENAME

# macOS
$ open FILENAME

# Linux
$ xdg-open FILENAME
```

It might be easier to just drag-and-drop the image into your web browser, so you
can refresh the page to see the updates as you refine your commands.
