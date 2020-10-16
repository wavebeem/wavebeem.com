---
title: "Tagged Unions"
description: "Tagged Unions in JavaScript and TypeScript"
---

@[toc]

## Why Should I Care?

Redux. MobX. XState. Vuex. RxJS. State management is hard, and developers are always looking for a tool to help them. Tagged unions are a programming pattern that you can use with immutable state libraries, or even by itself. Tagged unions make it simple to visualize all the states your application can be in, and make it difficult to access the wrong data at the wrong time.

Note: Tagged unions are also called "algebraic data types" or "enums" in different programming languages. I'm going to use the term "tagged unions" because I think it's easier to understand.

## What Are They?

For the purpose of this post, I will write state updates as follows:

```js
this.state = {
  apple: "pie",
  banana: "pudding",
  cherry: "turnover",
};
```

You can imagine this in many different ways. For example, with a React application, it might look like this:

```js
const [state, setState] = React.useState({});

setState({
  apple: "pie",
  banana: "pudding",
  cherry: "turnover",
});
```

The key here is that the state is all stored in a single variable which is an object. This is required so we can completely change the properties in an object. The old React `this.setState` method on class components is not suitable for tagged unions, since it merges the new state into the old state, instead of replacing it.

The basic requirement of a tagged union in JavaScript is an object with a property called `type`, `kind`, `mode`, or something like that.

```js
this.state = {
  type: "loading",
};

this.state = {
  type: "error",
  message: "Not found",
};

this.state = {
  type: "success",
  flavors: ["Chocolate", "Vanilla", "Strawberry"],
};
```

Contrast this with large objects featuring many `null` values.

```js
// Loading
this.state = {
  error: null,
  flavors: null,
};

// Error
this.state = {
  error: "Not found",
  flavors: null,
};

// Success
this.state = {
  error: null,
  flavors: ["Chocolate", "Vanilla", "Strawberry"],
};
```

With the classic style (large object, many `null` values), your rendering code might look like this.

```js
if (this.state.error) {
  console.log(this.state.error);
} else if (!this.state.flavors) {
  console.log("Loading...");
} else {
  console.log("Ice cream flavors:", this.state.flavors.join(", "));
}
```

Let's say that your product manager asks you to show a spinner while your application is saving. You might be tempted to add a boolean property to the state object.

```js
this.state = {
  isSaving: true,
  error: null,
  flavors: null,
};
```

Then we could update the rendering code like this.

```js
if (this.state.error) {
  console.log(this.state.error);
} else if (this.state.isSaving) {
  console.log("Saving...");
} else if (!this.state.flavors) {
  console.log("Loading...");
} else {
  console.log("Ice cream flavors:", this.state.flavors.join(", "));
}
```

This might seem all well and good, but what happens if you were in an error state, but then you want to switch to saving? It might seem like enough to just update `isSaving`:

```js
// Start out here...
this.state = {
  isSaving: false,
  error: "Not found",
  flavors: null,
};

// Later...
this.state.isSaving = true;
```

If you run the rendering code again, it will output the "Not found" error! So now the handler code for "saving" needs to know about the state used for "error". And this problem will only get worse as you add more states your application can be in. Worse yet, your app's rendering code is going to depend deeply on the order you check values in. What if we checked `this.flavors` first?

```js
if (this.state.isSaving) {
  console.log("Saving...");
} else if (this.state.flavors) {
  console.log("Ice cream flavors:", this.state.flavors.join(", "));
} else if (this.error) {
  console.log(this.state.error);
} else {
  console.log("Loading...");
}
```

If you checked your state in this order, it would be very easy to accidentally not show an error message! It shouldn't be this hard to tell what your application should be doing.

Imagine if your rendering code looked like this instead:

