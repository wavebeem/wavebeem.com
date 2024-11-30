---
date: "2024-11-27"
title: >-
  Creating an HTML “spoilers” element with no JS
description: >-
  It's strangely difficult to make a “spoilers” element without JS, and even
  harder to do it with support for all mobile operating systems and screen
  readers.
tags:
  - "programming"
  - "css"
  - "web"
---

## A working example

You can press the hidden text to reveal it _or_ navigate to it using the
keyboard.

> Why did the chicken cross the road? <span tabindex="0" class="spoiler">To get
> to the other side.</span>

<!-- prettier-ignore -->
```md
Why did the chicken cross the road?
<span tabindex="0" class="spoiler">To get to the other side.</span>
```

## Why the details tag isn't ideal

The HTML
[paragraph](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) tag
only allows
[phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content)
as its children. Notably this includes
[input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) and
[button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) but
**not**
[details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details).
The details element otherwise behaves exactly like how I want my spoilers
element to behave:

- No JS
- Screen readers hide content until activated
- Doesn't show information on hover
- [Works in every browser on every OS](https://caniuse.com/details)
- Lets me customize the prompt to reveal the hidden contents (e.g. "Reveal
  spoilers")

The problem is that because `<details>` is not valid inside `<p>`, the HTML
parser will completely rewrite your input in order to put the `<details>`
_outside_ the paragraph, and orphan its following text:

```html
<main>
  <p>
    hello
    <details>secret</details>
    world
  </p>
</main>
```

Will be parsed as if you wrote:

```html
<main>
  <p>hello</p>
  <details>secret</details>
  world
  <p></p>
</main>
```

This wouldn't be a huge issue, but generally Markdown puts all of your text
content inside paragraph tags. Given that most of my blog uses Markdown, this is
a non-starter.

<aside class="infobox">

## Hover styles are weird on mobile

I don't actually want my spoilers to show on hover (it's too easy to do on
accident on desktop), but it's worth noting that hover is completely
inconsistent on mobile for Android vs iOS. On Android (tested in Chrome and
Firefox), the `:hover` selector is true when an element is tapped (or pressed
and released without "clicking"---like scrolling), until something else is
clicked or hovered. On iOS, it seems that `:hover` only exists while your finger
is touching the element. This is probably a valid interpretation of `:hover`,
but much less useful in my opinion.

</aside>

## Handling clicks without JS

The accessibility minded among us love to complain about improper HTML like
`<span onclick="...">`, but it has its uses! What I want is a button that
reveals content when clicked, so a `<button>` would be correct... but I don't
want to use JS to handle this if I don't have to.

If you add
[tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex),
any element can be focused---not just normally interactive elements. These
elements can be focused via the keyboard or by clicking/tapping them. Then we
can use the `:focus` selector to reveal the text.

<aside class="infobox">

## Only use 0 or -1 as tabindex values

It's not only _allowed_ but **good** to use `tabindex="0"` more than once.
Manually controlling `tabindex` by assigning different positive numbers can make
keyboard navigation tricky, and makes your code harder to maintain. When
multiple elements have the same `tabindex`, the browser will navigate through
them in order. Interactive elements like `<button>` and `<input>` implicitly
have `tabindex="0"`. `tabindex="-1"` should be used for elements that can only
be programmatically focused, like offscreen dialogs.

</aside>

## What about accessibility?

I don't think this approach is quite as accessible as using `<details>` or a
custom JS solution. Testing with VoiceOver on macOS revealed the text when
navigating through the document, but unfocus it after leaving the content. It
also doesn't give the user any indication that they're about to see "spoilers",
or give them an option to skip them. So it's more or less just "text" to a
VoiceOver. I think this may be more common knowledge recently, but many UI
patterns are simply not fully accessible on the web without using JS. In my
case, I'm calling "good enough" for my blog.
