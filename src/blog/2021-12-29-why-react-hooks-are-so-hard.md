---
title: "Why React hooks are so hard"
description: "A deep dive into what makes React hooks so hard in practice"
---

@[toc]

## Prologue

I've been using React hooks since their public release roughly 3 years ago. I was incredibly excited for them. I still think they're an amazing tool, but I've had enough time to see the ways in which they fall apart.

The combination of `useState`, `useEffect`, and async/event-driven programming create a perfect storm of difficult-to-debug issues.

I will cover the issues I see repeatedly, why they're so confusing, and some possible remedies.

NOTE: This post assumes familiarity with [React](https://reactjs.org/docs/getting-started.html) and [React hooks](https://reactjs.org/docs/hooks-intro.html).

## How state works

Consider this basic React component with state:

```jsx
function App() {
  const [num, setNum] = useState(0);
  return (
    <div>
      <p>num = {String(num)}</p>
      <button
        type="button"
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

It's easy to forget that this `App` component is not called just once. It's called _every time the component needs to re-render_. But it's just a function, not an object. So how does it maintain state? Well, it doesn't. React does. React _remembers_ this component "instance" and stores its state internally. Every time the component re-renders, React sends the correct state back when you call `useState`.

Honestly, it's pretty weird. And it only gets weirder as your app grows in complexity. Let's add some async code:

```jsx
function App() {
  const [num, setNum] = useState(0);
  return (
    <div>
      <p>num = {String(num)}</p>
      <button
        type="button"
        onClick={() => {
          //////////////////////////////////////////////////////////////////////
          setTimeout(() => {
            console.log("async:", num);
          });
          setNum(num + 1);
          console.log("immediate:", num);
          //////////////////////////////////////////////////////////////////////
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

Both the "immediate" and the "async" value are always 1 behind the value displayed in the UI. This is... frankly not what most people expect or want. And the reason this happens is [variable closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

`num` is a `const` variable, meaning it can never be reassigned. But the value gets "updated"! Because every time `App` is called again, React returns a new value from `useState`. But the `onClick` handler was created by a previous call to `App`, so its closure is attached to an older `num` variable.

In my experience, people find this difficult to conceptualize. In fact, I've endured a few interview questions about this topic. But even if you know it's going to behave this way, why would you _want_ it to? I'm sure the React core team has their reasons, and I've seen allusions to it in various Twitter discussion, but I haven't found a good explanation.

Most other state management in JS is done via objects and property mutation. And React even has to give you that as an option: that's what `useRef` is. But `useRef` does _not_ trigger a re-render, so it can't be used for general state management without assistance. Consider this component that works as intended.

```jsx
function useUpdate() {
  const [, update] = useReducer((state) => state + 1, 0);
  return update;
}

function App() {
  const numRef = useRef(0);
  const update = useUpdate();
  return (
    <div>
      <p>num = {String(numRef.current)}</p>
      <button
        type="button"
        onClick={() => {
          setTimeout(() => {
            console.log("async:", numRef.current);
          });
          numRef.current = numRef.current + 1;
          console.log("immediate:", numRef.current);
          update();
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

But what if you want the old value? Well, that's what variables are for! Just add `const oldNum = numRef.current` before updating `numRef`, and you're good to go. That's easy to understand.

`useUpdate()` would be easy to forget, though, so this approach will need some work. I'll go over a better hook I created later in this post.

## TODO: useEffect with addEventListener

## TODO: useEffect with setTimeout

## TODO: useEffect with fetch

## TODO: useMagicState

```jsx
function App() {
  const { state, useUpdate } = useMagic({
    name: "Brian",
    email: "brian@wavebeem.com",
  });
}
```
