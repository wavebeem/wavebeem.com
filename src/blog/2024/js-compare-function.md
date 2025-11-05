---
title: "JS compare function"
description:
  "Exploring a small but mighty function that supercharges the JS Array sort
  method to rival Lodash's orderBy"
date: "2024-04-02"
---

## The problem

The JS
[Array sort method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
is notorious for taking verbose comparison functions.

By adding a short `compare` function and using the `||` operator with unary
negation (`-`), we can clearly express ordering without resorting to external
libraries like [Lodash](https://lodash.com/).

## The compare function

I went against my usual coding style (always use braces) in order to make this
short function more memorable. I also spared y'all the horror of nested `?:`
conditional operators :)

```js
function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
```

**Note:** This function won't behave well with objects and arrays. A stricter
function would throw an error or use a more complex algorithm to compare data
structures.

## What now?

Two key facts allow this function to shine:

1. JS defines `a || b` as evaluating to either `a` or `b`, not just `true` or
   `false`

2. Since `-compare(a, b)` is equivalent to `compare(b, a)`, you can prefix each
   descending comparison with a special character to make it more obvious than
   flipping the arguments

Seeing as `0 || x` evaluates to `x`, and `compare(a, b) === 0` means `a === b`,
the `||` operator lets us chain these "failing" comparisons elegantly to define
complex ordering:

```js
const users = [
  { name: "flynn", age: 48 },
  { name: "bridget", age: 36 },
  { name: "flynn", age: 40 },
  { name: "bridget", age: 34 },
];

// In SQL this would be `ORDER BY name DESC, age ASC`
[...users].sort((a, b) => -compare(a.name, b.name) || compare(a.age, b.age));
// =>
[
  { name: "flynn", age: 40 },
  { name: "flynn", age: 48 },
  { name: "bridget", age: 34 },
  { name: "bridget", age: 36 },
];
```

I think it's pretty clear that `compare` is a massive improvement over writing a
comparison function from scratch:

```js
[...users].sort((a, b) => {
  // DESCENDING by name
  if (b.name < a.name) return -1;
  if (b.name > a.name) return 1;
  // ASCENDING by age
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0;
});
// =>
[
  { name: "flynn", age: 40 },
  { name: "flynn", age: 48 },
  { name: "bridget", age: 34 },
  { name: "bridget", age: 36 },
];
```

## A real world example

And for a realistic example from my website
[Pokémon Type Calculator](https://pkmn.help):

```js
array.sort((a, b) => {
  return (
    // Put the largest cash bounty at the top
    -compare(languageBounty[a], languageBounty[b]) ||
    // Then sort by percentage completion
    compare(languageCompletions[a] || 0, languageCompletions[b] || 0) ||
    // Then sort by language name
    compare(a, b)
  );
});
```

It's not quite as readable as
[Lodash's orderBy](https://lodash.com/docs/#orderBy), but I like how the
ascending/descending information is colocated with the sort properties.

```js
_.orderBy(
  array,
  [
    // Put the largest cash bounty at the top
    (item) => languageBounty[item],
    // Then sort by percentage completion
    (item) => languageCompletions[item] || 0,
    // Then sort by language name
    (item) => item,
  ],
  ["desc", "asc", "asc"],
);
```

## Other thoughts

This pattern can be also applied to functions that return `undefined` or `null`
in the failure case by chaining the `??` operator:

```js
function parseInteger(value) {
  // Convert numbers to strings before parsing
  if (typeof value === "number") {
    return parseInteger(String(value));
  }
  // Ignore non-string values
  if (typeof value !== "string") {
    return undefined;
  }
  value = value.trim();
  // `Number("") === 0`, but we want `undefined`
  if (value === "") {
    return undefined;
  }
  const n = Number(value);
  // Check for NaN, Infinity, and -Infinity
  if (!Number.isFinite(n)) {
    return undefined;
  }
  // Remove the part after the decimal point
  return Math.trunc(n);
}

parseInteger(NaN) ??
  parseInteger(Infinity) ??
  parseInteger("   ") ??
  parseInteger("x2") ??
  parseInteger(" 42.1");
// => 42
```

You can even return entire objects, taking the result from the first call that
didn't fail. Debugging can be tougher compared with using exceptions or failure
objects, though.
