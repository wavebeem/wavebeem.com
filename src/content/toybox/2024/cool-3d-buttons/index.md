---
title: "Cool 3D buttons"
description:
  "A nice collection of buttons you'll want to push over and over again. These
  3D buttons call back to a time of shiny silver plastic and tactile
  experiences."
date: "2024-10-06"
---

<link rel="stylesheet" href="./assets/style.css" />

## The buttons

<div class="flex flex-column gap3">
  <div class="toybox-toy">
    <button type="button" data-type="1"><span>Type 1</span></button>
    <button type="button" data-type="1"><span>Type 1</span></button>
    <button type="button" data-type="1"><span>Type 1</span></button>
    <button type="button" data-type="1"><span>Type 1</span></button>
  </div>
  <div class="toybox-toy">
    <button type="button" data-type="2"><span>Type 2</span></button>
    <button type="button" data-type="2"><span>Type 2</span></button>
    <button type="button" data-type="2"><span>Type 2</span></button>
    <button type="button" data-type="2"><span>Type 2</span></button>
  </div>
</div>

## The explanation

The important part here is knowing that each image in `background-image` can
have a separate `background-clip` applied to it.

<!-- prettier-ignore -->
```css
button {
  background:
    linear-gradient(#bbb, #fff) content-box,
    linear-gradient(#fff, #999) padding-box,
    linear-gradient(#999, #fff) border-box;
}
```

This uses the `background` shorthand to set the `background-clip` next to each
associated `background-image`.

## Accessibility

It's important to note that the internal dark "border" not only _looks good_ but
is **necessary** for accessibility, based on the
[WCAG contrast rules](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast).

## Credit

These buttons are heavily inspired by
[Ana Tudor's Codepen](https://codepen.io/thebabydino/pen/QWLJpOb). Rather than
using fixed size buttons, I compromised by requiring a child `<span>` for the
actual text padding.

You can read more about the technique in Ana's <i>CSS Tricks</i> article about
[background-clip](https://css-tricks.com/the-backgound-clip-property-and-use-cases/).
