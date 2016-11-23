---
title: "Compiler Code Generation"
description: "How to make code generation for a compiler"
layout: post
---

## What is code generation?

High level compiler design. Reminder about ASTs, and explain how code generation comes after that step.

## Code generation vs interpretation

Link to [previous blog post][1] demonstrating interpretation. Also, explain why compile-to-JS is a unique case (readability of generated code, ease of debugging, etc).

## What are we gonna code for?

To save time, no parser here. Show some example code then talk in AST afterward.

## escodegen

Mozilla JS AST is complicated, and escodegen doesn't perform correctness checking. It's not a bad idea to use this, but for educational purposes we're making our own stuff here.

## Our own AST for the bits we care about

TODO

## Our own code generator for those AST bits

TODO

[1]: /blog/2016/11/01/making-a-language/