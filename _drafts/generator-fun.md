---
title: "Generator Fun"
description: "Even more fun with generators and functions which take them"
layout: post
tab: blog
---

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

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[2]: https://lodash.com/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[4]: https://github.com/tj/co
