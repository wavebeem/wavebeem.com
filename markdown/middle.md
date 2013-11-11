## Cool Stuff

### [LatteScript][ls]

I love learning new programming languages, and I had an absolute blast
making one!  LatteScript is an educational programming language and
environment for use in web browsers. The syntax was inspired by Pascal
and Python, and it was designed to be as minimal as possible for ease
of learning.

[You can try it out here][ls].
I have blogged extensively about its development at
[the LatteScript blog][lsBlog] The [source code is on GitHub][lsGit]

```
procedure bubble_sort xs
swapped := true
while swapped
  swapped := false
  for i from 2 to #xs
    if xs@(i - 1) &lt; xs@i
      swap xs, i - 1, i
      swapped := true

procedure swap xs, i, j
temp := xs@i
xs@i := xs@j
xs@j := temp

xs := [3, 4, 5, 1, 2]
bubble_sort xs
print xs
```

### [Algebra Card Clutter][acc]
I co-developed [Algebra Card Clutter][acc]
for the [Center for Algebraic Thinking][cat].

We were given a roughly two-sentence description of what the card game
was like, and wrote a proposal about how we envisioned the game and how
long we expected development to take.

The app is a card game where you sort a deck of expressions without
having to actually calculate the values. It helps develop quick
mathematical reasoning about the relative sizes of various expressions,
such as fractions, square roots, and exponents.

We created all the levels, all the art, and programmed the entire app
from scratch in around a month.

The app is available for free on the App Store, only on iPad.

<!-- [![Algebra Card Clutter title screen][accTitle]][acc]-->

### [pypixel][pypixel]

I learned programming using the graphics API in QBasic. It was
extremely simple, but perfect for a beginning programmer. Obviously
QBasic is of little use to a modern-day programmer, so I decided to
create a library for Python in the same spirit as QBasic graphics.

I spoke about [this project][pypixel] at the SuperQuest Spring Conference in 2011.
You can watch a video of my presentation on [Vimeo][pypixelVimeo].

```python
from pypixel import *
show()
center = (WIDTH/2, HEIGHT/2)
radius = HEIGHT/2
circle(RED, center, radius)
update()
pause()
```

Compare this what is actually being abstracted away from the underlying
[PyGame][pygame] library:

```python
import pygame
SIZE  = (640, 480)
OPTS  = pygame.DOUBLEBUF | pygame.HWSURFACE
FPS   = 60
TITLE = 'Hello, world!'

pygame.init()
pygame.display.set_mode(SIZE, OPTS)
pygame.mouse.set_visible(False)
pygame.display.set_caption(TITLE)
clock = pygame.time.Clock()

red    = pygame.Color(255, 0, 0)
center = (WIDTH/2, HEIGHT/2)
radius = HEIGHT/2
surf   = pygame.display.get_surface()
pygame.draw.circle(surf, red, center, radius)

for event in pygame.event.get():
  if event.type == pygame.locals.QUIT:
      exit()
  elif event.type == pygame.locals.KEYDOWN:
      # TODO: Handle various keys:
      # - fullscreen toggling
      # - escape to quit
      # - etc.

  pygame.display.flip()
  clock.tick(FPS)
```

### [Snazzy Styles][yantp]

I love making things look nice. I've written numerous themes for Linux,
[a couple][chromeStore1] [for Chrome][chromeStore2], and even a replacement
[new tab page extension][yantp] for Chrome. Click the thumbnails below to see
in greater detail.

<!-- [![Royal Robo theme][royalRobo]][royalRobo]-->

<!-- Royal Robo above, and Eminence below, are the two favorite Linux (GTK, etc.) themes I've made.-->

<!-- [![Eminence theme][eminence]][eminence]-->

[email]: mailto:mock.brian@gmail.com

[ls]: http://lattescript.mockbrian.com
[lsBlog]: http://lattescript.blogspot.com/
[lsGit]: https://github.com/saikobee/lattescript/

[acc]: https://itunes.apple.com/us/app/algebra-card-clutter/id549330499
[accTitle]: img/algebra-card-clutter.png
[cat]: http://www.algebraicthinking.org/

[pypixel]: https://github.com/saikobee/pypixel
[pypixelVimeo]: http://vimeo.com/20999218
[pygame]: http://www.pygame.org/news.html

[chromeStore1]: https://chrome.google.com/webstore/detail/eminence-dark/jjffinnkoeoaipfjhepbkocamgjhcpop
[chromeStore2]: https://chrome.google.com/webstore/detail/eminence/bgblnalefabkfhneldemmeindkonhcna
[royalRobo]: img/theme-robo.png
[eminence]: img/theme-eminence.jpg
[yantp]: https://chrome.google.com/webstore/detail/yet-another-new-tab-page/imfkhhcponjpjhfpaccepedaabjclbjj?hl=en
