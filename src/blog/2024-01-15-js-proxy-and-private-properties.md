---
title: |
  JS Proxy and private properties
description: |
  The default Proxy implementation doesn't work well with private properties, but we can fix this! I also explore other approaches to private data in JS.
---

@[toc]

## What is Proxy?

The JS [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) class allows you to add functions that hook into internal JS features such as reading and writing object properties. [Vue](https://vuejs.org/) uses it to implement its reactivity system by exposing `Proxy` wrapped objects to framework users instead of the real object.

Proxy has been [supported in all browsers](https://caniuse.com/proxy) since 2016.

```js
const object = { x: 4, y: 10 };

const proxy = new Proxy(object, {
  get(target, property, thisValue) {
    if (property === "x") {
      return -target.x;
    }
    // The `Reflect` class contains the default
    // implementations of the `Proxy` hooks,
    // for your convenience
    return Reflect.get(target, property, thisValue);
  },
});

console.log(object.y); //=> 10
console.log(object.x); //=> 4

console.log(proxy.y); //=> 10
console.log(proxy.x); //=> -4
```

You can implement many powerful patterns with `Proxy`, such as objects that throw errors when you try to access missing keys, or listen for modifications to the properties of an object without using [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#defining_getters_and_setters).

## What are private properties?

Private properties have been [supported in all browsers](https://caniuse.com/mdn-javascript_classes_private_class_fields) since 2021.

Private properties are object properties that can only be accessed from methods defined inside the `class` declaration of an object's constructor. These are usually combined with [setters and gettesr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects#defining_getters_and_setters) to define custom behavior when reading/writing object properties.

```js
class Thing {
  #x;

  constructor(value) {
    this.#x = value;
  }

  set x(value) {
    console.log("SET x", value);
    this.#x = value;
  }

  get x() {
    console.log("GET x");
    return this.#x;
  }
}

const thing = new Thing("secret");
thing.x;
//=> "GET x"
console.log(thing.x);
//=> "GET x"
//=> "secret"
console.log(thing.#x);
// SyntaxError: can't access private property
// outside of class definition

thing.x = "new_secret";
//=> "SET x new_secret"
console.log(thing.x);
//=> "GET x"
//=> "new_secret"
```

## What happens when you combine them?

You might expect that if you make a `Proxy` but don't add any hook function, that the new proxy would behave more or less identicaly to the original object.

This is mostly true, but unfortunately methods that reference private properties will crash by default.

```js
class CoolValue {
  #value;

  constructor(value) {
    this.#value = value;
  }

  get value() {
    return this.#value;
  }

  logValue() {
    console.log(this.#value);
  }
}

const v = new CoolValue("hello");
console.log(v.value);
//=> "hello"

const p = new Proxy(v, {});
console.log(p.value);
// TypeError: can't access private field or method:
// object is not the right class
p.logValue();
// TypeError: can't access private field or method:
// object is not the right class
```

We can fix this problem by defining a different `get` hook for the `Proxy`.

```js
const p = new Proxy(v, {
  get(target, prop, thisValue) {
    // Ignore `thisValue`, which is the proxy itself.
    // `target` is the original object known here as `v`.
    // This could also be written as `target[prop]`.
    const value = Reflect.get(target, prop, target);
    // If the value is a function, we need to bind the function
    // to use the correct `this` value of `target`,
    // the underlying object. Otherwise `this` will be
    // set to `thisValue`, which is the proxy.
    // The proxy doesn't have access to the
    // private properties of the class.
    if (typeof value === "function") {
      return value.bind(target);
    }
    return value;
  },
});
console.log(p.value);
p.logValue();
```

## What about WeakMap?

[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) can be used to simulate private data, but the behavior will be even worse. Rather than throwing errors about not having access to private data, the underlying map will simply return `undefined` with no explanation.

```js
const $value = new WeakMap();
class CoolValue {
  constructor(value) {
    $value.set(this, value);
  }

  get value() {
    return $value.get(this);
  }

  logValue() {
    console.log($value.get(this));
  }
}

const v = new CoolValue("hello");
console.log(v.value);
//=> "hello"

const p = new Proxy(v, {});
console.log(p.value);
// TypeError: can't access private field or method:
// object is not the right class
p.logValue();
// TypeError: can't access private field or method:
// object is not the right class
```

## What about Symbol keys?

Using secret `Symbol` values as the keys for "private" values seems to work really well. It's a bit annoying compared to private properties, and it can circumvented if you try really hard, but these properties are invisible to most JS methods (e.g. `Object.keys` or `JSON.stringify`).

```js
// The Symbol name is optional, but it's
// good practice to provide one for
// debugging purposes. Otherwise every Symbol key
// will just look like Symbol() in the
// Developer Tools when inspecting an object.
const $value = Symbol("CoolValue.value");

class CoolValue {
  constructor(value) {
    this[$value] = value;
  }

  get value() {
    return this[$value];
  }

  logValue() {
    console.log(this[$value]);
  }
}

const v = new CoolValue("hello");
console.log(v.value);
//=> "hello"

const p = new Proxy(v, {});
console.log(p.value);
//=> "hello"
p.logValue();
//=> "hello"
```

In fact, JS already uses `Symbol` for pseudo-private properties like [Symbol.toStringTag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) and [Symbol.iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator). It seems like this feature was added primarily to allow multiple types of APIs to exist on an object, without requiring names to be unique (all `Symbol` values are not equal to each other---like objects---even if they have the same display name).

## Inspired by Lea Verou

I was originally inspired by Lea Verou's post [JS private class fields considered harmful](https://lea.verou.me/blog/2023/04/private-fields-considered-harmful/).

I wanted to find if there was a workaround for the problem she described. I'm not a seasoned Vue developer like she is, so I'll assume that I'm still missing some corner case of this solution that makes it not work at least for how Vue wants to use `Proxy`. But I'm glad to see you can fix it in the simple case, at least.

## Combinations of features can be surprising

It's never a pleasant feeling when two features of a language don't combine well like `Proxy` and private properties. I can't help but feel that private properties should've just been syntax sugar over a `Symbol` made behind the scenes anyway. Maybe I'm just a minimalist, but I feel like buildling on top of existing features is good. But I also remember programming in JS before ES5 came out, and frankly it was still a pretty good language even back then (hot take).

Yes, you can use `Object.getOwnPropertySymbols` to enumerate the symbols for an object, but this is nearly impossible to do on accident. If I had the time and energy, maybe I could browse the GitHub discussions for why the private property proposal went with true privacy instead of just being great syntax sugar over nearly-private fields using `Sybmol` keys.

## Going forward with private properties

All of this mess around `Proxy` has me feeling a bit awkward about whether or not I should keep using private properties in my code in the future. I've written already about [developing with web components](/blog/2023/11/25/developing-with-web-components/) wherein I use private properties extensively. I have no need for `Proxy` in that code, and the workaround I mentioned earlier could still be employed if I did.

I won't deny that there's a certain elegance to the idea behind hidden `Symbol` properties on objects, but the syntactic awkwardness will probably prevent me from using them in most code I work on.
