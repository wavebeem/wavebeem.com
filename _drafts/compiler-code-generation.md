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

## What are we gonna code for?

To save time, no parser here. Show some example code then talk in AST afterward.



## escodegen

Mozilla JS AST is complicated, and escodegen doesn't perform correctness checking. It's not a bad idea to use this, but for educational purposes we're making our own stuff here.

## Our own AST for the bits we care about

TODO

## Our own code generator for those AST bits

TODO

[1]: /blog/2016/11/01/making-a-language/
[2]: http://coffeescript.org/
[3]: http://www.purescript.org/