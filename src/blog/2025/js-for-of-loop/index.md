---
date: "2025-03-10"
title: >-
  In defense of the “for...of” Loop
description: >-
  Despite its introduction in ES2015 and implementation in all browsers over 8.5
  years ago, I still see `.forEach` used in favor of the modern `for...of` loop.
  Sadly, `.forEach` is ill-suited for modern `await`-centric code, and
  complicates control flow. It's time to revisit this commonly banned syntax.
---

## Async Support

With the `for...of` loop, proper `async` support means that this code snippet
will run all `fetch()` calls in sequence, _then_ log `"Done"`.

```js
const paths = ["/a", "/b", "/c"];
for (const p of paths) {
  await fetch(p);
}
console.log("Done");
```

Since `.forEach` is unaware of `async` functions, it will naively call each
`async` function, ignore its promise value, and synchronously start the next
function. The result here is that every `fetch()` will run in parallel, `"Done"`
will be logged likely before any of them finish, and we will have no idea when
any of the `fetch()` calls have completed.

```js
const paths = ["/a", "/b", "/c"];
paths.forEach(async (p) => {
  await fetch(p);
});
console.log("Done");
```

## Flow Control

The `for...of` loop supports all regular flow control in JS: `continue`,
`break`, and `return`. Let's examine this somewhat contrived function that uses
all three.

```js
function find(items) {
  for (const x of items) {
    if (x.skip) {
      // Skip to the next `x` from `items`
      continue;
    }
    if (x.done) {
      // Leave the `for...of` entirely
      break;
    }
    if (x.value === target) {
      // Leave the `find` function immediately
      // without finishing the `for...of` loop
      return x.value;
    }
  }
  return null;
}
```

Because `.forEach` uses a callback function, `continue` and `break` are
syntactically invalid. Worse, `return` in this case is like `continue` in the
`for...of` example because there's no way to exit `.forEach` early.

```js
function find(items) {
  let ret = null;
  let done = false;
  items.forEach((x) => {
    if (done) {
      return;
    }
    if (x.skip) {
      // Skip to the next `x` from `items`
      return;
    }
    if (x.done) {
      // Avoid processing any further `x` from `items`
      done = true;
      return;
    }
    if (x.value === target) {
      ret = x.value;
      done = true;
      return;
    }
  });
  return ret;
}
```

I've definitely seen people who argue against `continue`, `break`, and "early"
`return`, but I think generally people aren't against them. And I think the
`.forEach` implementation of this function is pretty undeniably clunky for their
absence. Not to mention it's strictly less efficient since it can't avoid
processing the entire list.

## Iterators and Generators

