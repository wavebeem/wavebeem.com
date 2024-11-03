---
title: "The leaning tower of Babel"
description: "An exploration of Babel's caveats."
tags:
  - "programming"
  - "javascript"
  - "compilers"
pubDate: "2016-08-22"
---

## About Babel

[Babel][3] is the most popular [ES6][1] (aka ES2015) compiler right now. It
takes code written in ES6 and turns it into code that runs in any ES5 JavaScript
engine. ES5 is the overwhelming standard in JavaScript engines right now, but
that is ever-changing, as evidenced by the [ES6 compatibility table][2].

Babel allows you to "Use next generation JavaScript, today", but of course there
are caveats. It involves an additional build step (ES6-to-ES5 compilation), a
Babel configuration file, and many plugins. Depending on what tools you
integrate with, you may need Babel in multiple places. The [setup page][4]
details many integrations.

## What is this post about?

The purpose of this blog post is not to discuss the upfront costs (extra
compilation step, extra dependencies, difficulty of configuration), but to
discuss the _eventual_ costs of using Babel. Like most abstractions, [Babel
leaks][5]. What I mean specifically is that Babel in many cases cannot (or
chooses not to) 100% correctly produce the semantics of ES6 in the resulting ES5
code.

## Why so picky about semantics?

We all know that `2 + 2 === 4`. What if at some point in the future
`2 + 2 === 4.0001`? That's almost right. That kind of error would not be
acceptable in a banking app where people's money is on the line. You might
display numbers rounded to the nearest cent, but minor errors will compound over
time and produce problems.

Babel's ES6 compatibility is like that—it's almost right. For many scenarios,
it's correct enough that you won't observe anything weird. But imagine one day
Babel fixes its semantics, or more likely, ES6 becomes so widely supported you
drop Babel in favor of native ES6. If you do that, your application might
suddenly have massive bugs! At this point, whatever application you wrote right
now in 2016 is probably considered legacy, and you're working at a different
job, so now the new hire is tasked with your big blob of Babel-dependent code to
fix for ES6, or never stop using Babel!

## Many examples

[ES6 has a long and complicated spec][6]. Writing a JavaScript engine that
completely adheres to the spec is a _lot_ of work. Writing an ES6-to-ES5
compiler that produces small output and adheres to the ES6 spec is practically
impossible. I am only outlining the examples that I have seen or that others
have pointed out to me.

## Arrow function new

One of the most exciting features of ES6 is the arrow function. Essentially,
`(x, y) => x + y` is like `function(x, y) { return x + y; }`, but there's a lot
more nuance than that. One thing about arrow functions is that it's an _error_
to call `new` on one. So this code snippet should throw an error in a compliant
ES6 engine.

```javascript
const Person = () => {
  console.log(this);
};

Person.prototype = {
  setName(name) {
    this.name = name;
  },
};

const amina = new Person();
amina.setName("Amina");
console.log(amina.name);
```

Babel compromises and just emits a regular function here, so the code works
without errors.

```javascript
"use strict";

var Person = function Person() {
  console.log(undefined);
};

Person.prototype = {
  setName: function setName(name) {
    this.name = name;
  },
};

var amina = new Person();
amina.setName("Amina");
console.log(amina.name);
```

Admittedly, Babel at least transforms direct use of `this` inside the arrow
function into `undefined` now, so errors should be frequently caught sooner.

I noticed this error when I was using Mithril which calls user supplied
functions using `new`, without making this clear in its documentation.

## Sloppy arguments

ES6 arrow functions do not get `arguments` or `this` variables, but since Babel
compiles to plain ES5 functions, it has to do some tricks to fix this.
Unfortunately you can break this right now.

```javascript
const global = 0 || window;
global.arguments = 2;
const f = () => arguments;
console.log(f());
```

That should print `2`, but in Babel it references an undeclared variable.

```javascript
"use strict";

var _arguments = arguments;
var global = 0 || window;
global.arguments = 2;
var f = function f() {
  return _arguments;
};
console.log(f());
```

## Symbols

ES6 symbols are a fairly complicated feature that really can't be compiled
easily. Unfortunately, Babel ships with two different Symbols compilation modes,
both with large caveats. Technically the "library" portions of ES6 are covered
by the [core-js][7] project, but Babel encourages you to use it.

## Global Symbols

The first polyfill route for symbols is to put all symbol keys as properties on
`Object.prototype`, meaning that a seemingly harmless loop like this actually
creates a massive memory leak.

```javascript
for (var i = 0; i < 999999; i++) Symbol();
```

This polyfill technique creates a [non-enumerable][12] property on
`Object.prototype` every time you create a new symbol, which leads to incorrect
ownership semantics, in addition to the memory leak.

```javascript
var s1 = Symbol();
var s2 = Symbol();
s1 in Object.prototype; // true, but shouldn't be
s2 in Object.prototype; // true, but shouldn't be
s1 in {}; // true, but shouldn't be
s2 in {}; // true, but shouldn't be
Object.keys({ a: 1 }); // ["a"], which is correct
```

## Funny keys

