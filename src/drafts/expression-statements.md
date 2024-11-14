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
  - "essay"
---

## What's an expression statement?

`1 + 3` is an expression. It's the same as writing `4` in JS except you make the
computer figure out the answer for you. You can do `console.log(1 + 3);`.
Arguments to functions are always expressions. And `console.log(x);` is a
statement, because it has a semicolon at the end.

As a colloquial definition, statements are things with semicolons after them
(besides `function` and `class` declarations, I guess). But in JS you can also
write `1 + 3;` as a statement. You can't write `console.log(1 + 3;);` because
that's trying to put a statement where an expression goes.

It doesn't make sense to write `1 + 3;`, but JS allows it... probably for
convenience at the language level. `console.log(x)` is also an expression...
just like `f(x)` is or `myString.toUpperCase()`. You could add a semicolon and
make any of those a statement, but `console.log(x)` is the one that makes the
most sense. Expression statements exist for functions that have side effects.

<aside class="infobox">

### What's a side effect?

A [side effect](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>)
is any observable behavior besides pure computation. Side effects typically
include printing output (e.g. `console.log`), reading files (e.g. `import` or
`fs.readFileSync`), variable reassignment (e.g. `x = y;`), array mutation (e.g.
`a[i] = x` or `a.sort()`), object mutation (e.g. `obj.key = val`), or even
calling other functions that perform side effects.

</aside>

## Async makes the expression statement even tougher to deal with

JS already already had confusing things like `array.sort()`, which both modifies
the array (a _side effect_) and returns a value. With async functions not only
are the side effects hard to discover, but the _completion_ of the function is
easy to ignore as well. If you try to use the return value of a function, but
it's actually a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise),
this usually isn't too bad to figure out. But if you're "throwing away" the
result via an expression statement, it can be really hard to track down the
rogue promise.

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

```js
const myArray = [3, 2, 1];

// Error: return value not used or ignored
myArray.sort();

// OK: return value explicitly discarded
void myArray.sort();
```

The
[no-floating-promises](https://typescript-eslint.io/rules/no-floating-promises/)
rule from [typescript-eslint](https://typescript-eslint.io/) actually uses this
exact approach! This sort of behavior would be hard to add to JS without engine
level changes, but a linter plugin for TypeScript can somewhat reliably catch
issues like this.
