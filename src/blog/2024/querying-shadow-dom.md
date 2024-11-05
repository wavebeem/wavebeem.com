---
title: |
  Querying shadow DOM
description: |
  Examples of how to query shadow DOM, and when you actually don't want to.
tags:
  - "programming"
  - "javascript"
  - "web"
  - "web-components"
date: "2024-01-27"
---

## Inspiration

Recently I was writing automated tests against an application that uses custom
elements with shadow DOM and I had a revelation about how querying the shadow
DOM vs the light DOM works.

If you're not familiar with shadow DOM, I suggested
[reading about it on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

## Writing shadow DOM tests for Stencil.js

I was writing tests for some [Stencil](https://stenciljs.com/) components. For
complicated reasons, we had previously disabled shadow DOM for our internal
modal dialog component. We had written tests around this component, and they all
started failing after I switched the component to use shadow DOM.

Stencil extends CSS selectors with a new operator: `>>>`.

This operator is designed to "pierce the shadow DOM". This means that it splits
up the CSS selector into two parts. You can imagine it like this:

```js
function find(root, selector) {
  const [first, ...rest] = selector.split(">>>");
  let element = root.querySelector(first);
  for (const selector of rest) {
    element = element.shadowRoot.querySelector(selector);
  }
  return element;
}
```

The idea is that you split the selector on every `>>>` into a real CSS selector,
and between each of them you access the `shadowRoot` property of the element.
This only works if the element's shadow root was created with
`this.attachShadow({ mode: "open" })`, but Stencil creates all of its shadow
roots that way. Presumably this is so you can traverse the shadow DOM for
testing purposes.

I'm going to simplify the API for the purposes of this post, but the test looked
approximately like this:

```js
page.render(html`
  <my-dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </my-dialog>
`);

// The `my-dialog` wrapper component has an `isOpen`
// property and just renders content like:
// `<dialog><slot></slot></dialog>`
const myDialog = page.find("my-dialog");
expect(myDialog).toBeVisible();

// The native HTML `<dialog>` element does the heavy lifting here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = page.find("my-dialog dialog");
expect(dialog).not.toHaveAttribute("open");

// Find the text inside the dialog
const hello = page.find("my-dialog dialog .hello");
expect(hello).toHaveText("Hello");

const world = page.find("my-dialog dialog .world");
expect(world).toHaveText("World");

// The `my-dialog` component should cause a real `dialog`
// element to behave correctly, which will be reflected
// in the `open` attribute in the DOM
myDialog.setProperty("isOpen", true);
expect(dialog).toHaveAttribute("open");
```

Originally, when `my-dialog` didn't use shadow DOM, this resulted in a DOM tree
that looked like this:

```html
<my-dialog>
  <dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </dialog>
</my-dialog>
```

Which meant that all my selectors worked correctly. With the introduction of
shadow DOM, there became multiple DOM trees to worry about. It looked more like
this:

```html
<!-- light DOM ("outside" the component) -->
<my-dialog>
  <div class="hello">Hello</div>
  <div class="world">World</div>
</my-dialog>

<!-- shadow DOM ("inside" the component) -->
<dialog>
  <!-- slot is where the light DOM elements show up -->
  <slot></slot>
</dialog>
```

With this light DOM and shadow DOM structure, the previous selectors won't find
anything:

```js
page.find("my-dialog dialog .hello");
// null
```

Because `dialog` is inside the shadow DOM of `my-dialog`, it's invisible to a
normal CSS selector. So my next thought was that I needed to use the special
`>>>` operator to find it.

```js
page.find("my-dialog >>> dialog .hello");
// null
```

But this also gives us `null`. Backing up a step, I tried this:

```js
page.find("my-dialog >>> dialog");
// <dialog>
```

Which is what I expected. If you go inside the shadow DOM of `my-dialog`, you
will find `dialog` waiting inside. But why can't we find `.hello`? It's "inside"
the `dialog`, right?

I started messing around with the selectors and tried this:

```js
page.find("my-dialog >>> dialog slot");
// <slot>
```

I realized that the query will find the literal tags you wrote, not the
theoretical composed DOM structure made by combining the light DOM and shadow
DOM. The `<slot>` element isn't traversed by the query selector in order to find
its "children". So the final test should actually look like this:

```js
page.render(html`
  <my-dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </my-dialog>
`);

// The `my-dialog` wrapper component has an `isOpen`
// property and just renders content like:
// `<dialog><slot></slot></dialog>`
const myDialog = page.find("my-dialog");
expect(myDialog).toBeVisible();

// The native HTML `<dialog>` element does the heavy lifting here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = page.find("my-dialog >>> dialog");
expect(dialog).not.toHaveAttribute("open");

// The light DOM elements should render inside a real `<dialog>`
const slot = page.find("my-dialog >>> dialog slot");
expect(slot).toExist();

// Find the text inside the dialog
const hello = page.find("my-dialog .hello");
expect(hello).toHaveText("Hello");

const world = page.find("my-dialog .world");
expect(world).toHaveText("World");

// The `my-dialog` component should cause a real `dialog`
// element to behave correctly, which will be reflected
// in the `open` attribute in the DOM
myDialog.setProperty("isOpen", true);
expect(dialog).toHaveAttribute("open");
```

## Closing thoughts

It's funny to me because now all I can think is "of course it works that way".
My brain has been conditioned by years and years of React-style component driven
development where intermediate elements magically show up in the middle of your
DOM. Using shadow DOM, these details are properly encapsulated. There are far
too many tools with little or no way to deal with shadow DOM right now due to
its overall lack of popularity, but I'm ok with that.
