---
title: "Developing with web components"
description:
  "Thoughts on developing with web components from scratch; no UI libraries.
  This covers custom elements and very basic use of the <template> element.
  Shadow DOM is mentioned but not used."
tags:
  - "programming"
  - "javascript"
  - "web"
  - "web-components"
date: "2023-11-25"
---

## Introduction

[Web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components)
have been [supported](https://caniuse.com/custom-elementsv1) in every major
browser since 2018. Recently I rewrote my
[Color Combos](https://color-combos.wavebeem.com/?fg=hsl%28180+100%25+50%25%29%0Aoklch%2880%25+80%25+300%29%0A%23cc0%0Awhite&bg=%23222%0A%23111&group_by=background)
website from vanilla JS to web components. This post covers a couple custom
elements I wrote, and my thoughts on the API.

## Why no shadow DOM?

My site's styles weren't built to support shadow DOM easily.
[Declarative shadow DOM](https://caniuse.com/declarative-shadow-dom) is still
experimental, which dampens my excitement for it.

## Why no UI libraries?

I'm trying to keep the page size small. And it's a good way to reinforce my
knowledge of the web platform.

## Custom elements

The basics of the custom elements API are pretty simple. I like that the API is
declarative and doesn't need any special build tools.

## \<cc-textarea-resizer\>

We'll start with the `<cc-textarea-resizer>` element I wrote.

```html
<cc-textarea-resizer>
  <textarea
    rows="4"
    spellcheck="false"
    class="sage-input w-100 resize-none code"
    type="text"
    name="fg"
  ></textarea>
</cc-textarea-resizer>
```

It's a wrapper element that contains a `<textarea>` element.

```css
cc-textarea-resizer {
  display: contents;
}
```

A single CSS rule is all we need to make the wrapper element disappear. This is
a [newish](https://caniuse.com/css-display-contents) CSS property that's useful
for custom elements. This essentially removes the element from the DOM for the
sake of CSS layouts.

Finally, let's define the implementation of the custom element:

```js
class HTMLCcTextareaResizerElement extends HTMLElement {
  connectedCallback() {
    this.addEventListener("input", this.#onInput);
    for (const textarea of this.querySelectorAll("textarea")) {
      this.#resize(textarea);
    }
  }

  disconnectedCallback() {
    this.removeEventListener("input", this.#onInput);
  }

  #onInput = (event) => {
    this.#resize(event.target);
  };

  #resize(textarea) {
    const value = textarea.value.split(/\n/).length;
    const rows = Math.max(4, value);
    textarea.rows = rows;
  }
}

customElements.define("cc-textarea-resizer", HTMLCcTextareaResizerElement);
```

In the future you'll be able to specify this
[in CSS](https://github.com/w3c/csswg-drafts/issues/7542). For now we'll use
progressive enhancement of the existing `<textarea>` element via JS.

Note that the value `4` is the minimum number of lines. This could be
configurable through HTML attributes, but I didn't think it was worth it.

I don't have any serious complaints about the API for this use case. It's
verbose, but frankly I think classes are actually a good way to model elements.
I wish that everything wasn't so heavily built on inheritance, but that's just
how all the DOM APIs are built.

`adoptedCallback` is called when the element is moved across iframes. I didn't
need to use it, though.

I used private properties here for `#onInput` and `#resize`. I wanted to try
them out because they're convenient, but Lea Verou has a great post on why
[they can cause serious problems](https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/),
too.

## \<cc-form-output-item\>

This element displays a single result from the color combos algorithm. It's a
box with some text in it, and a contrast calculation.

Because I'm rendering these in a loop from the parent element, I only create
them via JS:

```js
// Inside the <cc-form-output> element
const item = document.createElement("cc-form-output-item");
item.dataset.foreground = fg;
item.dataset.background = bg;
this.append(item);
```

I decided to use the
[dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
API to read `data-*` attributes rather than using `getAttribute`, mostly because
I like the syntax, but also out of a slight fear about <q>what if the DOM spec
adds a new property with the name of one of my properties?</q>. Can you tell I
don't like inheritance? Here's the JS implementation:

```js
import { split, getCombinations } from "../util.js";

class HTMLCcFormOutputElement extends HTMLElement {
  static get observedAttributes() {
    return ["data-foregrounds", "data-backgrounds", "data-group-by"];
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    this[name] = newValue;
    this.#render();
  }

  get #templateEmpty() {
    return document
      .querySelector("#template--cc-form-output")
      .content.cloneNode(true);
  }

  get foregrounds() {
    return this.dataset.foregrounds || "";
  }

  get backgrounds() {
    return this.dataset.backgrounds || "";
  }

  get groupBy() {
    return this.dataset.groupBy || "background";
  }

  connectedCallback() {
    this.#render();
  }

  #render() {
    const combos = Array.from(
      getCombinations({
        foregrounds: split(this.foregrounds),
        backgrounds: split(this.backgrounds),
        groupBy: this.groupBy,
      })
    );
    this.innerHTML = "";
    if (combos.length === 0) {
      this.append(this.#templateEmpty);
      return;
    }
    for (const { fg, bg } of combos) {
      const item = document.createElement("cc-form-output-item");
      item.dataset.foreground = fg;
      item.dataset.background = bg;
      this.append(item);
    }
  }
}

customElements.define("cc-form-output", HTMLCcFormOutputElement);
```

This is also accompanied by a `<template>` element and a little bit of CSS:

```html
<template id="template--cc-form-output-item">
  <div class="flex flex-column pa3">
    <h3 class="mt0 mb2"><span data-name="contrast"></span> contrast ratio</h3>
    <div class="pa3 ba round">
      <p role="presentation" class="mt0 mb3">
        In visual perception a color is almost never seen as it really
        is&mdash;as it physically is. This fact makes color the most relative
        medium in art. &ndash; <i>Josef Albers</i>
      </p>
      <pre class="ma0">foreground: <span data-name="fg"></span></pre>
      <pre class="ma0">background: <span data-name="bg"></span></pre>
    </div>
  </div>
</template>
```

Most of the CSS comes from Tachyons:

```css
cc-form-output-item {
  display: block;
  color: var(--foreground);
  background: var(--background);
}
```

Custom elements are `display: inline` by default, so I fixed that. I also made
the foreground and background colors configurable via CSS variables. I prefer to
limit my use of inline styles to just changing variables.

The big new thing here is `observedAttributes` & `attributeChangedCallback`. By
adding these you can make your element respond to HTML attribute changes. HTML
attributes are the `key="value"` (or simply `key` for boolean attributes) that
you can set directly in HTML. These represent basic configuration to your
element, and should be supported when possible. There's also properties which
are set via `element.property = value` in JS. These support complex data types
like arrays, objects, and functions. You should mirror the attributes as
properties for ease of use, e.g.:

```js
const img = document.createElement("img");
// attribute
img.setAttribute("src", "https://example.com/image.png");
// property
img.src = "https://example.com/image.png";
```

It's a lot of manual work to do this. A small library could go a long way for
making custom elements more developer friendly. Due to how custom elements are
loaded, there can be
[issues with using JS setters before a component is loaded](https://web.dev/articles/custom-elements-best-practices#make_properties_lazy),
causing side effects to not trigger.

Calling `this.#render()` in `attributeChangedCallback` isn't ideal. You may have
heard how React batches UI updates to avoid unnecessary re-renders. This is a
similar situation. If you're updating many attributes at once, you don't want to
re-render the element for each one. I didn't bother to implement this, but it's
something to keep in mind.

## Overall thoughts

I struggled at various points. I'm _very_ used to leaning on TypeScript to catch
my mistakes these days. Using JS directly is certainly more challenging.

The custom elements API is pretty nice, all things considered. Reconciling HTML
vs DOM is challenging. But web components have a lot of potential because they
can be used directly from HTML.

I wish there was a bit less boilerplate, though. Implementing a reactivity
system via
[setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)
is very time consuming, and mirroring attributes as properties (and vice versa)
requires a lot of code. A bit of clever meta-programming could be combined with
a custom base class to cover a lot of the boilerplate. I was hesitant to start
building my own UI library for such a simple site, but the temptation was
certainly there.

Of course, none of the rendering was especially complicated here either.
Something like the
[lit-html](https://lit.dev/docs/libraries/standalone-templates/) template system
could be helpful, but at that point you might prefer to use the entire
[Lit](https://lit.dev/) framework.

Maybe I'll try out some of the more lightweight custom element frameworks in the
future. I've already used [Stencil](https://stenciljs.com/) for work, and it's
pretty nice. But I'd like to see something with no build step and no
dependencies. Maybe in the future I'll make my own just for fun.
