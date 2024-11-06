---
title: "Making a theme selector"
description:
  "How to make a theme selector for your website, and why you might want to have
  more than one theme."
tags:
  - "programming"
  - "javascript"
  - "css"
  - "web"
  - "web-components"
date: "2024-10-05"
---

## It's weirdly hard to do this

If you want a web page in only one theme, that's relatively straightfoward. If
you want to support dark mode, the use of
[@media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
`(prefers-color-scheme: dark)` with
[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
isn't too bad. But adding a theme selector requires... **_JavaScript_**.

<aside class="infobox">

### Don't feel obligated to make a theme switcher

I was interested in the challenge of doing this. If you only want to
automatically pick light/dark mode based on the user's preferences, it's easier
to use CSS custom properties with `@media (prefers-color-scheme: dark)`.

</aside>

## The JS

Download and install
[wavebeem-theme-select.mjs](/elements/wavebeem-theme-select.mjs). The source
code is commented and less than a hundred lines.

```html
<script type="module" src="/elements/wavebeem-theme-select.mjs"></script>
```

<aside class="infobox">

### What's an .mjs file?

An `.mjs` file is really the same thing as a `.js` file, but the name is a clue
that it holds JS code using the "new" module system. Modules were created as
part of the ECMAScript 2015 specification, and were implemented in all major
browsers by 2018.

Some web servers don't understand `.mjs` files. In this case, I suggest renaming
the file to `wavebeem-theme-select.esm.js`. The `.esm.js` is a reminder that you
need to load the JS code as a module for it to work correctly.

</aside>

## The HTML

I made a custom
[web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
that wraps a `<select>` tag and updates `localStorage` and the `[data-theme]` on
the `<html>` element.

```html
<wavebeem-theme-select>
  <select autocomplete="off">
    <option value="" disabled selected>Select theme...</option>
    <option value="auto">Auto</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</wavebeem-theme-select>
```

You can add other elements inside `<wavebeem-theme-select>` like `<label>` for
example. The mandatory parts are the `<option>` elements and the specific values
`""`, `"auto"`, `"light"`, and `"dark"`, since the `<wavebeem-theme-select>`
relies on them.

## The CSS

I highly recommend using CSS custom properties to set color variables.

```css
/* Styles for before the component has loaded */
:root,
/* Styles for after the component has loaded */
:root[data-theme="light"] {
  --color-background: #fff;
  --color-text: #222;

  background-color: var(--color-background);
  color: var(--color-text);
}

/* Styles when dark mode set by JS */
:root[data-theme="dark"] {
  --color-background: #333;
  --color-text: #ccc;
}
```

For best compatibility, you should also include the dark mode styles in a media
query, so that dark mode is applied when the JS doesn't load. Granted, it's
tedious to repeat the colors in a separate media query, so you may want to avoid
this if you don't like keeping these things synced up.

```css
/* Styles when dark mode is set by browser */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #000;
    --color-text: #fff;
  }
}
```

## Bonus round: theme-color for mobile

There's also the
[theme-color](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color)
meta property which mobile browsers use to color the browser UI. It's rarely
used on desktop, though.

```html
<meta name="theme-color" content="#0000ff" />
<meta
  name="theme-color"
  content="#0088ff"
  media="(prefers-color-scheme: dark)"
/>
```

You can use the `media` property to contain a CSS
[@media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) query in order
to automatically apply to system dark mode. If you need to support user selected
themes, then you can use JavaScript to update the `content` value of the
`<meta>` tag.

## Accessibility is complicated

Having a light theme and a dark theme is important for accessibility. Dark
themes are useful for low light situations, or for people who are sensitive to
light! However, I have a hard time reading dark themes because the text appears
more blurry to [my vision](https://en.wikipedia.org/wiki/Astigmatism). When
possible, both is best. And you really don't need a complicated theme switcher
like I have. Using the system dark mode setting via media queries is more than
enough for most personal sites.

## Links

[The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/)
by Josh W. Comeau
