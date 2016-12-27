---
title: "Broken Promises"
layout: post
description: "How to use and how not to use promises"
---

## Notes

In this blog post I'm going to be using some [ES6][1] syntax. ES6 is the latest version of JavaScript. When you see `x => x + 1`, that's basically the same as `function(x) { return x + 1; }`. If you're not sure if you can use ES6, you should google it.

## Error handling

Promises don't have a very large API, but that doesn't mean they're simple to learn. How error handling works is a bit tricky in promises.

First of all, there's `p.then(ok)`. This is the "happy path" handler, and the one you should be using most of the time.

```js
var p = Promise.resolve(1)
  .then(x => x + 1)
  .then(x => x + 1)
  .then(x => x + 1);

p.then(x => console.log(x));
// Prints 4
```

If one of those steps fail, then the final `console.log` there will never happen.

```js
var p = Promise.resolve(1)
  .then(x => x + 1)
  .then(function() {
    throw new Error("something goofed up here");
  })
  .then(x => x + 1);

p.then(x => console.log(x));
// Nothing is ever printed
```

There's also `p.then(ok, fail)`. If the promise `p` succeeds, it calls `ok(x)` where `x` is the data returned from `p`. If `p` fails, then it calls `fail(err)` where `err` is the error thrown by `p`. But remember that promises are *values*. So what is the value of a promise after its fail handler has been called? It's the value the fail handler returns. This means that unless you throw *again* inside your fail handler, you've effectively saved your promise from failure and are substituting a new value into your promise. Also, `.catch(fail)` is just a shorthand for `.then(null, fail)`, which is pretty handy to use.

```js
var p = Promise.resolve(1)
  .then(x => x + 1)
  .then(function() {
    throw new Error("some error");
  })
  .catch(function() {
    console.error("There was an error");
    // Prints "There was an error"
    return 1;
  })
  .then(x => x + 1);

p.then(x => console.log(x));
// Prints 2
```

You should always either `throw` or `return` from the fail handlers for your promises, because JavaScript will implicitly `return undefined` at the end of a function for you, which you probably don't want in your promise value:

```js
var p = Promise.resolve(1)
  .then(function() {
    throw new Error("oopsy");
  })
  .catch(function(err) {
    console.error("I found an error:", err);
    // Prints "I found an error:", and the error
  });

p.then(x => console.log(x));
// Prints undefined
```

So if you just rethrow the error for errors you can't actually recover from, you'll be fine:

```js
var p = Promise.resolve(1)
  .then(function() {
    throw new Error("oopsy");
  })
  .catch(function(err) {
    console.error("I found an error:", err);
    // Prints "I found an error:", and the error
    throw err;
  });

p.then(x => console.log(x));
// Doesn't print anything
```

## Value your promises

The most important thing about promises (especially compared to callbacks) is that promises are *values*. That means you can assign them to a variable, return them from a function, or pass them to another function. If you don't do something with the value of your promise, you're losing information! You might not always need this information, but it's there, and don't forget it.

So instead of something like this:

```js
var theData = {};

function onLoad() {
  console.log("Hello, " + theData.name);
}

function init() {
  request("/my-data").then(function(data) {
    theData = data;
    onLoad();
  });
}

init();
```

You can write this:

```js
function getData() {
  return request("/my-data");
}

function onLoad(data) {
  console.log("Hello, " + data.name);
}

getData().then(onLoad);
```

## Pyramids of doom

Often you'll see `.then` chains nested, forming this "pyramid" shape:

```js
function chaseData(url) {
  return request(url).then(res1 =>
    request(res1.someUrl).then(res2 =>
      request(res2.anotherUrl).then(res3 =>
        res3.data
      )
    )
  );
}
```

This often happens because the value from one promise is used to get another promise, and so on. But promises were built for handling this already! If you have a simple pipeline where the next operation only depends on the previous, you can totally flatten your pyramid into a nice and easy road:

```js
function chaseData(url) {
  return request(url)
    .then(res => request(res.someUrl))
    .then(res => request(res.anotherUrl))
    .then(res => res.data);
}
```

Ta-da! Much simpler to understand now. But I'm sure some of you at home are thinking, "but what about cases where you need to keep *all* the data until the final step". Well, you're right, that still is a little tricky. Sometimes you'll see code like this:

```js
function something(urlA, urlB) {
  return request(urlA).then(a =>
    request(urlB).then(b =>
      [a, b]
    )
  );
}
```

In this scenario, there's a handy promise function called `Promise.all`:

```js
function something(urlA, urlB) {
  return Promise.all([urlA, urlB]);
}
```

Of course, there's also the more complicated case where you need `a` in order to determine `urlB`, such as in this example:

```js
function userWithImage(userId) {
  var data = {};
  return request("/users/" + userId)
    .then(function(user) {
      data.user = user;
      return request(user.avatarImageUrl);
    })
    .then(image => [data.user, image]);
}
```

Just making a temporary `data` object you can reference in the next step of the pipeline completely flattens the need for nesting.

## Don't catch and release

If you're making a new function that returns a promise but you know you might encounter an error, you might write something like this:

```js
function asyncThing(x) {
  return new Promise(function(resolve, reject) {
    try {
      resolve(f(x));
    } catch (error) {
      reject(error);
    }
  });
}
```

But the Promise constructor (and `.then` functions) are designed to automatically call reject for you if something is thrown! Which means we can ignore the `reject` parameter entirely.

```js
function asyncThing(x) {
  return new Promise(function(resolve) {
    try {
      resolve(f(x));
    } catch (error) {
      throw error;
    }
  });
}
```

And then at this point there's no reason to even have the `try/catch` any more, we can just simplify to:

```js
function asyncThing(x) {
  return new Promise(function(resolve) {
    resolve(f(x));
  });
}
```
