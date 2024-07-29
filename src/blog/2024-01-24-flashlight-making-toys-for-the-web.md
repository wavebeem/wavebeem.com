---
title: |
  Flashlight: Making toys for the web
description: |
  I made a toy flashlight for the web. It simulates darkening the web page and following the cursor. It looks somewhat convincingly like a flashlight. Enjoy!
---

<script
  type="module"
  src="/static/elements/wavebeem-toy-flashlight.mjs?t={{ dateNow }}"
></script>

## Introducing: Flashlight

I recently created [netpet](https://netpet.wavebeem.com/), a Tamagotchi-like virtual pet. I realized that one of my favorite things to do is making a small web application that doesn't have any real value besides a small amount of entertainment.

Today I made a flashlight you can toggle on this page.

<wavebeem-toy-flashlight>
  <button class="sage-button sage-primary">Toggle flashlight mode</button>
</wavebeem-toy-flashlight>

[View source](/static/elements/wavebeem-toy-flashlight.mjs)

## Why I wanted to learn programming

When I was young, I dreamed of being a video game developer. The famous [EA Spouse](https://ea-spouse.livejournal.com/274.html) story was published when I was 14 years old. This drastically changed my interest in entering the video game field. I was already learning how to program at the time, though, and the story didn't suppress my interest in programming. Four years later I was getting my B.A. in Computer Science. I had dabbled in "web development" already by making static HTML & CSS websites, but in 2011 I started learning JS.

## The tech industry

At this point I've spent over a decade working as a software developer. In the early days, I was still voraciously consuming tutorials, blog posts, and especially official documentation for anything remotely related to my interests and skill sets. I was doing lots of open source work in my free time.

Nowadays I don't really do that kind of stuff as much. I don't think the web platform has slowed down exactly, but maybe there's less "game changer" type things coming out, and it feels like many of my colleagues are even further behind on new web standards and features than I am.

## Embracing the platform

I feel like I've become out of touch with the web platform. I've spent the last six years working with [React](https://react.dev/), and I've grown increasingly frustrated with it. React has started to show its age, with other frameworks flawlessly supporting [custom elements](https://custom-elements-everywhere.com/), out of the box styling abstractions, routing, faster runtimes, and smaller file sizes. And don't even get me started on [hooks and useState](/blog/2022/01/25/why-i-don-t-like-usestate/).

I've made a goal for myself to learn more about the web platform. The pace of improvement to core web APIs and features is incredible. The level of code you can ship with zero libraries and compilers is better than it's ever been. And despite the haters, custom elements are pretty good.

## Wrapping up

You can expect to see more small toys for the web from me in the future. It feels like a good way to keep my skills sharp, and I have a lot of fun making them.
