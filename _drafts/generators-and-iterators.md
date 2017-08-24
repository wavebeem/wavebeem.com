---
title: "Generators, Iterators, and Iterables"
description: "A comparison and overview of generators, iterators, and iterables in JS"
layout: post
tab: blog
---

## Why

TODO

## Note

Check out the [glossary](#glossary) and [terms](#terms) for info on new ES6 features, and definitions for the terms "generator", "iterator", "iterable", and "iterable iterator".

## First generator

Generators are written with `function*` in front. The keyword `yield` can only be used inside them, and it's sort of like `return` except you can call it more than once, and the function can keep going after `yield` if more values are required.

```js
function* oneTwoThree() {
  yield 1;
  yield 2;
  yield 3;
}
```

The usual way to use an iterable is the new `for...of` loop (note: not `for...in`, that's completely different):

```js
for (var x of oneTwoThree()) {
  console.log(x);
}
```

This will log 1, 2, 3 in succession. Note that the `oneTwoThree()` has to be called with parentheses here.

## Gotcha: once only

Iterators can only be iterated over a single time, and cannot go backwards. For example:

```js
var iterableIterator = oneTwoThree();

for (var x of iterableIterator) {
  console.log(x);
}

for (var y of iterableIterator) {
  console.log(y);
}
```

This will not print 1, 2, 3 twice; it will print only once. This is because iterators can only go one direction and cannot be restarted. If you want to go multiple times, you'll need multiple iterators.

This can seem weird, but given that iterators don't store their values anywhere, you have to just get a brand new one entirely to start over.

This simple change fixes it:

```js
for (var x of oneTwoThree()) {
  console.log(x);
}

for (var y of oneTwoThree()) {
  console.log(y);
}
```

It can be kinda inconvenient, but consider a generator like this:

```js
function* colorSchemes() {
  while (true) {
    yield fetch("https://example.com/api/random-color-scheme");
  }
}
```

A generator like that would be impossible to go "backwards" in without simply storing all its values in an array as you go along, completely defeating the point of an iterator.

## Iterator by hand

Remember when I said generators are just a convenient way of writing iterators that look like functions? Well, here's how to make an iterator.

First, you generally start with an *iterable*, something that can give you back an iterator. This iterable *does not have to* store its values in memory, though it might! In order to be an *iterable*, something must be an object containing the key `Symbol.iterator`. Not the string `"Symbol.iterator"`, but like this:

```js
var iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        // ...
      }
    };
  }
};
```

Check the [glossary](#glossary) if this syntax looks weird to you.

OK so you have to have a particular method, but of course this method needs to do specific things too. Minimally, it needs to return an object with a `next()` method. The next method returns an object with two keys:

```json
{
  "value": 1,
  "done": false
}
```

If the iterator *is* done, then obviously `done` should be set to true. `value` can have any value if the iterator is done, since it is generally ignored.

So let's make the 1, 2, 3 generator as a hand-rolled iterator now:

```js
var oneTwoThreeAgain = {
  [Symbol.iterator]() {
    return {
      i: 0,
      next() {
        this.i++;
        if (this.i > 3) {
          return { done: true };
        }
        return { done: false, value: this.i };
      }
    };
  }
}
```

Wow. Even something super simple is really a mouthful when written by hand. You can see why generators were created.

So to iterate this:

```js
for (var x of oneTwoThreeAgain) {
  console.log(x);
}

for (var y of oneTwoThreeAgain) {
  console.log(y);
}
```

Interestingly enough, this will actually print 1, 2, 3 twice, like we wanted before. The reason is that the `for...of` loop invokes the `Symbol.iterator` method each time and gets a different `i` variable inside the closure to start over with.

## Iterable using a generator

So, it turns out that generators just return objects with `next()` methods on them, so iterables (objects that have `Symbol.iterator` methods) can actually make use of generators inside. You just have to add a `*` before the name:


```js
var oneTwoThreeAgainAndAgain = {
  // The `*` here is the `*` from `function*`
  * [Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  }
};
```

Hooray! That was pretty easy to write again, because we didn't have to manage the `next()` method manually, but watch this: we can iterate over it multuple times because it's an *iterable* rather than an iterator itself.

```js
for (var x of oneTwoThreeAgainAndAgain) {
  console.log(x);
}

for (var y of oneTwoThreeAgainAndAgain) {
  console.log(y);
}
```

Tada! We got 1, 2, 3 **twice**, just like we wanted initially.


## Destructuring

If you're familiar with the form…

```js
var [a, b, c] = oneTwoThreeAgainAndAgain;
console.log(a);
console.log(b);
console.log(c);
```

…it's good to know that this actually works with any iterable or iterators on the right hand side!

## Truncating infinity

```js
var evenNumbers = {
  * [Symbol.iterator]() {
    var n = 0;
    while (true) {
      yield n;
      n += 2;
    }
  }
};
```

If you use a `for...of` loop on this, it will never end! So you'll need to add a `break` or `return` into the loop at some point to jump back out.

```js
for (var n of evenNumbers) {
  if (n > 10) {
    break;
  }
  console.log(n);
}
```

This will print out 0, 2, 4, 6, 8, 10.

Alternatively, you can use destructuring to grab just the numbers you need.

```js
var [zero, two, four] = evenNumbers;
console.log(zero);
console.log(two);
console.log(four);
```

For more about destructuring, see the [MDN article on destructuring][1].

## Functional programming?

Iterators are very stateful by design, but using iterables can help hide some of that. Now, if you're used to programming in a functional style, you've probably been a bit grossed out by all these `for` loops and `break` statements. Unfortunately, unlike arrays, iterators do not come with `filter` or `map` or anything convenient like that. But, we can make them ourselves, and they should automatically work with arrays also since arrays are also iterables (hooray!).

```js
function iterMap(iter, fn) {
  return {
    * [Symbol.iterator]() {
      for (var x of iter) {
        yield fn(x);
      }
    }
  };
}

function iterFilter(iter, fn) {
  return {
    * [Symbol.iterator]() {
      for (var x of iter) {
        if (fn(x)) {
          yield x;
        }
      }
    }
  };
}

var twoFourSix = iterMap(oneTwoThree, x => x * 2);
var fourSix = iterFilter(twoFourSix, x => x > 2);
for (var x of fourSix) {
  console.log(x);
}
```

This will print out 4, 6. You could even build a whole library similar to [Lodash][2] that worked on iterables if you wanted! I think I might try that some time.

## Yield star

If you're gonna go composing iterators together, you should know there's a quick shortcut that's handy:

```js
yield* someIterable;
```

This is the same thing as:

```js
for (var x of someIterable) {
  yield x;
}
```

But obviously a lot nicer and shorter to write.

## Cleaning up

Usually it's safe to just jump out of an iterator when you're done, but sometimes you have some cleanup work to do at the end. Luckily, TC39 thought of that when creating iterators. Internally, there's a `.return()` method that iterators can optionally have. The built-in `for...of` loop automatically calls it for you!

But we've been avoiding writing iterators by hand anyway because it stinks. Luckily, good old `try` and friends can help us out here!

```js
function* count123() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    console.log("I'm all done!");
  }
}

var [a, b] = count123();
console.log(a);
console.log(b);
```

This will log "I'm all done!" **then** log 1, 2, because the iterator was aborted before it yielded the value 3.

A more realistic example would be resetting some kind of global state, like closing a file handle (not something normally done in JS, though).

## Conclusion

For robust code, write functions that return iterable objects using generators. Wow, what a mouthful. Basically stuff that looks like this:

```js
function coolThing(x, y) {
  return {
    * [Symbol.iterator]() {
      yield* someThing();
      for (var z of anotherThing()) {
        if (z < 3) {
          yield z;
        }
      }
    }
  };
}
```

Iterators are fairly easy to compile down to ES5 code to run in older browsers, but unfortunately generators turn into super huge confusing code that's hard to debug, so I can't really recommend using them in combination with a tool like Babel yet.

But iterators are really cool, and even though they're a bit confusing, it's one of the first things in JS where we really have built-in extensibility on a feature, so we're not just limited to the language's built-in assumptions.

## Other cool stuff

Iterators and generators can be used for more than just array-like stream applications. I might cover this myself later, but I recommend checking out the [co library][4] for one example.

## Glossary

This shortcut lets you put a method into an object literal with less fuss:

```js
var greeter = {
  phrase: "Hello, world",
  speak() {
    console.log(this.phrase);
  }
};
greeter.speak();
```

It works like this:

```js
var greeter = {
  phrase: "Hello, world",
  speak: function() {
    console.log(this.phrase);
  }
};
greeter.speak();
```

Keys inside square brackets are evaluated instead of treated as strings:

```js
var key = "x";
var obj = { [key]: 1 };
```

In this simple case, it works like the following:

```js
var key = "x";
var obj = {};
obj[key] = 1;
```

It's even more convenient in more complicated cases.

Combining that with iterables is what leads us to:

```js
var iterable = {
  [Symbol.iterator]: function() {
    // ...
  }
};
```

or the method shorthand:

```js
var iterable = {
  [Symbol.iterator]() {
    // ...
  }
};
```

Also, `Symbol.iterator` is *basically* a special kind of string. The [MDN page on symbols][3] explain them in more detail.

## Terms

Iterators are objects that have a `next()` method that returns an object with keys `done` and `value` (not a complete definition).

Iterables are objects that have a method `[Symbol.iterator]()` which returns an iterator.

Iterable iterators are iterator objects with a `[Symbol.iterator]()` method that just returns `this` (the object itself).

Generators are functions that return iterable iterators.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[2]: https://lodash.com/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[4]: https://github.com/tj/co
