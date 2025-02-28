---
title: >-
  Creating a colorized disjoint union of graphs
description: >-
  Blah blah blah.
date: "2025-02-24"
---

<script type="module" src="./assets/element.mjs"></script>

I originally created this in 2019 for a graph editor project I was working on.

<wavebeem-disjoint-graph-union></wavebeem-disjoint-graph-union>

**Click a node to remove it and its connections from the graph.**

You can watch the graphs recolor in real time as the number of disjoint graphs
changes. You can refresh the page to start over with the full graph, I'm too
lazy to make a button for it right now.

## How it works

Each disjoint graph is assigned a unique integer, with `group` used to track the
current group number we're traversing. The `connections` is a custom class used
to track bidirectional connections in a graph. It's a small wrapper around a
`Map` of `Set` values, which we'll cover in a moment.

```js
const connections = new Connections();
let group = 0;
```

First, we reset group to `0`, and clear out all the connections. Then we clear
out the group field on every node. We use `-1` as a signal for "this node hasn't
been assigned a group yet", which is important to make sure we don't traverse
the same node more than once. This could cause infinite recursion in a graph,
since its structure may have loops.

As we iterate the segments, we recrord which nodes they're connected to. This
part constructs an actual graph representation in memory, since otherwise all we
have is a list of points and lines. We need to be able to work backwards from
the points to determine their connections.

Finally, the graph traversal begins in the last `for` loop. We try to explore
the graph starting at each node, but only if we haven't already touched that
node before. When we're done exploring, we can increment the group number, so
each graph is uniquely numbered.

```js
const updateState = () => {
  group = 0;
  connections.clear();
  // Reset the visitation status of all nodes
  for (const n of nodes) {
    n.group = -1;
  }
  for (const s of segments) {
    s.group = -1;
    connections.add(s.node1, s.node2);
  }
  for (const n of nodes) {
    // Make sure we haven't visited this node before
    if (n.group === -1) {
      explore(n);
      group++;
    }
  }
};
```

This is pretty much a direct translation of the Wikipedia pseudocode for a
[depth first search](https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode).
I have a lot of experience with recursion, so this was familiar to me as it's a
similar algorithm to tree traversal, but with cycle prevention techniques added.

If you're not familiar with recursion, it's extremely useful for working with
nested data structures like the DOM, JSON, or graphs. You can often substitute
recursion with a stack and a while loop, but the recursive solution tends to be
shorter and easier to read, once you get used to it. Maybe I'll write more about
why I love recursion in the future...

```js
const explore = (node) => {
  node.group = group;
  for (const c of connections.get(node)) {
    // Make sure we haven't visited this node before
    if (c.group === -1) {
      explore(c);
    }
  }
};
```

Here's the definition of the `Connections` class, for reference. I could've used
a `Map` directly in the other code, but I liked this abstraction.

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