If you're not already using generators, I think you should consider it. I've
[written about them before](/blog/2017/js-iterators/), and
[MDN has a nice article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators)
covering them. The `.forEach` method is incapable of working with iterators,
unless you convert them to arrays first. This removes all benefits of iterators
(primarily [laziness](https://en.wikipedia.org/wiki/Lazy_evaluation) and memory
consumption being decoupled from the collection size).

## Isn't "for...of" Slower?

**EDIT:** I only tested in Firefox for this section. That was a mistake. When
testing in Edge and Safari, `for...of` was actually as fast or fast than
`.forEach` in general. Numeric `for` still won in many tests, but I actually
found for small iteration counts that `for...of` was winning in Edge. I will not
pretend to be a benchmarking expert here, and benchmarking languages with JIT
compilation and several implementations is extra tough. Thanks,
[Tegan](https://social.vivaldi.net/@rawrmonstar/114141700781705291), for
pointing out conflicting benchmark results. I should probably test in the most
popular browsers when doing benchmarks. My mistake. (_2025-03-11_)

Maybe, but you're not gonna notice the difference. And if you do, you should use
a numeric `for` loop.

I used [JS Benchmark](https://jsbenchmark.com/) to test the summation of 10
million numbers using both iteration techniques.

```js
// SETUP CODE
const data = [...Array(10_000_000).keys()];

// TEST 1
let sum = 0;
for (const x of DATA) {
  sum += x;
}

// TEST 2
let sum = 0;
DATA.forEach((x) => {
  sum += x;
});
```

When adding _10 million_ numbers together, the difference was a measly 15 ms, or
around the time of one frame in a 60 fps application. It's easy to throw around
percentages here to mislead people, like "`.forEach` is 26% faster than
`for...of`", but I seriously doubt the actual time difference is meaningful in
most context for most programs.

Reducing the array of numbers from _10 million_ to 1 million changes the
difference to around 2 ms. Testing 100 thousand elements gives a difference of
about 0.1 ms.

I'm willing to bet you're iterating closer to 10 elements on average, though. In
this case I see the following results:

```
for...of
Ops/s: 12,770,982
Average run time: 0.000078 ms

.forEach
Ops/s: 35,682,598
Average run time: 0.000028 ms
```

So there's maybe something to be said here that `for...of` appears to have a
slower iteration speed and a larger fixed overhead for each run. But I'm willing
to bet that your time would be better spent making your React app not re-render
hundreds of times unnecessarily, shrinking your JS bundle, or going on a walk.
I'm not trying to trivialize performance critical JS, but I don't think most of
us are in a position where worrying about this detail matters.

Finally, the speed of both of these approaches are simply dwarfed by a standard
numeric `for` loop. And the regular `for` loop, while clunky to write, supports
all of the correct behaviors of the `for...in` loop (`async`, flow control),
except iterators.

```js
let sum = 0;
for (let i = 0; i < DATA.length; i++) {
  sum += DATA[i];
}
```

## "for...of" Has Been Supported Natively for Nearly a Decade

[September 2016](https://caniuse.com/es6) is when the last\* browser (Safari),
impelmented ES2015, 8.5 years ago at the time of writing.

Because ES2015 introduced the iterator protocol and generators, and `for...of`
integrates with them natively, there was some concern about needing to use
massive polyfills in order to use `for...of` in production. But there were
options to enable `for...of` compilation that only supported array-like objects,
which didn't bloat the compiled code.

And at this point, everyone connecting to your website has a browser that's
natively supported all of these features for years, so hopefully you're not
targeting ancient versions of JS with your Babel config or whatever compiler
you're using.

\* _Technically Edge took longer, but that's the old version of Edge
(pre-Chromium), which doesn't exist any more. Let's not worry about it._

## Confusion Between "for...of" and "for...in"

The related `for...in` loop is a bit confusing. It should generally be avoided
in favor of a `for...of` loop iterating the keys of an object:

```js
for (const key in object) {
  console.log(key);
}
```

[for...in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
iterates over all enumerable properties, including those from the prototype
chain. Given that prototype augmentation used to be more common in JS, this was
deemed too risky and the newer
[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
method became the preferred way to get keys from an object.

Perhaps this common wisdom of avoiding `for...in` mentally polluted people
against wanting to use `for...of` due to confusion. Anecdotally, some people
can't remember which is which.

## React Made Everyone Allergic to Side Effects

Because [React](https://react.dev/) has taken over the world and React insists
on using various techniques from functional programming, we have a growing
allergy to anything that looks like side effects in the JS community. Perhaps
`.forEach` receives an undue reputation boost by being colocated with `.map`,
`.filter`, and `.reduce`. I should write about how referential transparency does
not require a complete ban on immutability in the future.

## Airbnb Style Guide Strikes Again

Prebuilt ESLint rule collections can be really influential. The
[Airbnb ESLint config package](https://www.npmjs.com/package/eslint-config-airbnb)
gets nearly 3.5 million weekly downloads. Airbnb's style guide
[bans the use of for...of](https://airbnb.io/javascript/#iterators--nope)
entirely, based on a strong emphasis for non-mutative array methods and a
distaste for compiling generators to ES5. I would love to see them revisit this
in the future due to their influence.

Style guides can offer a comforting consistency to code bases, but progress
requires inconsistency as you migrate from old to new approaches.

## Conclusion

I realize that generators were inefficient to support when targeting ES5
environments, but now that we're 8.5 years removed from that era, I think we
should revisit our coding practices.

Hopefully the caveats I've shown make it clear that `for...of` is massively more
powerful and easier to read than `.forEach`.

## Further Reading

The Code Barbarian has a great article about
[For vs forEach() vs for/in vs for/of in JavaScript](https://thecodebarbarian.com/for-vs-for-each-vs-for-in-vs-for-of-in-javascript#empty-elements)
that you can read as well. Hat tip to them for confirming
[my suspicion about the Airbnb style guide](https://airbnb.io/javascript/#iterators--nope).
