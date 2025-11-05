---
date: "2025-02-23"
title: >-
  Simulating JS await with generator functions
description: >-
  Did you know that before async functions existed in JS, we simulated them with
  generator functions? Come with me on a code journey, in which I reveal the
  relatively short helper function that made it all possible.
---

## Why I wrote this

This post is a reflection on the relatively untapped power of generator
functions, seen through a historical lesson about the ingenuity of JS
programmers before async functions were in the language.

## A quick refresher on generators

In its simplest use-case, a generator function returns a stream of values. It's
like a single use array that doesn't store any of its values.

```js
function* evens() {
  let i = 0;
  while (true) {
    yield i;
    i += 2;
  }
}

for (const x of evens()) {
  if (x > 10) {
    break;
  }
  console.log(x);
}
```

Which prints the following numbers:

```
0
2
4
6
8
10
```

## Generators are so much more powerful

Generators are like functions with a pause button, and you can send/receive
values every time you press play. They can represent infinite sequences, unlike
arrays or objects. Since there's no limit on how long they can remain paused,
you can even use them in async scenarios.

## Fake async functions have been possible since ES2015

[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
predates ES2015 entirely, but the advent of native browser promises _and_
generator functions let creative programmers invent `async` and `await` before
it was added to the language in ES2017.

```js
function* fakeAsyncFunction() {
  const x = yield load("x");
  console.log("x", x);
  const y = yield load("y");
  console.log("y", y);
}

run(fakeAsyncFunction);

// waits 1000 ms
// x { data: 'x' }
// waits 1000 ms
// y { data: 'y' }
```

The secret sauce is the unassuming `run` function. We'll define that soon.
Notice how this looks almost exactly like using modern async functions.

```js
async function realAsyncFunction() {
  const x = await load("x");
  console.log("x", x);
  const y = await load("y");
  console.log("y", y);
}
```

## Old school async functions

Before the `async function` syntax existed, we made functions that returned a
new promise at the top. I wrote about the
[difficulty of using promises directly](/blog/2016/broken-promises/), but it was
still better than Node.js style callback APIs, and less clunky than event
systems.

```js
function load(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: name });
    }, 1000);
  });
}
```

There's no need to call `reject` in this function, but it's meant to receieve an
`Error` type and be used similar to `throw`.

## The async generator runner

Since generators return iterable iterators, you can do so much more with them
than a `for..of` loop. Read my previous post about
[iterables, iterators, and generators](/blog/2017/js-iterators/) for more detail
about the differences between them.

Up until now, you may have only used iterators from `for..of` loops. If you need
more control, you can use the `.next` method of iterators directly. This lets
you send

```js
function run(generatorFunction) {
  // Run the generator once to get its iterator.
  const iterator = generatorFunction();

  // Define a helper function for recursion.
  function helper(resolvedValue) {
    // The resolved value of the previous promise.
    // Initially it's undefined since there isn't
    // a promise to track when you start the function.
    const { value, done } = iterator.next(resolvedValue);

    // Iterators return `done: true` when
    // they're done.
    if (!done) {
      // Convert the yielded value to a promise
      // (in case it isn't one already),
      // then wait for its resolved value and
      // recurse with it.
      Promise.resolve(value).then(helper);
    }
  }
  helper(undefined);
}
```

## Conclusion

The creativity of JS programmers is astounding to me. Maybe this will inspire
you to come up with your own great abstraction, or maybe you'll just feel
enriched knowing the power of generators. At the very least, I hope this was an
interesting history lesson.
