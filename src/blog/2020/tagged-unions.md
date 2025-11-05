---
title: "Tagged unions in JavaScript"
description:
  "A disciplined approach to state management and domain modeling for JavaScript
  and TypeScript. Also known as algebraic data types / discriminated unions."
date: "2020-10-21"
---

## Why tagged unions?

Redux. MobX. XState. Vuex. RxJS. State management is hard, and developers are
always looking for a tool to help them. Tagged unions are a programming pattern
that you can use with immutable state libraries, or even on their own. Tagged
unions make it possible to visualize all the states your application can be in,
and prevent you from accessing the wrong data at the wrong time.

**Note:** Tagged unions are also called "algebraic data types", "variants", "sum
types", "discriminated unions", or "enums" in different programming languages.

## What to expect

This post covers the following topics in order:

- "Classic" state management (large objects with every property at once, but
  lots of `null` values)

- Tagged union state management (objects with a string "tag", and only relevant
  properties are present)

- Excerpts from a real life example with around 8,000 lines of code

- Several appendixes to read based on your own curiosity

## Pizza app: classic style

For the purposes of this blog post, I'm going to use a small React UI as an
example. Tagged unions work well with many libraries (and without any
libraries), and even with many other programming langauges.

Let's look at an example React app for online pizza delivery.

```jsx
// function PizzaDelivery()

const [state, setState] = React.useState({
  error: null,
  orderReceived: false,
  outForDelivery: false,
  size: "small",
  style: "regular",
  toppings: [],
});
```

You've probably worked with state like this before: there's a couple boolean
properties controlling what mode you're in, there's a property that might be
null, and there's state (size, style, toppings) that's not always relevant (I'll
take a large pepperoni with errors).

```jsx
if (state.error) {
  return <ErrorScreen>{error.message}</ErrorScreen>;
}
```

First up, we check if `state.error` is not null. If so, we show the error
screen. Even though you probably won't see this much, it has to be the first
`if` statement. After all, if there's an error, it's definitely the most
important thing to show.

```jsx
if (state.outForDelivery) {
  return (
    <OrderOutForDeliveryScreen
      onError={(error) => {
        setState((state) => ({ ...state, error: error }));
      }}
    >
      Your order is on its way!
    </OrderOutForDeliveryScreen>
  );
}
```

Next up, we have to check `outForDelivery` **before** `orderReceived`. After
all, your order is still technically received while your pizza is out for
delivery, so that screen should take priority.

```jsx
if (state.orderReceived) {
  return (
    <OrderReceivedScreen
      onOutForDelivery={() => {
        setState((state) => ({ ...state, outForDelivery: true }));
      }}
      onError={(error) => {
        setState((state) => ({ ...state, error: error }));
      }}
    >
      Your order has been received
    </OrderReceivedScreen>
  );
}
```

If your order has been received, we should show a screen letting you know that,
rather than staying on the order form.

```jsx
return (
  <PizzaOrderForm
    onCheckout={async () => {
      try {
        await fetch("/pizza/checkout", state);
        setState((state) => ({ ...state, orderReceived: true }));
      } catch (error) {
        setState((state) => ({ ...state, error: error }));
      }
    }}
  >
    <PizzaSizeSelect
      value={state.size}
      onChange={(size) => {
        setState((state) => ({ ...state, size: size }));
      }}
    />
    <PizzaStyleSelect
      value={state.style}
      onChange={(style) => {
        setState((state) => ({ ...state, style: style }));
      }}
    />
    <PizzaToppingsChooser
      value={state.toppings}
      onChange={(toppings) => {
        setState((state) => ({ ...state, toppings: toppings }));
      }}
    />
  </PizzaOrderForm>
);

// end function PizzaDelivery()
```

Finally, we have a bunch of form logic for updating the pizza information before
we place our order.

The order of these `if` statements is critical to this component working
correctly. `error`, `orderReceived`, and `outForDelivery` are all trying to tell
us which screen to show, but we have to resort to a hierarchy when they conflict
with each other.

With tagged unions, we pick **one** property (the "tag") to be in charge of
which screen to show, and we only keep track of the properties related to the
current screen.

## Pizza app: tagged unions

The key difference here is this `mode` property with 4 different string
possibilities.

```jsx
// function PizzaDelivery()

const [state, setState] = React.useState({
  mode: "ordering", // "ordering" | "received" | "delivery" | "error"
  size: "small",
  style: "regular",
  toppings: [],
});
```

This `mode` is in charge of what screen to show. We've listed which values are
allowed, and there's nothing to second guess. It's not possible to have a
confusing state like "order received" _AND_ "out for delivery" _AND_ "error" in
this system. If you wanted to keep track of a complicated state like that, you
would make a new mode like `delivery-error` (we can assume order is received if
the order is out for delivery, so it doesn't need to be
`received-delivery-error`).

