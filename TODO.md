# TODO

## High priority

### Better footer layout

On mobile it should use more room.

On desktop it should be left aligned. No need for the repeated content there
since we have a sticky sidebar.

### Remap component names to better match M3

This will make it easier to reference documentation.

## Low priority

### Clean up global.css

538 lines. Dead commented-out selectors, audit `data-wallpaper` variants for
actual usage.

### Bring back the image lightbox

Taking the user to a new page to see images larger is a bit irritating. We can
probably get a lightbox that works well enough for desktop and mobile. Just not
a huge priority lol.

### What about defensive base styles

A lot of my CSS styles get messy when I need to reuse an element. By using
`@layer` and selectors like `hr:not([class])` I can target raw markup easily but
not fuck up advanced use cases.

### Audit theme.css mappings

Some colors haven't been checked yet.

### Strip large files from git history

Multi-MB PNGs/JPEGs (e.g. `zen1.png`, `blog/2024/curry/*.jpg`). Needs
`git filter-repo`/BFG, own PR, force-push. Make a full git backup of the repo
before doing this, and save to Dropbox.
