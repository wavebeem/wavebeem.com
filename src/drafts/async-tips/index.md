```js
// Parallel, but we have no idea if/when any of these async operations fulfill or reject
items.map(async (x) => {
  await f(x);
});

// Serial, with an exception on the first rejection (never starting the following async operations)
for (const x of items) {
  await f(x);
}

// Parallel, but throws an exception immediately if any promise rejects
await Promise.all(
  items.map(async (x) => {
    await f(x);
  }),
);

// Parallel, returns an array of { status, value } objects after every promise has been fulfilled or rejected
const results = await Promise.allSettled(
  items.map(async (x) => {
    await f(x);
  }),
);

// Parallel batch processing
for (const group of batch(items, 20)) {
  await Promise.all(
    items.map(async (x) => {
      await f(x);
    }),
  );
}

// Ideal batch size will depend on your circumstances, but `os.cpus().length` from Node is a decent starting point for CPU bound processing jobs

function* batch(iter, size) {
  let list = [];
  for (const x of iter) {
    list.push(x);
    if (list.length >= size) {
      yield list;
      list = [];
    }
  }
  if (list.length > 0) {
    yield list;
  }
}
```

```js
function lazyPromise(fn) {
  let p;
  return {
    then(resolve, reject) {
      if (!p) {
        p = fn();
      }
      return p.then(resolve, reject);
    },
  };
}

const a = lazyPromise(async () => {
  console.log("Started A");
  return "a";
});

const b = lazyPromise(async () => {
  console.log("Started B");
  return "b";
});

const c = lazyPromise(async () => {
  console.log("Started C");
  return "c";
});

console.log(await b, await c, await b);
```
