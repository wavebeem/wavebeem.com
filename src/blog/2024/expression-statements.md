---
date: "2024-11-14"
title: >-
  Diagnosing a common source of race conditions in JS
description: >-
  My thoughts on why expression statements can be a source of bugs—especially in
  async code—and a proposal for reviving JavaScript's nearly unused void
  operator.
tags:
  - "programming"
  - "javascript"
---

## What's an expression statement?

`1 + 3` is an expression. It's like writing `4` in JS except you make the
computer figure out the answer for you. `console.log(1 + 3);` is a statement.
Arguments to functions are always expressions. And `console.log(x);` is a
statement... because it has a semicolon at the end?

Let's consider that a working definition rather than a technical one. But in JS
you can also write `1 + 3;` as a statement. You can't write
`console.log(1 + 3;);`. Even though assignment is usually done in a statement,
like `x = 4;`, the syntax `x = 4` is actually an expression. You can write
`console.log(x = 4);` which will assign `x` to `4`, evaluate to `4`, and then
`console.log` that.

Expression statements exist for so we can use expressions that have side
effects.

<aside class="infobox">

### What's a side effect?

A [side effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>)
is any observable behavior besides pure computation. Side effects typically
include printing output (e.g. `console.log`), reading files (e.g. `import` or
`fs.readFileSync`), variable reassignment (e.g. `x = y;`), array mutation (e.g.
`a[i] = x` or `a.sort()`), object mutation (e.g. `obj.key = val`), or even
calling other functions that perform side effects.

</aside>

## Async functions make things even harder

JS already has confusing things like `array.sort()`, which both modifies the
array (a _side effect_) and returns a value. With async functions not only are
the side effects hard to discover, but the _completion_ of the function is easy
to ignore as well. If you try to use the return value of a function, but it's
actually a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise),
this usually isn't too bad to figure out. But if you're "throwing away" the
result via an expression statement, it can be really hard to track down the
stray promise.

```js
someAsyncFunction();
await anotherAsyncFunction();
```

Imagine if these functions had less obvious names:

```js
load();
await update();
```

And someone went through and refactored `load` to be aysnc when it wasn't
before. Now your code has a
[race condition](https://en.wikipedia.org/wiki/Race_condition#In_software),
where the order of side effects can differ based on how long the different code
sections take.

## What if it was an error to ignore function return values?

If there was a way to make JS complain when we don't use the return values from
functions, we could use the existing
[void](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void)
operator to explicitly discard return values we don't care about:

<aside class="infobox">

### What's the void operator?

It's never been especially useful, but it's been here since the dawn of time.
`void x` is like writing `x; undefined`, except the whole thing is an
expression. So you can do something like `console.log(void add(3, 4));` and
you'll log `undefined` instead of `7`.

It's a way of saying "yeah, this has a value, but I don't want it". It just
turns out we rarely need that feature in modern JS. It was mostly used in
[JS URIs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void#javascript_uris)
like `javascript:void(0);`

For even more cursed information, there's the
[comma operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_operator)
(`,`), which is like semicolon (`;`) but for expressions rather than statements.

</aside>

```js
const myArray = [3, 2, 1];

// LINTER ERROR: return value not used or ignored
myArray.sort();

// OK: return value explicitly discarded
void myArray.sort();
```

The
[no-floating-promises](https://typescript-eslint.io/rules/no-floating-promises/)
rule from [typescript-eslint](https://typescript-eslint.io/) actually uses this
exact approach! This sort of behavior would be hard to add to JS without engine
level changes, but a linter plugin for TypeScript can somewhat reliably catch
issues like this. Because `void` doesn't change behavior in statement context,
it's safe to add to your existing code without changing runtime behavior.
