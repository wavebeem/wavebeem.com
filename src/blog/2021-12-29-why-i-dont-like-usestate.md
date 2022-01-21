---
title: "Why I don't like useState"
description: "Why useState is so hard to use correctly, and what we can do about it"
---

@[toc]

## Prologue

I've been using React hooks since their public release roughly 3 years ago. I was incredibly excited for them. I still think hooks are great, but `useState` in particular is hard to get right.

I will cover the issues I see repeatedly, why they're so confusing, and some possible remedies.

NOTE: This post assumes familiarity with [React](https://reactjs.org/docs/getting-started.html) and [React hooks](https://reactjs.org/docs/hooks-intro.html).

## How state works

Consider this basic React component with state, which increments a number on button click:

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

It's easy to forget that this `App` component is not called just once. It's called _every time the component needs to re-render_. How does a function maintain state? It doesn't; React does. React _remembers_ this component "instance" and stores its state internally. Every time the component re-renders, React sends the correct state back when you call `useState`.

That's weird, and it only gets weirder as your app grows in complexity. Let's add some async code:

```jsx
function App() {
  const [num, setNum] = useState(0);
  return (
    <div>
      <p>num = {String(num)}</p>
      <button
        type="button"
        onClick={() => {
          //---------------------------------------------------------
          setTimeout(() => {
            console.log("async:", num);
          });
          setNum(num + 1);
          console.log("immediate:", num);
          //---------------------------------------------------------
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

Both the "immediate" and the "async" value are always 1 behind the value displayed in the UI. This is the result of [variable closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), an often surprising feature to developers.

`num` is a `const` variable, meaning it can never be reassigned. But the value gets "updated"! Every time `App` is called, React returns a new value from `useState`. The `onClick` handler was created by a previous call to `App`, so its closure is attached to an older `num` variable.

The problem is circumvented by using objects and mutation. `useRef` allows you to do this, but with one caveat: React won't re-render when you update a ref. There is a workaround, though:

```jsx
function useUpdate() {
  const [, update] = useReducer((state) => !state, false);
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
          //---------------------------------------------------------
          setTimeout(() => {
            console.log("async:", numRef.current);
          });
          numRef.current++;
          console.log("immediate:", numRef.current);
          update();
          //---------------------------------------------------------
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

If you need the old value, you can store it in a variable.

```js
const oldNum = numRef.current;
numRef.current++;
// Logs "1 --> 2"
console.log(oldNum, "-->", numRef.current);
```

## useMagicState

It's easy to forget `useUpdate()`, so let's imagine a new hook called `useMagicState`:

```jsx
//---------------------------------------------------------
function App() {
  const state = useMagicState({ num: 0 });

  useEffect(() => {
    function handler() {
      console.log("page click:", state.num);
    }
    setTimeout(handler, 500);
  }, [state.num]);

  return (
    <div>
      <p>num = {String(state.num)}</p>
      <button
        type="button"
        onClick={() => {
          state.num++;
        }}
      >
        Increment
      </button>
    </div>
  );
}
//---------------------------------------------------------

function createProxy(object, update) {
  return new Proxy(object, {
    set(target, property, value, receiver) {
      const oldValue = Reflect.get(target, property, receiver);
      if (!Object.is(value, oldValue)) {
        const ok = Reflect.set(target, property, value, receiver);
        // Automatically re-render after updating object values
        update();
        return ok;
      }
    },
  });
}

function useMagicState(state) {
  // Fake state used to trigger renders
  const [bit, update] = useReducer((state) => !state, false);

  // Store a copy of the state in a ref
  const stateRef = useRef({ ...state });

  // Create new proxies to the stateRef's data on update
  // so that memoized components still work correctly
  const [proxy, setProxy] = useState(() =>
    createProxy(stateRef.current, update)
  );
  useEffect(() => {
    setProxy(createProxy(stateRef.current, update));
  }, [bit]);

  return proxy;
}
```

Using `useMagicState` you can treat the returned object like a regular object, except the assigning any of its properties will trigger a re-render. Because `state` proxies to a single object, `state.property` will always refer to the latest value of `property`. If you need to keep old values, use `const oldState = { ...state }` to make a shallow copy. Variable closure still happens, but the proxy always points to the latest values.

This API is called [reactivity in Vue.js](https://v3.vuejs.org/guide/reactivity.html#what-is-reactivity). It was inspired by hooks, and it may be time for React to take inspiration from Vue.

## Why does it work this way?

I would love to hear _why_ the React core team created `useState` with this pitfall. Even if you understand variable closure, it's frequently quite inconvenient to deal with in React.

I swear I've seen some discussion of this on Twitter, but my search for written answers has failed me.

## Conclusion

Many blog posts document the difficulty of working with closures in React hooks, but I haven't seen any that mention how we can make new hooks to deal with the issue. Don't forget that you can always make new hooks to help you solve problems.
