---
title: >-
  Please stop using .forEach
description: >-
  You must use `for...of` instead of `.forEach` if you want to use `await`,
  `return`, or iterators. And `.forEach` offers no meaningful advantages over
  `for...of`.
---

## Async support

With the `for...of` loop, proper `async` support means that this code snippet
will run all `fetch()` calls in sequence, _then_ log `"Done"`.

```js
const paths = ["/a", "/b", "c"];
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
const paths = ["/a", "/b", "c"];
paths.forEach(async (p) => {
  await fetch(p);
});
console.log("Done");
```

## Proper flow control

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

You could make the argument to use a numeric `for` loop instead, but I'd rather
stub my toe than write one of those when I don't need to.

## Support for iterators and generators

If you're not already using generators, I think you should consider it. I've
[written about them before](https://www.wavebeem.com/blog/2017/js-iterators/),
and
[MDN has a nice article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators)
covering them. The `.forEach` method is incapable of working with iterators, and
must convert them to arrays first. This removes all benefits of iterators
(primarily [laziness](https://en.wikipedia.org/wiki/Lazy_evaluation) and memory
consumption being decoupled from the collection size).

## Isn't for...of slower?

Maybe, but you're not gonna notice the difference.

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

## for...of has been supported for nearly a decade (ES2015)

[September 2016](https://caniuse.com/es6) is when the last\* browser (Safari),
impelmented ES2015, 8.5 years ago at the time of writing.

There were some concerns related to large compiled output in order to support
other related features

Because ES2015 introduced the iterator protocol and generators, and `for...of`
integrates with them natively, there was some concern about needing to use
massive polyfills in order to use `for...of` in production. But there were
options to enable `for...of` compilation that only supported array-like objects,
which didn't bloat the compiled code.

And at this point, everyone connecting to your website has a browser that's
natively supported all of these features for years, so hopefully you're not
targeting ancient versions of JS with your Babel config or whatever compiler
you're using.

\*Technically Edge took longer, but that's the old version of Edge
(pre-Chromium), which doesn't exist any more.

## React made everyone allergic to side effects

Because [React](https://react.dev/) has taken over the world and React insists
on using various techniques from functional programming, we have a growing
allergy to anything that looks like side effects in the JS community. Perhaps
`.forEach` receives an undue reputation boost by being colocated with `.map`,
`.filter`, and `.reduce`.

## Could this be related to for...in?

The related `for...in` loop is a bit confusing. It should generally be avoided
in favor of a `for...of` loop iterating the keys of an object:

```js
for (const key in object) {
  console.log(key);
}
```

[for...in] iterates over all enumerable properties, including those from the
prototype chain. Given that prototype augmentation used to be more common in JS,
this was deemed too risky and the newer
[Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
method became the preferred way to get keys from an object.

Perhaps this common wisdom of avoiding `for...in` mentally polluted people
against wanting to use `for...of` due to confusion. Anecdotally, some people
can't remember which is which.

## Could this be related to linter rules?

Because non-native `for...of` is difficult to polyfill 100% correctly, I
remember seeing some people choose to not use it at all! There were alternative
polyfill approaches like "array-only" mode so that you could use modern syntax
without every modern feature, but I suspect it may not have been as popular.

Prebuilt ESLint rule collections can be really influential. The
[Airbnb ESLint config package](https://www.npmjs.com/package/eslint-config-airbnb)
gets nearly 3.5 million weekly downloads.

I've seen first-hand that companies will cling to outdated rules laid down 5+
years ago in the name of consistency. I'm a firm believer that consistency
shouldn't hold back progress. Going from a perfectly consistent but old approach
to a perfectly consistent and new approach in one single step is challenging on
any code base of a non-trivial size.

## Could this be related to Ruby's own distaste of for...in loops?

Ruby has its own `for...in` loop, but it has
[a couple weird caveats](https://docs.ruby-lang.org/en/2.4.0/syntax/control_expressions_rdoc.html#label-for+Loop)
versus their preferred `.each` method for iteration.

> The for loop is similar to using each, but does not create a new variable
> scope.
>
> The result value of a for loop is the value iterated over unless break is
> used.
>
> The for loop is rarely used in modern ruby programs.

The `for...in` loop in Ruby uses the `.each` method internally:

```rb
items = nil
for x in items
  puts x
end
# undefined method `each' for nil:NilClass (NoMethodError)
```

```rb
items = nil
items.each do |x|
  puts x
end
# undefined method `each' for nil:NilClass (NoMethodError)
```

Besides those caveats, it's really just syntax sugar over some methods (a common
occurrence in Ruby). Perhaps there's a default [RubuCop](https://rubocop.org/)
linter rule that prevents you from using `for...in`? It wouldn't be the first
time I saw JS coding standards influenced by practices from the Ruby on Rails
community.
