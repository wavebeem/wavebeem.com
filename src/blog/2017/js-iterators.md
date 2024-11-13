---
title: "JavaScript iterators and more"
description:
  "A comparison and overview of generators, iterators, and iterables in JS."
tags:
  - "programming"
  - "javascript"
date: "2017-08-27"
---

## Why

Many languages (Java, C#, Python, etc) have a concept of an object being
_iterable_, that is, capable of giving you values from first to last in a
particular order. This often comes in the form of a "for each" loop such as this
in Python:

```python
for x in [0, 1, 2]:
    print(x)
```

This _iterates_ over the values in the array `[0, 1, 2]`. But it turns out not
everything you might want to iterate over is best represented as an array. In
Python you might want to iterate over a set `{0, 1, 2}`, a tuple `(0, 1, 2)`, or
even a range `range(3)`.

## JS interfaces

In JavaScript, iterables are objects which have a method `Symbol.iterator` which
return an iterator. Not sure about symbols? Check out the [MDN page on
symbols][3]. If you're familiar with Python, this is sort of like making a
`__iter__` method.

```js
var iterable = {
  [Symbol.iterator]: function () {
    // return ...
  },
};
```

Which can be written with method shorthand syntax as:

```js
var iterable = {
  [Symbol.iterator]() {
    // return ...
  },
};
```

Iterators are objects with a `next` method that returns an object with keys
`done` and `value`.

```js
var iterator = {
  i: 0,

  // This new ES6 syntax is like `next: function()`
  next() {
    this.i++;
    if (this.i > 10) {
      return { done: true };
    }
    return {
      done: false,
      value: 1,
    };
  },
};
```

If you repeatedly call `iterator.next()` you'll get the values 1 through 10.
Note that there's no way to go backwards or restart an iterator. This is
necessary to keep iterators applicable to many use cases where this would be
difficult or impossible.

Iterators may also be iterables if they have a `Symbol.iterator` method that
returns `this`.

## A range iterable

You're probably familiar with the JavaScript `for` loop:

```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}
```

Using iterators, you could write a loop like this:

```js
for (var i of range(0, 9)) {
  console.log(i);
}
```

This is a lot clearer to read, and it encapsulates the details of `<` and `++`,
making it harder to make typos in your loop and goof it up.

Here's how to make a `range` function which returns an iterable that works like
that:

```js
function range(start, end) {
  return {
    [Symbol.iterator]() {
      return {
        i: start,

        next() {
          this.i++;
          if (this.i > end) {
            return { done: true };
          }
          return { done: false, value: this.i };
        },
      };
    },
  };
}
```

Wow, sort of a mouthful, huh? Fortunately, there's a better way to write this!

## Yield to the generators

Iterators involve manually tracking "how far" you've made it, which in the case
of counting from 0 to 9 is rather annoying, but more complicated iterators get
incredibly unwieldy very quickly.

But what if you didn't have to keep track of all this mess? Generators are here
to help.

Strangely enough "generator" is spelled `function*` in JavaScript. Generators
are special functions that return iterable iterators for you. Instead of using
`return` you write `yield` to send values back. The generator automatically
pauses after calling `yield` and waits until more values are needed.

```js
function* oneTwoThree() {
  yield 1;
  yield 2;
  yield 3;
}
```

The usual way to use an iterable is the new `for...of` loop (note: not
`for...in`, that's completely different):

```js
for (var x of oneTwoThree()) {
  console.log(x);
}
```

This will log 1, 2, 3 in succession. Note that the `oneTwoThree()` has to be
called with parentheses here.

## Gotcha: once only

Imagine a generator which made an HTTP call. If you wanted to be able to iterate
the value multiple times, you would either have to make the HTTP call
again—**which may not produce the same value**—or store the value. Both of these
are not ideal. So default generators can only be iterated once because they
return iterables which are their own iterators.

```js
var iterable = oneTwoThree();

for (var x of iterable) {
  console.log(x);
}

for (var y of iterable) {
  console.log(y);
}
```

You can instead call the generator more than once so you have a fresh iterable
iterator every time.

```js
for (var x of oneTwoThree()) {
  console.log(x);
}

for (var y of oneTwoThree()) {
  console.log(y);
}
```

This prints 1, 2, 3 two times instead of just once.

## Reusable generators

If you know that your generator does not rely on external state that might
change, you can make it restartable safely.

JS normally wants _iterables_ not _iterators_ themselves, so if we wrap the
iterable iterators returned from generators then we can iterate over them
multiple times:

```js
var oneTwoThreeAgainAndAgain = {
  // The `*` here is the `*` from `function*`
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

Note the `*` before the method. This is a strange shorthand for the following:

```js
var oneTwoThreeAgainAndAgain = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

The `function` is implied since it's inside an object literal, but we still have
to put the `*` somewhere so JavaScript knows it's a generator. Weird, I know.

Remember, generators return objects which are simultaneously _iterators_ **and**
_iterables_, which is why you can use them directly in a `for...of` loop or
return them from a `Symbol.iterator` method.

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

…it's good to know that this actually works with not just arrays, but any
iterable on the right hand side!

If you want, you can ignore extra values too:

```js
var [first] = oneTwoThreeAgainAndAgain;
console.log(first);
```

You can even write commas with no variable name to grab a value from the
iterable but ignore it.

```js
var [, second, third] = oneTwoThreeAgainAndAgain;
console.log(second, third);
```

## Truncating infinity

Because iterators don't store their values permanently like arrays, they can
even be infinite!

```js
var evenNumbers = {
  *[Symbol.iterator]() {
    var n = 0;
    while (true) {
      yield n;
      n += 2;
    }
  },
};
```

If you use a `for...of` loop on this, it will never end. So you'll need to add a
`break` or `return` into the loop at some point to jump back out.

```js
for (var n of evenNumbers) {
  if (n > 10) {
    break;
  }
  console.log(n);
}
```

**Note:** I'm sure the functional programmers in the back are cringing right
now. Don't worry, it's not too hard to write functions like `take` and `map` and
`filter` which operate on iterables instead of just arrays. More on that in a
later post.

This will print out 0, 2, 4, 6, 8, 10.

Alternatively, you can use destructuring to grab just the numbers you need,
ignoring the extra values just like before. Remember that generators pause after
`yield`ing, so you don't have to worry about the function running forever.

```js
var [zero, two, four] = evenNumbers;
console.log(zero);
console.log(two);
console.log(four);
```

For more about destructuring, see the [MDN article on destructuring][1].

## Cleaning up

Usually it's safe to just jump out of an iterator when you're done, but
sometimes you have some cleanup work to do at the end. Luckily, TC39 thought of
that when creating iterators. Internally, there's a `.return()` method that
iterators can optionally have. The built-in `for...of` loop automatically calls
it for you!

```js
var count123 = {
  i: 1,

  [Symbol.iterator]() {
    return {
      next() {
        this.i++;
        if (this.i > 3) {
          return { done: true };
        }
        return { done: false, value: this.i };
      },

      return() {
        this.i = 0;
      },
    };
  },
};
```

Yowza! We've been avoiding writing iterators by hand because it stinks. Luckily,
good old `try...finally` can take its place inside a generator.

```js
function* count123() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } finally {
    // This gets called even if you break after the first yield
    console.log("I'm all done!");
  }
}

var [a, b] = count123();
console.log(a);
console.log(b);
```

This will log "I'm all done!" **then** log 1, 2, because the iterator was
aborted before it yielded the value 3.

A more realistic example would be canceling some kind of network request or
resetting global state which was changed by the iterator.

## Conclusion

For robust code, write functions that return iterable objects using generators.
Wow, what a mouthful. Basically stuff that looks like this:

```js
function myFunction(/* ... */) {
  return {
    *[Symbol.iterator]() {
      // yield ...
    },
  };
}
```

Unless you're making network calls or reading values which may change. In that
case, just use regular generator functions and make it someone else's
responsibility to call your generator more than once.

```js
function* myGenerator(/* ... */) {
  // yield ...
}
```

Iterators work in straight ES5 code, but the `for...of` loop compiles to quite a
bit of code if you look at the output from Babel. Worse, generators produce
incredibly large, confusing code, and require a runtime library. See [my post on
Babel][5] for more info.

That being said, iterators are really cool. Even though they're a bit confusing,
it's one of the first things in JS where we really have built-in extensibility
on a feature, so we're not just limited to the language's built-in assumptions.

[1]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[2]: https://lodash.com/
[3]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[4]: https://github.com/tj/co
[5]: /blog/2016/leaning-tower-of-babel/
