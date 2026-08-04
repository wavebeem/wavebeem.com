# TODO

## Strip large files from git history

Multi-MB PNGs/JPEGs (e.g. `zen1.png`, `blog/2024/curry/*.jpg`). Needs
`git filter-repo`/BFG, own PR, force-push. Make a full git backup of the repo
before doing this, and save to Dropbox.

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

## What about defensive base styles

A lot of my CSS styles get messy when I need to reuse an element. By using
`@layer` and selectors like `hr:not([class])` I can target raw markup easily but
not fuck up advanced use cases.

## Bring back heading font

It's nice to see a narrow font to save space up there...

## Root out italic

Tired of it. Find every italic usage across CSS and content and remove it.

## Clean up navigation

Let's cap out at SEVEN navigation items. Anything else can be reached from some
other page (including a home page link!). The home page is always easy to get
back to, and the nav bar is NOT an exhaustive list of all pages.

## Am I overusing connected buttons?

The consecutive a.infobox treatment might be an abuse of the concept of
connected buttons. Let's try making them breathe a little bit.

## Logo on top

Logo in the sidebar just looks weird! Maybe we can do something about that on
desktop. Put it on top?
