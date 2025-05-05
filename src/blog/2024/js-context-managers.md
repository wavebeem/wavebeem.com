---
title: "JS Context Managers"
description:
  "See how to adapt Python's context managers for use in JavaScript. Break free
  from clunky try...finally blocks with this one weird trick."
date: "2024-10-14"
---

## Reading files in Python: the hard way

The old way of opening and reading a file in Python looked something like this:

```py
try:
    file = open("file.txt", "r")
    text = file.read()
    print(text)
finally:
    if file:
        file.close()
```

It's easy to forget to run `file.close()`, and your program won't immediately
show problems if you forget. But leaving file handles open too long can be a
problem. Plus, it's weird to look at code that uses `try...finally` everywhere
especially without a block to handle exceptions.

## Save me, context managers!

Fortunately, Python added
[context managers](https://docs.python.org/3/library/contextlib.html) and `with`
to deal with this problem. Suddenly 7 lines of code become 3, and we don't have
to "clean up after ourselves". Very nice.

```py
with open("file.txt", "r") as file:
    text = file.read()
    print(text)
```

## Making your own context manager

But what if you want to make your own context manager? There's a low level way
to do it, but the nicest way is to make a context manager using the decorator
`@contextmanager` to wrap a Python generator function... and then use
`try...finally` within there!

<aside>

### What's a generator?

Despite being included in the ES2015 specification, generators don't seem very
popular. If you're unfamiliar, you can read my blog post about
[generators, iterators, and iterables](/blog/2017/js-iterators/). The short
version is, they're like a cross between functions and arrays. `yield` is like
`return` but can happen as many times as you want, since it doesn't exit the
function.

</aside>

```py
from contextlib import contextmanager

@contextmanager
def using_file_text(name):
    try:
        file = open(name)
        text = file.read()
        yield text
    finally:
        if file:
            file.close()

with using_file_text("foo.txt") as text:
    print(text)
```

## How can we translate this to JS?

At some point I realized that JS had all the tools necessary to emulate this
feature. Let's look at this example adapted from the `node:fs/promises` official
documentation.

```js
import { open } from "node:fs/promises";

let file;
try {
  file = await open("file.txt", "r");
  const text = await file.readFile("utf-8");
  console.log(text);
} finally {
  if (file) {
    await file.close();
  }
}
```

## Let's clean this up with a JS "context manager"

Look at how much easier to read this is with a helper function:

```js
import { open } from "node:fs/promises";

for await (const text of withFileText("file.txt")) {
  console.log(text);
}
```

And here's how to make the helper function:

```js
async function* withFileText(filename) {
  let file;
  try {
    file = await open(filename, "r");
    const text = await file.readFile("utf-8");
    yield text;
  } finally {
    if (file) {
      await file.close();
    }
  }
}
```

## Wait, why can't we just use callback functions?

Yes, this pattern looks really similar to using callback functions:

```js
for await (const text of withFileText("file.txt")) {
  console.log(text);
}
```

```js
await withFileText("file.txt", (text) => {
  console.log(text);
});
```

Callback functions are fine but they have one major drawback: you can't use them
in conjunction with regular flow control like `try...catch` or even `return`!
This is the biggest reason why I recommend `for...of` loops over
`array.forEach`.

```js
const list = [1, 2, 3, 4];

// Prints 1
// Prints 2
function testForLoop() {
  for (const item of list) {
    if (item === 3) {
      // Returns from `testForLoop`
      return;
    }
    console.log(item);
  }
}

// Prints 1
// Prints 2
// Prints 4
function testForEachMethod() {
  list.forEach((item) => {
    if (item === 3) {
      // Returns from 3rd `forEach` call,
      // not `testForEachMethod`
      return;
    }
    console.log(item);
  });
}
```

## Summary

Using generator functions with `try...finally` and `for...of` loops lets us
abstract cleanup logic elegantly in JS, without the pitfalls of functions that
take callbacks (inability to use regular flow control).
