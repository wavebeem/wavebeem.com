# TODO

## Browserslist / lightningcss targets

Decide a real browser range instead of empty `targets: {}`. Check if dropping
`lightningcss` entirely still works.

## Strip large files from git history

Multi-MB PNGs/JPEGs (e.g. `zen1.png`, `blog/2024/curry/*.jpg`). Needs `git
filter-repo`/BFG, own PR, force-push. Make a full git backup of the repo before
doing this, and save to Dropbox.

## Audit inline HTML in markdown content

19 files use bold-paragraph-as-caption instead of `<figure>`/`<figcaption>`. Go
through case by case. Also, we might just keep that intentionally, or switch to
italic. It's a huge pain writing the figure markup everywhere, and it doesn't
format well. Keeping Markdown posts simple is kind of the whole point.

## Clean up global.css

538 lines. Dead commented-out selectors, audit `data-wallpaper` variants for
actual usage.

## Bring back the image lightbox

Taking the user to a new page to see images larger is a bit irritating. We can
probably get a lightbox that works well enough for desktop and mobile. Just not
a huge priority lol.
