---
title: "Tagged Unions"
description: "Tagged Unions in JavaScript and TypeScript"
---

@[toc]

## Why Should I Care?

State management. If you've done frontend development, you've probably dealt with it in the past. Have you ever juggled four different mutually exclusive boolean properties on an object? What about trying to figure out if your application is loading, in an error state, or everything is peachy keen?

What sounds easy at first can spiral out of control as your application grows, and refactoring can be very tricky. Tagged unions are no silver bullet, but they're a powerful tool to have in your toolbelt.

Note: Tagged unions are also called "algebraic data types" or "enums" in different programming languages. I'm going to use the term "tagged unions" because I think it's the easier to understand.

## What are They?

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

The key here is that the state is all stored in a single variable which is an object. This is required so we can completely change the properties in an object.

The basic requirement of a tagged union in JavaScript is an object with a property called `type` or `kind` or something along those lines.

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

A common approach to state management is one object for every possible state, and `null` when a value shouldn't be there:

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

With this state management style, checking your state looks like this:

```js
if (this.error) {
  console.log(this.state.error);
} else if (!this.flavors) {
  console.log("Loading...");
} else {
  console.log("Ice cream flavors:", this.state.flavors.join(", "));
}
```

Now let's say that your product manager asks you to implement a "saving" message while your application is saving. At this point, you'd probably add a boolean:

```js
this.state = {
  isSaving: true,
  error: null,
  flavors: null,
};
```

Now we can update the rendering code like this:

```js
if (this.error) {
  console.log(this.state.error);
} else if (this.state.isSaving) {
  console.log("Saving...");
} else if (!this.flavors) {
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
} else if (this.flavors) {
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

## Gotchas

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
      const data = await fetch("/api/data").then((resp) => resp.json());
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

## Appendix: Strict Object Helper

When using tagged unions, you might enjoy this helper function if you're using JavaScript instead of TypeScript. Strict objects throw errors when you try to access properties that don't exist, something that happens a lot more frequently when you're using tagged unions.

If you're using TypeScript, you can omit this, since TypeScript will catch your type errors at compile time.

```js
function strictObject(object) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) {
        return target[prop];
      }
      throw new TypeError(`strictObject: can't access property "${prop}"`);
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

You'll have to remember to use use `strictObject` every time you assign to `this.state`, but it can really save you from some headaches if you remember to use it. Nobody likes getting `undefined` when they expect a real value.

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
