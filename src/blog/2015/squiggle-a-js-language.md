---
title: "Squiggle: a JS Language"
description:
  "An introduction to Squiggle, a compile-to-JS programming language I made."
date: "2015-07-01"
---

## Note

This was originally
[posted on Medium.com](https://medium.com/@wavebeem/squiggle-a-compile-to-js-language-771e1a4abe5d)
on July 1, 2015, but I'm reposting it on my personal blog on May 8, 2019.

## Why

Yeah, I know: yet another programming language.

Still with me? You might be wondering why I decided to make a programming
language. Here’s a few reasons:

- I can.

- I’ve never written a compiled language before (Only an interpreted one:
  LatteScript).

- I wanted an expression-oriented language.

- I wanted immutable data (That is also transparently usable from JS).

- I wanted constant variable bindings (Makes code easier to reason about).

- I wanted function arity (argument count) checking (Fix common source of
  mistakes with callbacks and such).

- I wanted a powerful runtime type system (TypeScript only enforces checks at
  compile time, forcing library authors to perform additional manual runtime
  checking to avoid processing incorrect data).

- There’s a chance I might make something useful.

Here’s the “Hello, World!” program:

```
console.log("Hello, World!")
```

“But that’s just JavaScript without a semicolon,” you think. “Are they just
making another CoffeeScript?” No.

## Factorial Example

Let’s look at a more involved example:

```
let (
    factorial = ~(n)
        if <(n, 2)
        then 1
        else *(n, factorial(-(n, 1))),
    main = ~() factorial(4)
) in {"main": main}
```

We have a program where the main function computes `factorial(4)`. Please excuse
the prefix notation on the math operators, that’s likely to change in the
future.

If I were to hand write the JavaScript for this module, it would look something
like this:

```js
function factorial(n) {
  return n < 2 ? 1 : n * factorial(n - 1);
}
function main() {
  return factorial(4);
}
module.exports = { main: main };
```

This probably looks cleaner than the Squiggle version, even if I had to say
return everywhere. But the output of Squiggle is a bit more involved than this.

Here is the JavaScript output from Squiggle, with the Squiggle internal and
standard library functions removed for clarity:

```js
module.exports = (function () {
  var factorial = function (n) {
    if (arguments.length !== 1) {
      throw new LANG$$js_Error("...");
    }
    return $lt(n, 2) ? 1 : $star(n, factorial($minus(n, 1)));
  };
  var main = function () {
    if (arguments.length !== 0) {
      throw new LANG$$js_Error("...");
    }
    return factorial(4);
  };
  return LANG$$object([["main", main]]);
})();
```

Notice how `<` becomes `$lt`, and `*` becomes `$star`? These are internal
Squiggle functions that wrap JavaScript’s built-in operators and will eventually
provide type checking. No more `(3*'hi')` giving you `NaN`. This will throw an
error. The operator `++` will call `.concat()` if its arguments are both strings
or both arrays.

Functions you create automatically have arity checking inserted. No more
forgetting the argument to factorial and getting NaN. No more passing extra
ignored arguments accidentally. There’s even plans to add runtime value
assertions (pre- and post-conditions), as follows (subject to change):

```
let (
    nonempty = ~(xs) >(xs.length, 0),
    first = ~(xs: nonempty) xs[0]
) in {"first": first}
```

Also, `LANG$$object` creates an object using `Object.freeze`, so no one can ever
mess up your values. And because it’s a function, not an object literal, keys
can be computed values, not just string literals.

This code would assert that `nonempty(xs)` is true every time first is run,
ensuring that the preconditions have been satisfied, or throwing an exception.
The precondition could be any function returning a boolean value, allowing you
to easily reuse constraints across many functions to ensure clean APIs in
programs you write.

Unlike TypeScript, this would not detect any errors at compile time, but also
unlike TypeScript, this would detect errors at runtime, even by plain JavaScript
consumers.

## What’s Next?

I already have a decent amount of language implemented, so my next post will
probably be a dive into the concepts available in Squiggle.

You can find the source on
[GitHub](https://github.com/squiggle-lang/squiggle-lang).