```js
switch (this.state.mode) {
  case "saving":
    console.log("Saving...");
    break;
  case "success":
    console.log("Ice cream flavors:", this.state.flavors.join(", "));
    break;
  case "error":
    console.log(this.state.error);
    break;
  case "loading":
    console.log("Loading...");
    break;
  default:
    console.error("unknown mode", this.state.mode);
    break;
}
```

Now you can add as many states as you want, but the order doesn't matter. How reassuring! With tagged unions, we replace the entire state all at once, so it's impossible to leave behind unwanted values.

## Going Deeper

Small examples are all well and good for learning, but how does this work on large apps? At my current job, I refactored a large portion of our most complicated screen (8,000+ lines of code) to use tagged unions to store most of the state. The rest of the team agreed the code was easier to reason about, and we now have lots of errors TypeScript can catch automatically for us.

That application has 30 (!) different modes within its tagged union. In order to help make sense of these, we arranged them hierarchically, similar to URLs.

```ts
// Code simplified for clarity
export type MapMode =
  | MapPlacemarkEditMode
  | MapPlacemarkBrowseMode
  | MapBeaconsBrowseMode;

export type MapPlacemarkEditMode =
  | { mode: "placemark/edit/area"; areaPlacemark: AreaPlacemark }
  | { mode: "placemark/edit/label"; labelPlacemark: LabelPlacemark }
  | { mode: "placemark/edit/regular"; placemark: Placemark };

export type MapPlacemarkBrowseMode = {
  mode: "placemark/browse";
  placemarks: Placemark[];
};

export type MapBeaconsBrowseMode = {
  mode: "beacons/browse";
  beacons: Beacon[];
};
```

This way you can narrow down your modes to be more specific. For example, a form component that lets you edit a placemark can take in `mode: MapPlacemarkEditMode` so that it's only possible to render the form when in those 3 modes. This also means that the form code can be simplified since it only needs to check 3 different modes internally.

I'll admit that it was a little tricky hooking these modes up to URLs within the browser. We wrote some code so that when you updated the mode, we automatically set the route using React Router to the URL that most closely matches your current state. Of course, URLs can't preserve all the same state as these JavaScript objects, but people expect to lose unsaved changes when they refresh the browser anyway.

## React Gotchas

If you are using React, be careful with `this.setState`, the state management method for class components. React's `this.setState` merges its parameter into the current state, so it is not suitable for use with tagged unions, which need to be able to add/remove properties. If you have to use `this.setState`, you can nest your tagged union state within an object like this:

```js
class MyComponent extends React.Component {
  constructor() {
    this.state = {
      union: {
        mode: "loading",
      },
    };
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    try {
      const resp = await fetch("/api/data");
      const data = await resp.json();
      this.setState({
        union: {
          mode: "success",
          flavors: data.flavors,
        },
      });
    } catch (err) {
      this.setState({
        union: {
          mode: "error",
          message: err.message,
        },
      });
    }
  }

  render() {
    const state = this.state.union;
    switch (state.mode) {
      case "loading":
        return <div>Loading...</div>;
      case "error":
        return <div>Error: {state.message}</div>;
      case "success":
        return (
          <ul>
            {state.flavors.map((flavor) => {
              return <li key={flavor}>{flavor}</li>;
            })}
          </ul>
        );
      default:
        console.warn("MyComponent: unknown mode", state.mode);
        return null;
    }
  }
}
```

## Catching Errors

When using tagged unions, you might enjoy this helper function if you're using JavaScript instead of TypeScript. Strict objects throw errors when you try to access properties that don't exist, something that happens a lot more frequently when you're using tagged unions.

If you're using TypeScript, you can omit this, since TypeScript will catch your type errors at compile time.

