---
title: "Cool 3D buttons"
description:
  "A nice collection of buttons you'll want to push over and over again. These
  3D buttons call back to a time of shiny silver plastic and tactile
  experiences."
date: "2024-10-06"
---

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

```css
button {
  background: linear-gradient(#bbb, #fff) content-box, linear-gradient(
        #fff,
        #999
      ) padding-box, linear-gradient(#999, #fff) border-box;
}
```

This uses the `background` shorthand to set the `background-clip` next to each
associated `background-image`.

## Accessibility

It's important to note that the internal dark <q>border</q> not only _looks
good_ but is **necessary** for accessibility, based on the
[WCAG contrast rules](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast).

## Credit

These buttons are heavily inspired by
[Ana Tudor's Codepen](https://codepen.io/thebabydino/pen/QWLJpOb). Rather than
using fixed size buttons, I compromised by requiring a child `<span>` for the
actual text padding.

You can read more about the technique in Ana's <i>CSS Tricks</i> article about
[background-clip](https://css-tricks.com/the-backgound-clip-property-and-use-cases/).

<style>
  .toybox-toy {
    --toybox-toy-base: calc(1rem / 4);
    --toybox-toy-line: 1px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0;
    padding: 1rem;
    background: #ddd;
    color: #444;
    border-radius: 0.5rem;
    border: 1px solid transparent;
    background: linear-gradient(#fff, #ddd) padding-box,
      linear-gradient(#0001, #0006) border-box;
  }

  .toybox-toy button {
    all: unset;
    text-align: center;
    user-select: none;
    border: solid var(--toybox-toy-base) transparent;
    padding: calc(var(--toybox-toy-base) + var(--toybox-toy-line));
    border-radius: 9999px;
    box-shadow: inset 0 0 0 var(--toybox-toy-line) #777;
    transition: 50ms filter;
    text-shadow: 1px 1px 0 #f8f8f8;
    font-weight: bold;
    display: flex;
    justify-content: center;
    font-size: 1rem;
  }

  .toybox-toy button[data-type="1"] {
    background: linear-gradient(#ddd, #fff) content-box,
      linear-gradient(#fff, #ccc) padding-box,
      linear-gradient(#ccc, #fff) border-box;
  }

  .toybox-toy button[data-type="2"] {
    background: linear-gradient(#fff, #ccc) padding-box,
      linear-gradient(#ddd, #fff) border-box;
  }

  .toybox-toy button > span {
    display: block;
    padding: calc(1rem / 8) 1rem;
  }

  .toybox-toy button:focus-visible {
    outline: 2px solid;
    outline-offset: 1px;
  }

  .toybox-toy button:hover {
    filter: brightness(103%);
  }

  .toybox-toy button:active {
    filter: brightness(97%);
  }
</style>