```jsx
if (state.mode === "ordering") {
  return (
    <PizzaOrderForm
      onCheckout={async () => {
        try {
          await fetch("/pizza/checkout", state);
          setState({ mode: "received" });
        } catch (error) {
          setState({ mode: "error", error: error });
        }
      }}
    >
      <PizzaSizeSelect
        value={state.size}
        onChange={(size) => {
          setState((state) => ({ ...state, size: size }));
        }}
      />
      <PizzaStyleSelect
        value={state.style}
        onChange={(style) => {
          setState((state) => ({ ...state, style: style }));
        }}
      />
      <PizzaToppingsChooser
        value={state.toppings}
        onChange={(toppings) => {
          setState((state) => ({ ...state, toppings: toppings }));
        }}
      />
    </PizzaOrderForm>
  );
}
```

Now that we have a single source of truth on the current mode, we can write the
`if` statements in any order. I'm choosing to put `ordering` first since it's
the first step in the user workflow.

```jsx
if (state.mode === "received") {
  return (
    <OrderReceivedScreen
      onOutForDelivery={() => {
        setState({ mode: "delivery" });
      }}
      onError={(error) => {
        setState({ mode: "error", error: error });
      }}
    >
      Your order has been placed
    </OrderReceivedScreen>
  );
}
```

For the next `if` statement, we can use the 2nd step in the workflow. You can
see that this time around, we did not have to use the "updater function" style
of `setState`. When transitioning from one mode to another, you'll usually want
a full new object from scratch, since most modes don't share properties with
each other.

```jsx
if (state.mode === "delivery") {
  return (
    <OrderOutForDeliveryScreen
      onError={(error) => {
        setState({ mode: "error", error: error });
      }}
    >
      Your order is on its way!
    </OrderOutForDeliveryScreen>
  );
}
```

Again we use the next step of the workflow, and we use a full new object from
scratch with `setState`, since we are transitioning modes.

```jsx
if (state.mode === "error") {
  // Check error first since it's higher priority than the other states
  return <ErrorScreen>{state.error.message}</ErrorScreen>;
}
```

Last but not least, we check for the error state. Notice how we can grab
`state.error` just like before, but this time we've checked `state.mode` first
to make sure it _makes sense_ to do that. With tagged union code, you should
always check `state.mode` before attempting to use properties that only exist on
certain modes.

## A real life example

Small examples are all well and good for learning, but how does this work on
large apps? At my current job, I refactored a large portion of our most
complicated screen (8,000+ lines of TypeScript) to use tagged unions to store
most of the state. The rest of the team agreed the code was easier to reason
about, and we now have lots of errors TypeScript can catch automatically for us.

That application has 30 (!) different modes within its tagged union. To help
make sense of these, we arranged them hierarchically, similar to URLs.

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

This way you can narrow down your modes to be more specific. For example, a form
component that lets you edit a placemark can take in
`mode: MapPlacemarkEditMode` so that it's only possible to render the form when
in those 3 modes. This also means that the form code can be simplified since it
only needs to check 3 different modes internally.

I'll admit that it was a little tricky hooking these modes up to URLs within the
browser. We wrote some code so that when you updated the mode, we automatically
set the route using React Router to the URL that most closely matches your
current state. Of course, URLs can't preserve all the same state as these
JavaScript objects, but people expect to lose unsaved changes when they refresh
the browser anyway.

## Conclusion

Tagged unions can be used to model all your possible application states. They
can be used in pure JavaScript without any libraries. They are even stronger in
TypeScript where mistakes can be caught before running your program. And most
importantly, they can reduce the confusion about what state your application is
in.

## Further reading

I have included several appendixes containing more things to learn about.

