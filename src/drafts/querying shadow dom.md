---
title: |
  Querying shadow DOM
description: |
  Examples how to query shadow DOM, and when you actually don't want to.
---

##

## Inspiration

Recently I was writing automated tests against an application that uses custom elements with shadow DOM and I had a revelation about how querying the shadow DOM vs the light DOM works.

If you're not familiar with shadow DOM, I suggested [reading about it on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).

## What was I trying to do

I was writing tests for some [Stencil](https://stenciljs.com/) components. For complicated reasons, we had previously disabled shadow DOM for our internal modal dialog component. We had written tests around this component, and they all started failing after I switched the component to use shadow DOM.

Stencil extends CSS selectors with a new operator: `>>>`.

This operator is designed to "pierce the shadow DOM". This means that it splits up the CSS selector into two parts. You can imagine it like this:

```js
function find(root, selector) {
  const [first, ...rest] = selector.split(">>>");
  return find_(root.querySelector(first), rest);
}

function find_(root, selectorList) {
  let element = root;
  for (const selector of selectorList) {
    element = element.shadowRoot.querySelector(selector);
  }
  return element;
}
```

The idea is that you split the selector on every `>>>` into a real CSS selector, and between each of them you access the `shadowRoot` property of the element. This only works if you the element's shadow root was created with `this.attachShadow({ mode: "open" })`, but Stencil creates all its shadow roots that. Presumably this is you can traverse the shadow DOM for testing purposes.

I'm going to simplify the API for the purposes of this post, but the test looked approximately like this:

```js
page.render(html`
  <x-dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </x-dialog>
`);

// The `x-dialog` wrapper component has an `isOpen`
// property and just renders content like:
// `<dialog><slot></slot></dialog>`
const xDialog = page.find("x-dialog");
expect(xDialog).toBeVisible();

// The native HTML `<dialog>` element does the heavy lifting here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = page.find("x-dialog dialog");
expect(dialog).not.toHaveAttribute("open");

// Find the text inside the dialog
const hello = page.find("x-dialog dialog .hello");
expect(hello).toHaveText("Hello");

const world = page.find("x-dialog dialog .world");
expect(world).toHaveText("World");

// The `x-dialog` component should cause a real `dialog`
// element to behave correctly, which will be reflected
// in the `open` attribute in the DOM
xDialog.setProperty("isOpen", true);
expect(dialog).toHaveAttribute("open");
```

Originally, when `x-dialog` didn't use shadow DOM, this resulted in a DOM tree that looked like this:

```html
<x-dialog>
  <dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </dialog>
</x-dialog>
```

Which meant that all my selectors worked correctly. With the introduction of shadow DOM, there became multiple DOM trees to worry about. It looked more like this:

```html
<!-- light DOM ("outside" the component) -->
<x-dialog>
  <div class="hello">Hello</div>
  <div class="world">World</div>
</x-dialog>

<!-- shadow DOM ("inside" the component) -->
<dialog>
  <!-- slot is where the light DOM elements show up -->
  <slot></slot>
</dialog>
```

With this light DOM and shadow DOM structure, the previous selectors won't find anything:

```js
page.find("x-dialog dialog .hello");
// null
```

Because `dialog` is inside the shadow DOM of `x-dialog`, it's invisible to a normal CSS selector. So my next thought was that I needed to use the special `>>>` operator to find it.

```js
page.find("x-dialog >>> dialog .hello");
// null
```

But this also gives us `null`. Backing up a step, I tried this:

```js
page.find("x-dialog >>> dialog");
// <dialog>
```

Which is what I expected. If you go inside the shadow DOM of `x-dialog`, you will find `dialog` waiting inside. But why can't we find `.hello`? It's "inside" the `dialog`, right?

I started messing around with the selectors and tried this:

```js
page.find("x-dialog >>> dialog slot");
// <slot>
```

I realized that the query will find the literal tags you wrote, not the theoretical composed DOM structure made by combining the light DOM and shadow DOM. The `<slot>` element isn't traversed by the query selector in order to find its "children". So the final test should actually look like this:

```js
page.render(html`
  <x-dialog>
    <div class="hello">Hello</div>
    <div class="world">World</div>
  </x-dialog>
`);

// The `x-dialog` wrapper component has an `isOpen`
// property and just renders content like:
// `<dialog><slot></slot></dialog>`
const xDialog = page.find("x-dialog");
expect(xDialog).toBeVisible();

// The native HTML `<dialog>` element does the heavy lifting here
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
const dialog = page.find("x-dialog >>> dialog");
expect(dialog).not.toHaveAttribute("open");

// The light DOM elements should render inside a real `<dialog>`
const slot = page.find("x-dialog >>> dialog slot");
expect(slot).toExist();

// Find the text inside the dialog
const hello = page.find("x-dialog .hello");
expect(hello).toHaveText("Hello");

const world = page.find("x-dialog .world");
expect(world).toHaveText("World");

// The `x-dialog` component should cause a real `dialog`
// element to behave correctly, which will be reflected
// in the `open` attribute in the DOM
xDialog.setProperty("isOpen", true);
expect(dialog).toHaveAttribute("open");
```
