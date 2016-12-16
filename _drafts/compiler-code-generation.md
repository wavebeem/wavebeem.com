---
title: "Compiler Code Generation"
description: "How to make code generation for a compiler"
layout: post
---

## What is code generation?

Compilers and interpreters are basically big pipelines, transforming one type of data to into another, and finally either generating code or running a program.

At a very high level, the steps are:

- Read the source code
- Parse the code into an abstract syntax tree (AST)
- *(optional)* Emit warnings based on the AST
- *(optional)* Typecheck the AST
- Generate code or run the program

Technically the AST step is optional (PHP only recently started using an AST), but basically every language implementation uses this step.

Code generation is the final step in a compiler. The compiler generates code that produces the desired effect. Generated code might be JavaScript (compile-to-JS language), machine code (C compiler), JVM bytecode (Java compiler, Clojure compiler, etc).


## Code generation vs interpretation

My [previous blog post][1] about making a programming language covers making an interpreter. Interpreters are easy to make because all you have to do is write a program that has the right behavior, whereas with a compiler, you have to generate code in another language that happens to have the same behavior as your source language.

This means that the more different your input and output languages are, the harder it is to do the code generation. [CoffeeScript][2] is extremely similar to JavaScript, so it is able to produce a similar amount of JavaScript as CoffeeScript to achive its code generation. [PureScript][3] requires a *lot* more JavaScript code output to achieve the correct program, because it is a lot different than JavaScript.

Compiling to JavaScript is a bit of a unique case though, compared to compiling to machine code or some kind of bytecode. JavaScript is actually intended as a language for programmers to program in, unlike, say, JVM bytecode. So JavaScript environments expect you to debug and inspect JavaScript code. Nobody really cares if the JVM bytecode from a compiler looks *weird*, but if you generate really weird looking code from a language that compiles to JavaScript, it can bother people when they're debugging. [Source maps][4] can help with that problem, but it's only a partial debugging solution.

## Code generation

Code generation can be quite a bit harder, since you're translating one language into another, and at least in JavaScript, there aren't any great libraries to help make the task easier. Ideally you would take the AST for your source language, and translate it into an AST for your destination language, and then use a code generator for your destination language. Meaning a pipeline like this:

```js
{
  type: "cool.Add",
  left: {type: "cool.Number", value: 3},
  right: {type: "cool.Number", value: 4},
}
```

…which would become…

```js
{
  type: "js.Operator",
  operator: "+",
  left: {type: "js.Literal", value: 3},
  right: {type: "js.Literal", value: 4},
}
```

…and then some lovely library converts that data into…

```js
3 + 4
```

You can use [escodegen][4] to help with this, but it is lacking in error reporting and documentation currently, so it can be a bit rough.

## An example pipeline from start to finish

In the interest of time, I'll just be going over a high level view of the steps in transforming a simple language with just basic math through the entire compiler process, but ommitting any code.

## Step 0: The input

This is just the text that would be in a code text file.

```js
let x = 1
let y = 2
print x + y ^ 3
```

## Step 1: Tokenization

This is the output from the tokenization substep of parsing. Note that not all parsing techniques have a tokenization step.

```js
[ // line 1
  { type: 'Let', value: 'let' },
  { type: 'Var', value: 'x' },
  { type: 'Eq', value: '=' },
  { type: 'Number', value: '1' },
  { type: 'Newline', value: '\n' },

  // line 2
  { type: 'Let', value: 'let' },
  { type: 'Var', value: 'y' },
  { type: 'Eq', value: '=' },
  { type: 'Number', value: '2' },
  { type: 'Newline', value: '\n' },

  // line 3
  { type: 'Print', value: 'print' },
  { type: 'Var', value: 'x' },
  { type: 'Op', value: '+' },
  { type: 'Var', value: 'y' },
  { type: 'Op', value: '^' },
  { type: 'Number', value: '3' } ]
```

## Step 2: Parsing

This is the step where either the source code or source tokens are converted into JSON data that can be easily processed by the rest of the compiler. Importantly, this takes a linear sequence of data (either text or tokens), and turns it into deep, nested data.

```js
{ type: 'Program',
  statements:
   [ { type: 'cool.Let',
       name: 'x',
       value: { type: 'cool.Number', value: 1 } },
     { type: 'cool.Let',
       name: 'y',
       value: { type: 'cool.Number', value: 2 } },
     { type: 'cool.Print',
       value:
        { type: 'cool.Add',
          left: { type: 'cool.Var', name: 'x' },
          right:
           { type: 'cool.Pow',
             left: { type: 'cool.Var', name: 'y' },
             right: { type: 'cool.Number', value: 3 } } } } ] }
```

## Step 3: Translating to JS

This step is translating from the source language AST (cool) to the destination language AST (JavaScript). This is definitely the hardest part of the compiler.

```js
{ type: 'Program',
  body:
   [ { type: 'VariableDeclaration',
       declarations:
        [ { type: 'VariableDeclarator',
            id: { type: 'Identifier', name: 'x' },
            init: { type: 'Literal', value: 1, raw: '1' } } ],
       kind: 'var' },
     { type: 'VariableDeclaration',
       declarations:
        [ { type: 'VariableDeclarator',
            id: { type: 'Identifier', name: 'y' },
            init: { type: 'Literal', value: 2, raw: '2' } } ],
       kind: 'var' },
     { type: 'ExpressionStatement',
       expression:
        { type: 'CallExpression',
          callee:
           { type: 'MemberExpression',
             computed: false,
             object: { type: 'Identifier', name: 'console' },
             property: { type: 'Identifier', name: 'log' } },
          arguments:
           [ { type: 'BinaryExpression',
               operator: '+',
               left: { type: 'Identifier', name: 'x' },
               right:
                { type: 'CallExpression',
                  callee:
                   { type: 'MemberExpression',
                     computed: false,
                     object: { type: 'Identifier', name: 'Math' },
                     property: { type: 'Identifier', name: 'pow' } },
                  arguments:
                   [ { type: 'Identifier', name: 'y' },
                     { type: 'Literal', value: 3, raw: '3' } ] } } ] } } ],
  sourceType: 'script' }
```

## Step 4: Code generation

For code generation the JS AST is turned into JS source code.

```js
var x = 1;
var y = 2;
console.log(x + Math.pow(y, 3));
```

## Wrapping up

For now, actually coding the pipeline for the demonstration above will be left as an exercise for the reader. I can suggest using [Parsimmon][5] as per my last blog post. The AST translation will require your own hard work, but [Esprima][6] can be used to turn the JS AST into JS code with ease.

[1]: /blog/2016/11/01/making-a-language/
[2]: http://coffeescript.org/
[3]: http://www.purescript.org/
[4]: https://github.com/estools/escodegen
[5]: https://github.com/jneen/parsimmon
[6]: http://esprima.org/