_Want to use tagged unions, but still using React class components?_ Learn about
the [React class component gotchas](#appendix-react-class-component-gotchas)
first.

_Love TypeScript?_
[Add type safety with TypeScript](#appendix-catching-errors-in-typescript).

_Not interested in TypeScript?_
[Fortify your tagged unions](#appendix-catching-errors-in-javascript) using this
one little helper functions (developers love it!)

_Need to add "Undo" to your app?_
[Add "Undo" in one line of code](#appendix-undo-support).

_Do you use Vue?_ Check out
[tagged unions in Vue](#appendix-tagged-unions-in-vue).

_Want to use tagged unions for more than just application state?_
[Tagged unions are great for data modeling](#appendix-tagged-unions-for-data-modeling).

If you're still itching to learn more, try searching for **algebraic data
types** (the more popular term compared with "tagged union"), and **sum types**.
Many of these results use Haskell or other functional programming languages for
their code examples.

## Appendix: React class component gotchas

If you are using React, be careful with `this.setState`, the state management
method for class components. React's `this.setState` merges its parameter into
the current state, so it is not suitable for use with tagged unions, which need
to be able to add/remove properties. If you have to use `this.setState`, you can
nest your tagged union state within an object like this:

```jsx
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

## Appendix: Catching errors in TypeScript

For TypeScript, you should make a tagged union type instead, which can catch
your type errors at compile time, before your code is even run:

```ts
type State =
  | { mode: "loading" }
  | { mode: "error"; message: string }
  | { mode: "success"; flavors: string[] };

let state: State = { mode: "loading" };

state.flavors;
// TypeScript error: You have to check `.mode` before
// using any other property from `State`, since `.mode`
// is the only property present in all 3 cases.

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

You can even take it one step further in TypeScript with something called
exhaustiveness checking. If you add another case to your `State` type,
TypeScript will emit a type error until you fix your code to support that newly
added case. This means that you can automatically find most of the code you need
to update when adding new modes.

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

Now if you update the `State` type with a 4th mode `dark chocolate`, you'll get
a TypeScript error on your `assertNever` call, saying:

```md
Argument of type `{ mode: "dark chocolate"; }` is not assignable to parameter of
type 'never'.
```

The error message looks a bit weird, but you'll get used to it. You can go to
all the places in your code that produce errors like this and fix them. You
might actually have a fully functioning app that responds to your new state
afterward.

## Appendix: Catching errors in JavaScript

When using tagged unions, you might enjoy this helper function if you're using
JavaScript instead of TypeScript. Strict objects throw errors when you try to
access properties that don't exist, something that happens a lot more frequently
when you're using tagged unions.

If you're using TypeScript, you can omit this, since TypeScript will catch your
type errors at compile time.

```jsx
function strictObject(object) {
  return new Proxy(object, {
    get(target, prop) {
      // JSON.stringify and various JS methods will try to
      // access properties that may or may not exist on your
      // object, and we don't want to crash, so we have to
      // allow symbols and "toJSON" through, even if
      // they're not defined.
      if (
        Reflect.has(target, prop) ||
        prop === "toJSON" ||
        typeof prop === "symbol"
      ) {
        return Reflect.get(target, prop);
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
  mode: "purchase-complete",
  orderNumber: "JS-1312-420",
});

this.state.mode;
// => "purchase-complete"

this.state.orderNumber;
// => "JS-1312-420"

this.state.flavors;
// => TypeError: strictObject: can't access property "flavors"

this.state.isSaving;
// => TypeError: strictObject: can't access property "isSaving"
```

You'll have to remember to use `strictObject` every time you assign to
`this.state`, but it can really save you from some headaches if you remember to
use it. Nobody likes getting `undefined` when they expect a real value.

## Appendix: Undo support

Have you ever been asked to add "undo" to your application? It can be daunting
to figure out where to even start. If you store your state in a tagged union,
you have a huge advantage.

I will leave the implementation of `redo` as an exercise for the reader.

```ts
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

## Appendix: Tagged unions in Vue

Vue is well suited to use tagged unions. Just remember to assign the entire
state object every time, rather than modifying its properties.

```jsx
const html = String.raw;
const app = new Vue({
  el: "#app",

  data() {
    return {
      state: {
        mode: "a",
      },
    };
  },

  methods: {
    goA() {
      this.state = { mode: "a" };
    },

    goB() {
      this.state = { mode: "b" };
    },
  },

  template: html`
    <div>
      <button v-if="state.mode === 'b'" @click="goA">Go to A</button>
      <button v-else-if="state.mode === 'a'" @click="goB">Go to B</button>
      <p v-else>This shouldn't render</p>
      <pre v-text="JSON.stringify(state, null, 2)"></pre>
    </div>
  `,
});
```

## Appendix: Tagged unions for data modeling

Tagged unions don't have to be used for state management. You could use them for
data modeling as well. Consider these two ways to model mathematical shapes.

```jsx
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  area() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

new Circle(10).area();
// => 314.1592653589793

new Rectangle(3, 4).area();
// => 12
```

The class approach is nice because people expect it, and you can write `.area()`
for both rectangles and circles. But what if you're getting a shape back from a
server as JSON? You have to worry about serializing and deserializing these
objects as plain JSON objects.

Using plain JSON objects as tagged unions means that anyone can write a function
that operates on any plain JSON object.

```jsx
function rectangle(width, height) {
  return { type: "rectangle", width, height };
}

function circle(radius) {
  return { type: "circle", radius };
}

function area(shape) {
  switch (shape.type) {
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * Math.pow(shape.radius, 2);
    default:
      throw new Error(`unknown shape "${shape.type}"`);
  }
}

area(circle(10));
// => 314.1592653589793

area(rectangle(3, 4));
// => 12
```
