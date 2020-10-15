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
const [state, setState] = React.useState();

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

A common approach to state management is one big object with every key in, and boolean variables to indicate which ones are valid:

```js
this.state = {
  isLoading: false,
  error: false,
  message: "Not found",
  flavors: ["Chocolate", "Vanilla", "Strawberry"],
};
```
