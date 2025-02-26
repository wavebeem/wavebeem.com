---
title: >-
  Creating a colorized disjoint union of graphs
description: >-
  Blah blah blah.
date: "2025-02-24"
---

<script type="module" src="./assets/element.mjs"></script>

I originally created this in 2019 for a graph editor project I was working on.

https://codepen.io/wavebeem/pen/KEJqZr

<wavebeem-disjoint-graph-union></wavebeem-disjoint-graph-union>

## How it works

```js
class Connections {
  #map = new Map();

  clear() {
    this.#map.clear();
  }

  add(a, b) {
    this.get(a).add(b);
    this.get(b).add(a);
  }

  get(a) {
    if (!this.#map.has(a)) {
      this.#map.set(a, new Set());
    }
    return this.#map.get(a);
  }
}
```

```js
const connections = new Connections();
let group = 0;
```

```js
const updateState = () => {
  group = 0;
  connections.clear();
  for (const n of nodes) {
    n.group = -1;
  }
  for (const s of segments) {
    s.group = -1;
    connections.add(s.node1, s.node2);
  }
  for (const n of nodes) {
    if (n.group === -1) {
      helper(n);
      group++;
    }
  }
};
```

```js
const helper = (node) => {
  node.group = group;
  for (const c of connections.get(node)) {
    if (c.group === -1) {
      helper(c);
    }
  }
};
```
