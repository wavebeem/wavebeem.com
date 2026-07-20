# TODO

## Run webpWatch against the existing asset backlog

238 pre-existing raster files under `src/content/**/assets/**` never converted.
Batch it, spot-check results.

## Browserslist / lightningcss targets

Decide a real browser range instead of empty `targets: {}`. Check if dropping
`lightningcss` entirely still works.

## Strip large files from git history

Multi-MB PNGs/JPEGs (e.g. `zen1.png`, `blog/2024/curry/*.jpg`). Needs `git
filter-repo`/BFG, own PR, force-push.

## Audit inline HTML in markdown content

19 files use bold-paragraph-as-caption instead of `<figure>`/`<figcaption>`. Go
through case by case.

## Clean up global.css

538 lines. Dead commented-out selectors, audit `data-wallpaper` variants for
actual usage.
