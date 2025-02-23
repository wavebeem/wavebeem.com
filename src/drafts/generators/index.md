---
title: >-
  Simulating JS await with generator functions
description: >-
  Did you know that before async/await existed in JS, we simulated it with
  generator functions? A brief code journey demonstrating the concept.
---

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

## Generators are so much more complicated though

Generators are like functions with a pause button, and you can send & receive
values every time you press play. They can represent the infinite, unlike arrays
or objects. And because of their play/pause ability,

## The main body

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

Compare with:

```js
const x = await load("x");
console.log("x", x);
const y = await load("y");
console.log("y", y);
```

##

```js
function load(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: name });
    }, 1000);
  });
}
```

Compare with:

```js
async function load(name) {
  // Pretend this is a promise-ified version of setTimeout
  await sleep(1000);
  return { data: name };
}
```

## The "magic"

```js
function run(fn) {
  const it = fn();

  function helper(realValue) {
    let { value, done } = it.next(realValue);
    if (!done) {
      value.then((x) => {
        helper(x);
      });
    }
  }

  helper(undefined);
}
```
