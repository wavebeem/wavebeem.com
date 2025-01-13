currently i just have a janky node script that calls imagemagick

```sh
magick INPUT.png -resize '800>' -quality 100 OUTPUT.webp
```

convert `INPUT.png` to `OUTPUT.webp`, use lossless encoding, and shrink it down
to a max of 800px wide

```sh
magick pixel-art.png -quality 100 -scale '1000%' pixel-art.webp
```

convert pixel art to a 10x sized webp (barely makes the file bigger, but avoids
blurry image problems)

you can even make an animated image or ico file with it like

```sh
magick favicon-*.png favicon.ico
```

```sh
magick sprite-*.png animated.gif
```