```js
/**
 * Returns an immutable object that throws a TypeError
 * when you try to get a property that doesn't exist,
 * or when you try to add, update, or delete a property.
 */
function strictObject(object) {
  return new Proxy(object, {
    get(target, prop) {
      // JSON.stringify and various JS methods will try to
      // access properties that may or may not exist on your
      // object, and we don't want to crash, so we have to
      // allow symbols and "toJSON" through, even if
      // they're not defined.
      if (prop in target || prop === "toJSON" || typeof prop === "symbol") {
        return target[prop];
      }
      throw new TypeError(`strictObject: can't get property "${prop}"`);
    },

    set(target, prop) {
      throw new TypeError(`strictObject: can't set property "${prop}"`);
    },

    deleteProperty(target, prop) {
      throw new TypeError(`strictObject: can't delete property "${prop}"`);
    },
  });
}

this.state = strictObject({
  mode: "error",
  message: "Not found",
});

// => "error"
this.state.mode;

// => "Not found"
this.state.message;

// => TypeError: strictObject: can't access property "flavors"
this.state.flavors;

// => TypeError: strictObject: can't access property "isSaving"
this.state.isSaving;
```

You'll have to remember to use `strictObject` every time you assign to `this.state`, but it can really save you from some headaches if you remember to use it. Nobody likes getting `undefined` when they expect a real value.

For TypeScript, you should make a tagged union type instead, which can catch your type errors at compile time, before your code is even run:

```ts
type State =
  | { mode: "loading" }
  | { mode: "error"; message: string }
  | { mode: "success"; flavors: string[] };

let state: State = { mode: "loading" };
// TypeScript error: You have to check `.mode` before
// using any other property from `State`, since `.mode`
// is the only property present in all 3 cases.
state.flavors;

if (state.mode === "loading") {
  console.log("Loading...");
} else if (state.mode === "error") {
  // Because we checked the value of `.mode`, TypeScript
  // figured out which of the 3 State objects we are using,
  // so it's OK to use `.message` inside this code block.
  console.error(state.message);
} else {
  // We are in the "success" case now since it's the only
  // option left of the 3 cases we put into the State type
  console.log(state.flavors.join(", "));
}
```

You can even take it one step further in TypeScript with something called exhaustiveness checking. This means that if you add another case to your `State` type, TypeScript will emit a type error until you fix your code to support that newly added case. This means that you can automatically find most of the code you need to update when adding new modes.

```ts
function assertNever(value: never): never {
  throw new Error(`assertNever: ${value}`);
}

type State =
  | { mode: "apple pie" }
  | { mode: "banana split" }
  | { mode: "cherry turnover" };

let state: State = "apple pie";

switch (state.mode) {
  case "apple pie":
    console.log(1);
    break;
  case "banana split":
    console.log(2);
    break;
  case "cherry turnover":
    console.log(3);
    break;
  default:
    // Note: You pass `state` not `state.mode` to it
    assertNever(state);
    break;
}
```

Now if you update the `State` type with a 4th mode `dark chocolate`, you'll get a TypeScript error on your `assertNever` call, saying:

```md
Argument of type `{ mode: "dark chocolate"; }` is not
assignable to parameter of type 'never'.
```

The error message looks a bit weird, but you'll get used to it. You can go to all the places in your code that produce errors like this and fix them. You might actually have a fully functioning app that responds to your new state afterward.

## Bonus: Undo Support

Have you ever been asked to add "undo" to your application? It can be daunting to figure out where to even start. If you store your state in a tagged union, you have a huge advantage.

```js
class App {
  constructor() {
    this.state = { mode: "loading" };
    this.undoStack = [];
  }

  update(state) {
    this.undoStack.push(this.state);
    this.state = state;
  }

  undo() {
    this.state = this.undoStack.pop();
  }
}
```

I will leave the implementation of `redo` as an exercise for the reader.

Here's the TypeScript version of `App`:

```ts
type AppState =
  | { mode: "loading" }
  | { mode: "error"; message: string }
  | { mode: "success"; flavors: string[] };

class App {
  state: AppState = { mode: "loading" };
  undoStack: AppState[] = [];

  update(state: AppState) {
    this.undoStack.push(this.state);
    this.state = state;
  }

  undo() {
    this.state = this.undoStack.pop();
  }
}
```
