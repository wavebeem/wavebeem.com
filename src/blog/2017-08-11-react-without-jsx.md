---
title: "React without JSX"
description: "A quick overview on using React without JSX or any build tools."
---

## Misconceptions about React

The discourse around React would lead you to believe you need to get started with Babel, Webpack, source maps, and all kinds of complex tooling to use React, but you actually can drop React into any existing page pretty easily. It could be fully server-side rendered from Rails, a mix with jQuery in it, or even a front-end app written with another framework entirely.

The documentation on [the React site][1] won't lead you there, but it's a surprisingly simple route if you want to take it.

## Minimal React "Hello World"

**index.html**

```html
<!DOCTYPE html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js"></script>
</head>
<body>
  <div id="react-root"></div>
  <script src="main.js"></script>
</body>
</html>
```

**main.js**

```js
var R = React.createElement;

function App(props) {
  return R("div", {}, "Hello, world!");
}

var root = document.getElementById("react-root");
var app = R(App);
ReactDOM.render(app, root);
```

## One more thing

React functional components like `App` are great because you don't need to use classes or mess around with the `this` keyword, but sometimes you do need actual state in your component. If you're targeting ES6-enabled browsers, you can natively use ES6 classes:

```js
class App extends React.Component {
  render() {
    // ...
  }
}
```

Or you can use the old helper function `React.createClass`:

```js
var App = React.createClass({
  render: function () {
    // ...
  },
});
```

## How does it scale?

You might be wondering how this style looks if you scale it up to a larger application. Well, I've written a [React app without JSX once][2], and honestly it looked even nicer than with JSX, I think.

To keep things readable, here's a simplified example:

```js
var R = React.createElement;

function TextScreen(props) {
  return R(
    "div",
    {},
    "Here's some text to read!",
    R(
      "button",
      {
        className: "btn btn-large",
        onClick: function (event) {
          props.goNext();
        },
      },
      "Next"
    )
  );
}
```

## ES6 > JSX

If you can use ES6 in your app, things end up looking even nicer than JSX code since you can grab all your props in the argument list and write `{ className: className }` as simply `{ className }`. Also, it helps to break things up with variables, something I don't see a lot of in React code with JSX.

```js
const R = React.createElement;

function TextScreen({ goNext }) {
  function onClick(event) {
    goNext();
  }
  const className = "btn btn-large";
  const text = "Next";
  const mainButton = R("button", { className, onClick }, text);
  return R("div", {}, "Here's some text to read!", mainButton);
}
```

## It doesn't look like HTML!

The main problem with this is it doesn't look like HTML any more. But in my mind, that's a good thing. It's easier to type this way, faster to read, and you don't have to worry about tools that don't know how to process JSX.

## Shrug "emoji"

It may not be for you, and frankly the ship has kinda already sailed and JSX is super popular, but it's worth mentioning that code can look really good without it. Hope you enjoyed seeing simpler route React offers.

**NOTE:** I'm well aware of the many reasons to use bundlers and build tooling, and frequently make use of them myself. I just figured it was worth mentioning that you don't _have_ to use them.

[1]: https://facebook.github.io/react/
[2]: https://github.com/wavebeem/screenhive/tree/master/app/src