The other option is just to put the "symbol" keys into an object using a funny
name that looks like gibberish. This clever hack is done by producing an object
with a funny `toString` method, since objects are converted via `toString`
automatically when used as keys to other objects. The implementation could look
something like this:

```javascript
var i = 0;
function Symbol(tag) {
  tag = tag || "";
  var str = "#Symbol(" + tag + ")#" + i;
  return {
    toString: function () {
      return str;
    },
  };
}

var s = Symbol("nice");
var o = {};
o[s] = 1; // {"#Symbol(nice)#0": 1}
```

This hack is simple and won't leak memory, but obviously it can cause problems
with anything trying to enumerate the keys in an object, such as `Object.keys`
or a `for (k in obj)` loop.

## Weird typeof

The operator `typeof` is not extensible in ES5, so that also means that any use
of `typeof` has to be converted into something more complicated so the new type
`"symbol"` can be returned. This is how Babel currently handles it:

```javascript
// typeof foo === "symbol" becomes...

(typeof foo === "undefined" ? "undefined" : _typeof(foo)) === "symbol";
```

## Generators / async+await

Generators and `async` + `await` are very powerful features, but have to do with
flow control in such a way that compiled output is extremely large and difficult
to debug, plus generators still require a runtime library too. Look at how this
simple example balloons in complexity.

```javascript
function* nice() {
  yield 1;
  yield 2;
  yield 3;
}

for (let x of nice()) {
  console.log(x);
}

async function asyncAdd() {
  const x = await getA();
  const y = await getB();
  return x + y;
}
```

Now remember that this compiled output needs a whole separate runtime library
besides core-js which is called [regenerator][13].

```javascript
"use strict";

var asyncAdd = (function () {
  var ref = _asyncToGenerator(
    regeneratorRuntime.mark(function _callee() {
      var x, y;
      return regeneratorRuntime.wrap(
        function _callee$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return getA();

              case 2:
                x = _context2.sent;
                _context2.next = 5;
                return getB();

              case 5:
                y = _context2.sent;
                return _context2.abrupt("return", x + y);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        },
        _callee,
        this,
      );
    }),
  );

  return function asyncAdd() {
    return ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function (value) {
              return step("next", value);
            },
            function (err) {
              return step("throw", err);
            },
          );
        }
      }
      return step("next");
    });
  };
}

var _marked = [nice].map(regeneratorRuntime.mark);

function nice() {
  return regeneratorRuntime.wrap(
    function nice$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _context.next = 2;
            return 1;

          case 2:
            _context.next = 4;
            return 2;

          case 4:
            _context.next = 6;
            return 3;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked[0],
    this,
  );
}

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (
    var _iterator = nice()[Symbol.iterator](), _step;
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    _iteratorNormalCompletion = true
  ) {
    var x = _step.value;

    console.log(x);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}
```

## Default arguments

ES6 default arguments are not scoped properly in Babel. This example should
throw an exception when calling `f`:

```javascript
function f(x = x) {
  return x;
}

console.log(f());
```

But instead Babel produces code that simply returns `undefined`.

```javascript
"use strict";

function f() {
  var x =
    arguments.length <= 0 || arguments[0] === undefined ? x : arguments[0];

  return x;
}

console.log(f());
```

## ES6 modules

Possibly one of the most anticipated features of ES6 is modules. Unfortunately,
all that was really standardized with ES6 is the _syntax_ of ES6 modules, and
the semantics of module bindings. Any kind of interoperability with CommonJS was
left unmentioned, and even the meaning of the module identifier was left
[completely to another (unfinished) spec to decide][10].

Because of all this, Babel has to make pragmatic decisions such that developers
can use it _now_, and can continue to use the many CommonJS packaged JavaScript
libraries available on [npm][11].

```javascript
import * as foo from "bar";
import foo from "bar";
```

Those two lines should have completely different semantics, but Babel makes them
equivalent. This will probably break a lot of code that depends on Babel's
specific compilation strategy for ES6 modules.

```javascript
export { a, b, c };
export default { a, b, c };
```

Confusingly, only the second export form is generating a JavaScript object, the
first is merely performing multiple exports on the same line. Since Babel has to
work with ES5 though, both forms generate objects at runtime, further confusing
how ES6 modules actually work.

## Conclusion

This is not to say that Babel, core-js, or regenerator are bad projects, or that
you shouldn't use them. My point in writing this is that I don't see anyone
talking about the issues with using these tools, and the issues with eventually
_not_ using these tools any more.

I don't use them in my personal projects mostly due to the added complexity. But
this is your call, or your team's call.

[1]: https://github.com/lukehoban/es6features#readme
[2]: https://kangax.github.io/compat-table/es6/
[3]: https://babeljs.io/
[4]: https://babeljs.io/docs/setup/
[5]: https://en.wikipedia.org/wiki/Leaky_abstraction
[6]: http://www.ecma-international.org/ecma-262/6.0/
[7]: https://github.com/zloirock/core-js
[8]: http://elm-lang.org/
[9]: https://github.com/clojure/clojurescript
[10]: https://whatwg.github.io/loader/
[11]: https://www.npmjs.com/
[12]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
[13]: https://facebook.github.io/regenerator/
