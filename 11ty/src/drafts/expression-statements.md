---
title: "Are JavaScript expression statements dangerous?"
description:
  "My thoughts on why expression statements can be a source of bugs, and a
  proposal for reviving JavaScript's underused void operator."
tags:
  - "programming"
  - "javascript"
  - "web"
  - "essay"
---

_Originally posted 2023 March 15 on Cohost._

the _ExpressionStatement_ is the bane of my existence. C loves it, and C
influenced too many languages. Ruby takes it to an extreme even by making almost
everything both an expression and a statement.

consider the following JS program:

```js
1 + 3;
```

absolute nonsense, but it parses and runs.

WHY. we know that 1+2 doesn't have side effects, yet the grammar was made such
that nonsense of that form can be used as a statement. like, no. statements are
about side effects. don't let me put pure code there.

i was thinking about this in the context of accidentally forgetting to `await`
promises in JS:

```js
someAsyncFunction();
await anotherAsyncFunction();
```

now both async functions will run concurrently rather than sequentially, and bad
things will happen if `someAsyncFunction` fails since there's nobody around
listening for its failure state. this stinks. the fact that `await f()` just
piggy backs on promises and existing function calls makes it too easy to call
something in void context like this and throw away the result.

this happens in Go too with stuff like

```go
myFunctionThatReturnsErr()
anotherFunctionThatDependsOnIt()
```

like yeah if you do `err :=` you'll get warnings for not using `err` or whatever
but if you forget to assign it, no problem.

i want some kind of new mode that throws an error if you get a non-void value in
a void context. ideally at the type level, if you have a statically typed
language.

yeah, i'm a sicko, and i think you should have to write C code like this:

```c
void puts("Hello");
```

use the unary void operator to explicitly discard the return value since you're
intentionally discarding it. let this be a sign to the next programmer: i'm
throwing away a value that's potentially important!!! beware!!!!!! this is
unsafe. we all just let it happen though. ugh.

side note: remember when people used js void 0 links for clickable "buttons"
that were technically links? haha

```js
void 0;
```
