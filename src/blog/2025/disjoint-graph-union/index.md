---
date: "2025-02-28"
title: >-
  Creating a colorized disjoint union of graphs
description: >-
  I used graph traversal to implement an error detection system for a graph
  editor at a previous job.
---

<script type="module" src="./assets/element.mjs"></script>

---

<wavebeem-disjoint-graph-union></wavebeem-disjoint-graph-union>

**Click a node to remove it and its connections from the graph.**

You can watch the graphs recolor in real time as the number of disjoint graphs
changes. Reset and try again to see a different variation.

## The story

I had the pleasure of working on the intersection of "graph traversal algorithm"
and "user interface design" at a previous job, and I'm proud of a feature I came
up with and implemented.

The context here is that at this job, our users would draw navigation graphs on
top of maps of their indoor spaces. Our app would then help users navigate
within these spaces, like an indoor-optimized version of Google Maps that used
Bluetooth signal strength triangulation instead of GPS.

Based on troubleshooting customer issues, I realized that one of the most
difficult problems our users faced was identifying routing issues. Customers
would write to us and say "the system says I can't navigate from Point A to
Point B". The problem was, this was the correct answer. According to their own
routing graphs, there were no walkable paths from A to B, but it was _really
hard to tell_ by looking at the graph.

My first thought was to take every combination of points in the map and attempt
to find a route between them. I could then make a list of unroutable journeys,
but this would be really slow, and probably hard to read. Not to mention that
_sometimes_ unroutable journeys actually made sense. For instance, a ground
floor level might have multiple entrances but lack internal doors connecting
every part of the building together.

So my idea at this point was to make it easier for our users to notice when
things weren't routable and let them decide. Humans are really good at
identifying groups based on color, so I came up with an algorithm to identify
each "disjoint graph" (group of nodes + segments that are connected to each
other) and color each group separately. Even the most absurd real life locations
we saw would only have 2 or 3 disjoint graphs at most (imagine a ground floor
level with several entrances but not a lot of internal doors), so only a few
colors were even needed to help users identify the groups.

## How it works

```js
export class WavebeemDisjointGraphUnion extends HTMLElement {
  #updateState = () => {
    // Reset the current group ID and list of connections
    this.#group = 0;
    // Keep track of every connection from A to B
    this.#connections.clear();

    // Reset the group ID for each node.
    // -1 means we haven't visited the node or
    // segment yet since it was last changed.
    for (const n of this.#nodes) {
      n.group = -1;
    }

    // Reset the group ID for each segment.
    // Record the connection from each point it's attached to.
    for (const s of this.segments) {
      s.group = -1;
      this.#connections.add(s.node1, s.node2);
    }

    // Start doing graph traversal.
    // Each time we finish, change the group ID.
    for (const n of this.#nodes) {
      if (n.group === -1) {
        // Explore the graph starting at the node `n`
        this.#explore(n);
        this.#group++;
      }
    }
  };

  /**
   * Basically a direct translation of
   * "depth first search" from the pseudocode on Wikipedia
   *
   * https://en.wikipedia.org/wiki/Depth-first_search#Pseudocode
   *
   * @param {Node} node
   */
  #explore = (node) => {
    // Assign this node to the current group
    node.group = this.#group;
    // Iterate over each node connected to this node
    for (const c of this.#connections.get(node)) {
      // If it hasn't been explored yet
      if (c.group === -1) {
        // Recurse into the neighboring node
        this.#explore(c);
      }
    }
  };
}
```

If you're not familiar with recursion, it's extremely useful for working with
nested data structures like the DOM, JSON, or graphs. You can often substitute
recursion with a stack and a while loop, but the recursive solution tends to be
shorter and easier to read, once you get used to it. Maybe I'll write more about
why I love recursion in the future...

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
