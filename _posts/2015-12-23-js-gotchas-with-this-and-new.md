---
title: "JS Gotchas with This and New"
layout: post
description: "How JS's 'this' and 'new' work, and how to avoid issues with them"
---

## Note

This was originally [posted on Medium.com](https://medium.com/@wavebeem/javascript-gotchas-with-this-and-new-dfb65e387ef) on December 23, 2015, but I'm reposting it on my personal blog on January 5, 2017.

## Introduction

Love it or hate it, you’ve probably used JavaScript at some point. JavaScript has two keywords to aid in writing [object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming) code: `this` and `new`. Despite the Java namesake for JavaScript, these keywords work completely differently in JavaScript, and are frequently misunderstood or used improperly on accident. This post explains the behavior of `this` and `new`, and explores common mistakes with using them, as well as how to write more resilient code without them.

## Strict Mode Behavior of This and New

The current version of ECMAScript (the official standard name for JavaScript) is [ES2015](http://www.ecma-international.org/ecma-262/6.0/), but back with the release of [ES5](https://es5.github.io/), a feature was added called *strict mode*. [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) is used by starting a file or function with the string literal `"use strict"` (including quotes). Strict mode changes the semantics of many areas of the language, so I will be covering how it affects `this` and `new` as well.

I will start with an explanation of how `this` works in strict mode, since it’s easier to follow. You can think of `this` as an implicit parameter to *every* JavaScript function. You do not declare it in the parameter list and you can’t pass it like a normal argument.

### This with Function Calls

```js
function add(x, y) {
  console.log("this =", this);
  return x + y;
}

add(3, 4); // Prints "this = undefined"
```

In the example above, `this` is implicitly a parameter of `add`, like it is with every function, and it’s implicitly passed to the function in the `console.log` line. When a function is invoked in the default manner like `foo(x)`, `this` is set to `undefined`.

### This with Method Calls

There is another case where `this` is passed implicitly: `foo.bar()` and `foo["bar"]()`. When the function itself is being referenced directly from an object, the parent object itself is passed as `this`, which would be `foo` in this case.

```js
var janelle = {
  name: "Janelle",
  getName: function() {
    return this.name;
  }
};
console.log(janelle.getName());
```

This will log "Janelle" to the console, as we wanted. But let’s make a slight change and see how this works:

### Gotcha: Forgetting This

```js
var janelle = {
  name: "Janelle",
  getName: function() {
    return this.name;
  }
};

function greet(getName) {
  console.log("Hello, ", getName());
}

var getName1 = function() { return "Lukas"; };
var getName2 = janelle.getName;
greet(getName1); // "Hello, Lukas"
greet(getName2); // Error, cannot get property "name" of undefined
```

Ok, so what happened here? Notice that even though we get the function from `janelle.getName`, we invoke it using the plain style as `getName()`, so `undefined` is passed as the value of `this`. JavaScript has a built-in method for dealing with this—`bind`—used like `janelle.getName.bind(janelle)`. This is a bit wordy, and incredibly easy to forget, but it does give you a new function which will pass `janelle` as the value of `this`, even if the function is invoked in the plain style like `getName()` with no object.

Functions which accept functions as parameters (known as [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function)) are all over the place in JavaScript: [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout), [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [Promise.prototype.then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then), and many more. Any of these functions are potential places for errors when passing functions using `this` from an object as an argument.

### An Infuriating Real Life Example

A practical example you may have run into before involves promises and `console.log`. Unfortunately, the `console` object is not governed by any standard, so any JavaScript implementation can omit it or change the behavior however they want. In the past, the methods on `console` did not use `this`, so they were resilient in the face of plain invocation. That means this code sample used to work just fine:

```js
Promise.resolve("hello world").then(console.log);
```

Unfortunately now calling `console.log` with an incorrect `this` value causes an illegal invocation error. Couple this with promises swallowing all errors, and you have a line of code that will print nothing and report no errors. There are two common solutions to this problem:

```js
Promise.resolve("hello world")
  .then(function(x) { console.log(x); });

// or

Promise.resolve("hello world")
  .then(console.log.bind(console));
```

Neither of those are particularly nice, and could be avoided by using a function that never used `this` in the first place.

### Explicitly Passing This

There are also two explicit ways to pass `this` to a function: [.call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) and [.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply). They are invoked as methods from a function, as follows:

```js
console.log.call(console, 1, 2, 3, 4);
console.log.apply(console, [1, 2, 3, 4]);
```

Both lines are equivalent. The first parameter in both is the value of `this` to send, and then `call` takes the arguments normally afterward, whereas `apply` takes an array of arguments as its second and final parameter.

### Another Common Workaround

The method `call` is used in functions like `map` and `forEach` which have optional "context" parameters (the value of `this` to use in the callback).

```js
var selectors = ["p", "a", "img"];
var elems1 = selectors.map(document.querySelector, document);
var elems2 = selectors.map(document.querySelector.bind(document));
```

Both `elems1` and `elems2` contain the same values and don’t throw any errors because the value of `this` has been preserved correctly, by passing a value for `this` that the `map` method can use explicitly with the method `call`. But with `elems2` we can see that context parameters are unnecessary when we have the method `bind`.

## Strict Mode Behavior: New

The keyword `new` does quite a few things in the expression `new Foo(x)`.

1. Let `obj` be a new object with no properties.

1. Set the prototype of `obj` to `Foo.prototype`.

1. Let `res` be the result of `Foo.call(obj, x)`.

1. If `res` is an object, return `res`. Else return `obj`.

So first of all that’s quite a bit different than just calling `Foo(x).` This set of steps allows for code like:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.speak = function() {
  return "Hello, I am " + this.name;
}

var anika = new Person("Anika");
anika.speak(); // "Hello, I am Anika"
```

Notice how the function `Person` implicitly returns `undefined` (not an object) so that "else" branch of step 4 will be executed. Functions intended to be used only with `new` are called *constructor functions*.

### Gotcha: Forgetting New

Most functions are called without using the keyword `new` in JavaScript, so it’s easy to forget. If you call a function made like the above `Person` without `new`, the value of `this` will be set to `undefined`, and `this.name` will throw an error.

### Workaround: Not Using a Constructor Function

Luckily, it’s actually easier to just not use `new` or constructor functions at all.

```js
function createPerson(name) {
  function speak() {
    return "I am " + name;
  }
  return {
    name: name,
    speak: speak
  };
}

var anika = createPerson("Anika");
anika.speak(); // "Hello, I am Anika"
```

Notice how we didn’t use `this` or `new`, so we avoid several kinds of errors for consumers of our person API.

Alternatively, we can just avoid methods all together and make a simple module that operates on plain data (such as that returned from JSON APIs):

```js
var Person = {
  create: function(name) {
    return {
      name: name
    };
  },
  speak: function(p) {
    return "I am " + p.name;
  }
};

var anika = Person.create("Anika");
Person.speak(anika); // "Hello, I am Anika"
```

## Non-strict Mode

When not in strict mode, `this` behaves a little differently. If you pass a non-object value as `this`, it is converted to an object. If the value is a number, string, or boolean, it’s converted to a wrapped object version. If it’s `null` or `undefined`, it’s converted to the global object (known as `window` or `global`). This makes constructor functions even more dangerous, as forgetting to use `new` can make them accidentally set properties on the global object (i.e. set global variables).

Note that it doesn’t matter if *your code* uses strict mode, it matters if the function you’re calling was written using strict mode. And because it’s opt-in, most code doesn’t use it.

## Other Considerations

My primary concerns with code are correctness and readability. There are performance benefits in most JavaScript engines to using particular patterns along with `this` and `new`, but that is simply not as important to me as avoiding all of its potential problems. If you are making a video game in JavaScript, this performance difference might matter, but it’s likely not your bottleneck in any other kind of application.

And if you’re thinking about prototypal inheritance, it’s equally awkward whether you use `new` or not, but not featured in this article for brevity.

Some say avoiding `this` and `new` is not idiomatic JavaScript. I think generally those kind of comments just mean "I don’t like it", but in this case it’s just plain wrong. Consider `document.createElement("div")` or `$("div.foo")`, both plain functions that hide away any internal details about `new`.

## Safer, Easier JavaScript

As you’ve seen, the behavior of `this` and `new` is nothing magical, but both both constructs are more error prone than they need to be. Luckily, JavaScript is a powerful enough language that we do not need either of those features to do object-oriented programming. Don’t let anyone shame you into thinking you’re doing JavaScript "wrong" or you’re not "harnessing the power of prototypes" if you want to write your code this way. Good luck, and have fun writing JavaScript with two dangerous tools out of your way.
