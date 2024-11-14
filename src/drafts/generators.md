---
title: "Generators"
description: "Generators are cool"
tags:
  - "programming"
  - "javascript"
---

## The main body

```js
run(function* () {
  const x = yield load("x");
  console.log("x", x);
  const y = yield load("y");
  console.log("y", y);
});

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
