---
date: "2025-02-25"
title: >-
  I Actually Had to Use Algebra at Work One Time
description: >-
  After trying and failing to dust off my knowledge of trigonometry, I had to
  re-learn linear equations and algebraic systems of equations in order to solve
  a problem at work. I swear this was not an interview question.
---

<script type="module" src="./assets/element.mjs"></script>

## The story

It might have been nice to know about the concept of
[vector projection](https://en.wikipedia.org/wiki/Vector_projection) back
in 2019. Instead, I fumbled my way through inventing something similar to it in
order to solve a seemingly simple math problem that plagued me and three other
developers for a day and a half at work.

I seriously think this is the hardest algorithm problem I've ever had to solve
at work. I approached it for _hours_ as a trigonometry problem, but always got
tripped up at some point. I was never amazing at trigonometry, though.

As far as I can tell, I only needed to use middle school math to solve this
problem, which makes it even funnier how hard this was. But hey, web developers
don't get a lot of experience working on math like this, so I'm trying to extend
some grace to myself.

I originally created this in 2019 for a graph editor project I was working on. I
wrote down the algorithm in a Codepen while testing things, and I've updated it
to work in my blog now.

## The problem

We wanted to add a feature where users could shift-click to add a point on a
line and connect it to the last point they made. One of the core features of the
app was creating a graph for navigating indoor spaces, and our users had to
hand-draw the points and lines on to traverse the map.

- Given the two red points (P1, P2)
- And the blue point under the mouse cursor (P3)
- Determine the coordinates of the blue point attached to the red line (P4)

## The result

Move your mouse cursor around within the graph area to see how the lines are
meant to connect.

<div class="frame max-content">
  <wavebeem-fun-algebra>
    Loading...
  </wavebeem-fun-algebra>
</div>

[View source](./assets/element.mjs)

**Note:** This doesn't quite work right on mobile. You can tap to select a
point, but due to the canvas scaling it won't be in the exact spot you clicked.
I can't be bothered to fix this right now.

## The algorithm

We start with the points `p1`, `p2`, and `p3`.

Points are JS objects with properties `x` and `y` which are numbers

The slope of the line connecting P1 and P2 is defined as its "rise over run", or
the change in Y values divided by the change in X values.

```js
const a = (p2.y - p1.y) / (p2.x - p1.x);
```

Because the second line is perpendicular to the first line, we know its slope is
the inverse

```js
const b = -1 / a;
```

> Um, how do I know this is true about perpendicular lines and slopes? It seems
> somewhat intuitive to me after the fact, but I may have found this on a
> children's math homework website while working on the problem.

At this point we know the coordinates of 3 out of 4 points, and the slopes of
both lines. So let's take inventory of the linear equations we can make from
this. Using the
[point-slope form](https://en.wikipedia.org/wiki/Linear_equation#Point%E2%80%93slope_form_or_Point-gradient_form):
`y = y1 + m(x - x1)`, where `(x1, y1)` is a known point on the line, and `m` is
the slope.

A note about notation: syntax like `ax3` will represent `a * p3.x` in JS. I want
to use shorter syntax for the algebraic component of this post.

```
y = y1 + a(x - x1)
y = y3 + b(x - x3)
```

Since `a` and `b` are values we already have, we now have two equations and two
unknown variables. They're both already solved for `y`, so we can set them equal
to each other to determine the value of `x` where they have the same `y`. As
they say in math class, it's time to solve for `x`!

```
y1 + a(x - x1) = y3 + b(x - x3)
```

Next, let's multiply `a` and `b` through the parentheticals on each side:

```
y1 + ax - ax1 = y3 + bx - bx3
```

Subtract `bx` from both sides:

```
y1 + ax - ax1 - bx = y3 - bx3
```

Subtract `y1` from both sides:

```
ax - ax1 - bx = y3 - bx3 - y1
```

Add `ax1` to both sides:

```
ax - bx = y3 - bx3 - y1 + ax1
```

Unfactor `ax - bx` into `x(a - b)`:

```
x(a - b) = y3 - bx3 - y1 + ax1
```

Divide both sides by `(a - b)`:

```
x = (y3 - bx3 - y1 + ax1) / (a - b)
```

Which looks like this in JS code

```js
const x = (p3.y - b * p3.x - p1.y + a * p1.x) / (a - b);
```

Everything on the right of the `=` is known value, so we can compute `x` at this
point.

Now that we know `x`, we can plug that value in to our linear equation to get
`y`:

```
y = y3 + b(x - x3)
```

Which looks like this in JS code:

```js
const y = p3.y + b * (x - p3.x);
```

These new `x` and `y` values are the coordinates for `p4` we've been wanting!

```js
p4.x = x;
p4.y = y;
```
