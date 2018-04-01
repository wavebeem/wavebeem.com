---
title: "Thoughts on Generics"
description: "My thoughts on generics in Java and Go"
layout: post
tab: blog
---

## My background with Java

I started programming at high school in 2004. After briefly using QBasic and Pascal, most of my classwork was in Java. You see, Java was (is?) the chosen language for [Advance Placement][ap] (college credit for standardized test scores), so it made the most sense to spend most of our time with Java. And honestly it was just a good idea in general for the time.

It turns out 2004 was also the year that Java 5 came out. Java 5 was a big upgrade to Java, and the most important part is definitely the addition of generics. Schooling takes time to catch up, though, so we spent a good bit of time learning Java _before_ we got to use generics.

## The `List` problem

Consider the Java interface `List` and its most popular implementation `ArrayList`. Each item in the `List` is specified to be an `Object`. Since basically everything is an object in Java, you can re-use the `ArrayList` class for a list of integers, a list of students, or really anything else.

```java
List people = new ArrayList();
people.add(new Person("Alice"));
people.add(new Person("Bob"));
```

Cool, so there's us putting two `Person`s into the `people` list. Now let's get them back out:

```java
Person alice = people.get(0);
// COMPILE ERROR: Object is not a Person
```

Uh-oh. The `List` interface returns `Object`, but we told Java we were expecting to get a `Person`. Something which is an `Object` _might_ also be a `Person` but there's no guarantee, so Java tells us the code isn't ok.

Well, the easy solution is "type casting", which just tells the compiler what type you expected compared with which type it guessed.

```java
Person alice = (Person)people.get(0);
```

OK, well that's a little irritating writing `Person` twice, but at least it works. But you have to know that the `people` list contains `Person`s in order to do this, yet nothing about `people`'s type (`List`) tells you that.

So someone else could grab the list and think "oh, it's students in here, right?":

```java
Student alice = (Student)people.get(0);
```

And this will compile! When you use a type cast, Java says "OK boss! I'll wait until you run the program to check that type". Now on the bright side, if that type cast fails, your program throws an exception, so you know it won't just keep going and have other bad effects.

But this is not ideal. If we try and add a boolean to a number, Java tells us no at compile time. But if we try to mix up our types in a list, it lets us go ahead.

In Java, (almost) everything is an `Object`, so the built-in `List` interface was specified to contain an `Object` for each item in the list. Technically this is fine. You have to do some finagling to promote ("box") a primitive type like `int` up to `Integer`, but besides that annoying caveat, you could essentially have a list with anything you want in it!

## Heterogenuous lists

It gets worse though! Not only can you expect the wrong type back from a list, but you can actually mix and match types inside of a single list!

```java
List items = new ArrayList();
items.add(new Cookie("chocolate chip"));
items.add(new Person("Deborah"));
```

Well this list is all kinds of messed up. Who wants a list with both of those kinds of things in there at the same time? The answer is probably no one, almost ever. This is generally a mistake.

## How generics fix it

The problem is that Java's list interface has no idea about what you _want_ to put in the list. Here's what it looks like (I made it shorter):

```java
interface List {
  public void add(Object item);
  public Object get(int index);
}
```

All `List` knows about is `Object`. If we wanted to make a list specifically for `Integer`s, it wouldn't be that hard to copy/paste and change a few things like this:

```java
interface IntegerList {
  public void add(Integer item);
  public Integer get(int index);
}

interface PersonList {
  public void add(Person item);
  public Person get(int index);
}

interface CookieList {
  public void add(Cookie item);
  public Cookie get(int index);
}

// etc.
```

Now not only would it get tedious to make all these interfaces, but you would need separate implementations too! So you'd have to write your own wrapper class around `ArrayList` called `IntegerArrayList` and that's just too big to even bother putting in this blog post.

So generics come in and basically solve the problem by giving classes and interfaces paramters, just like functions can have!

```java
interface List<T> {
  public void add(T item);
  public T get(int index);
}
```

Normally `T` is the name of the type variable if there isn't a better name to give it. And so you can write `List<Integer>` or `List<Person>` and that's kind of like calling a function that gives you back a new type.

## What about Go?

Yeah, sorry, this blog post was supposed to be about Go, kind of.

So, Go kind of made the same mistake Java did, only many many years after Java had already corrected the mistake. Go doesn't have generics.

Well, that's not entirely true. In Go you can have `string[]` (string slice), `int[]` (int slice), `int[][]` (slice of int slices) and so on. So they avoided the `List` problem from Java, right?

Well, here's the thing. Slices and maps and some of Go's built-in types can use generics! But Go code that you and I write _can't_.

Yeah so they basically decided that generics are a useful feature but also decided it would be too dangerous to let us build advanced tools with them.

## Conclusion

Most programming languages only have a small subset of the useful features found in other programming languages.

[ap]: https://en.wikipedia.org/wiki/Advanced_Placement
