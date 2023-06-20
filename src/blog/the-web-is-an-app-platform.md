---
title: |
  The web is an app platform
description: |
  The web is not merely a document platform. It has been an app platform for nearly its entirely life. I discuss the history of the web and my thoughts about why the web as an app platform has been incredible.
---

@[toc]

## What's an app anyway?

Let's start with how I'm defining app: a graphical program designed to by humans. It should be capable of performing computation and/or data storage. I don't care whether the computation and storage happens locally or on a server; most apps these days do both anyway.

In contrast, a document is something that is primarily consumed: reading text and/or viewing images. It generally is not capable of performing meaningful computation or data storage for the user.

I want to be clear that categorization is fraught. For every rule there exists some strange exception (e.g. PDFs can run JS). These are guidelines not rules. I have no patience for ["is a hot dog a sandwich?"](https://cuberule.com/) and similar questions.

## 27 years as an app platform

Out of a total of 33 years, 82% of the web's life has been as an app platform by my definition.

The initial version of the web only supported the GET request, which is meant to be side-effect free. You could've abused URL structure to make an application with side effects, but it would've been going against the grain.

This changed in late 1995 with HTML 2.0: That specification added the `<form>` tag, the form encoding format (e.g. `?k1=v1&k2=v2`), and the POST method for HTTP. The method POST is expliclitly allowed to perform side-effects (though it doesn't have to).

This gave the web everything necessary to replace paper forms. Forget JS, we had the foundation of an application web in 1995. Though the standardization of JS via ECMAScript happened less than two years later, furthering the web's abilities as an app platform.

If you wanted to count starting with the release of `XMLHttpRequest` (2006) then it would be 17 years (52%) of the web's life that we've had the ability to make networked applications inside the browser.

## 33 years as a document platform

They have a point in that it _started_ as a document platform, even if it's been more than that for over 27 years. I think some people take the view that the web _would be better off_ if it was still a document platform, and they say "the web is a document platform" as an affirmation or a wish about their desired state of the world.

There is no objective truth about categorization and meaning of words, though, so all I can do here is offer my perspective and see if it means anything to you.

I think the other reason people say this is that they lament a time when the web was simpler and less corporate. When more netizens had their own web pages. When our social space was something more free form like a web ring, not a locked down corporate entity like a Discord or Reddit group.

I too have nostalgia for that era, but I think it's unwise to let these judgments cloud our thoughts about the state of the web as a platform.

## The web can be both

It can be as simple or as complex as you want it to be. I've been doing web development professionally since 2012, so I've seen the build up to a lot of tools and processes that feel standard and unavoidable these days. But it's all about scale. I maintain side projects that are _literally_ a [git repository full of plain HTML](https://2bit-ui.wavebeem.com/), CSS, and JS files. I also maintain projects that use [advanced build systems like Vite](https://www.pkmn.help/defense/?mode=solo&types=normal&ability=none&format=simple).

If you're not steeped in the world of web development, a lot of the tooling might seem useless or even counterproductive. And sometimes I agree with that sentiment. The advent of [npm](https://www.npmjs.com/) (the Node.js package ecosystem) and bundling tools like [Browserify](https://en.wikipedia.org/wiki/Browserify) (2011) (eventually supplanted by [Webpack](https://en.wikipedia.org/wiki/Webpack) (2014)) marked a massive shift in how JS was written for the web. I think the Node.js culture swung the web too far toward shipping an extremely large amount of code client side, and using too many small modules, or modules that change too dramatically too often. But it's hard to deny that we can build incredibly powerful UIs quickly with the modern library selection for JS.

You can literally drag and drop a `.zip` file web content into [Netlify](https://www.netlify.com/) to get started hosting your site. You can use the web-based HTML editor on [Neocities](https://neocities.org/). Both of these are totally free even for sites that get thousands of visitors monthly, and support table-stakes features like HTTPS and HTTP/2 for security and speed.

I too miss the days when we would load a small handful of libraries globally on our web page, aware of just how much we were adding to our application size by virtue of nothing being abstracted. But [dependency hell was a real thing](https://api.jquery.com/jQuery.noConflict/) back then too for different reasons.

The web has your back. The size of the ecosystem means that you can generally find a tool that does what you want when making your website.

## I love the web

A list of some of my favorite parts about web development:

- CSS is extremely powerful (flexbox, grid, and custom properties can do so much)

- JS has a massive library ecosystem

- npm is relatively easy to use

- Generally a fast feedback loop

- Comparatively simple to make an application that works on every operating system

- App distribution is based on domain ownership (relatively cheap & easy), not a single entity gatekeeping applications (i.e. App Store on iOS, Google Play on Android)

## Nostalgia for Flash and Java

I fondly remember playing lots of Flash games, and how Flash was originally used to play videos on the web. This was very cool. But Flash was a plugin owned and operated by a single company. Apparently the developer experience was pretty nice, but the end user experience of having a little box inside a website that all the cool content was stuck inside of wasn't great. I remember having Flash player on Linux, at least, but I think I had to jump through some hoops more than once there. And Apple refused to work with Adobe to get it on phones. And there's good reason why. Flash was not good from an accessibility perspective, a security perspective, or even a usability perspective most of the time. I think some people forget how truly awful Flash-based web pages were at the time. Many of those sins of the past have come back to haunt us with modern JS-based web pages abusing things like the history API, animations, and event listeners to make us dizzy, all while ignoring accessibility, but at least what we have now is based on _open standards_ and not the whims of a single company (though Google has an outsized influence on the web due to Chrome, much like Microsoft had with Internet Explorer, and Netscape had with Netscape Navigator).

Java on the other hand I never really remember using. Though the idea is similar: You ship a file containing bytecode for a plugin that knows how to read it and execute it. I guess both of these plugins had lots of security flaws, though, and were too awkward in the middle of web pages to survive.

## Let's talk about Electron

## Hatred as a personality trait rots you from the inside

## Misc

The attitude of "fuck computers" and "web development is awful" and similar statements are brain poison: they hurt you just by thinking about them

Remember image maps? Combine image maps with a little bit of server-side state and it's pretty easy to make a game that doesn't require any real-time reaction

## Appendix: Web timeline

This section covers a timeline of the web and key technologies related to it.

### 1990 &ndash; WorldWideWeb

The first web browser was created: [WorldWideWeb](https://www.mozilla.org/en-US/firefox/browsers/browser-history/). It was created in 1990 by Tim Berners-Lee while he was working for CERN.

### 1994 &ndash; Netscape Navigator

[Netscape Navigator](https://www.mozilla.org/en-US/firefox/browsers/browser-history/) was released in 1994. It was the first widely popular web browser.

### 1995 &ndash; HTML 2.0

The HTML 2.0 specification was published as [RFC 1866](https://datatracker.ietf.org/doc/html/rfc1866) in November 1995. It included the initial version of HTML forms: text inputs (regular, password, and multi-line), checkboxes, radio buttons, dropdowns, submit buttons, reset buttons, hidden fields, and the reset button. This includes both GET and POST form submission types, explicitly allowing for side-effects from an HTML form.

### 1995 &ndash; Java applets

[Java applets](https://en.wikipedia.org/wiki/Java_applet) were released in 1995, along with the first version of Java.

### 1997 &ndash; ECMAScript

[ECMAScript](https://en.wikipedia.org/wiki/JavaScript#The_rise_of_JScript) was published in June 1997. Microsoft had already reverse engineered Netscape Navigator's JavaScript language, but this marked the beginning of JS as an open standard for the web.

### 1998 &ndash; DOM Level 1

The [DOM Level 1](https://www.w3.org/TR/REC-DOM-Level-1/) specification was published in October 1998. This included basic APIs like [document.createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) that allowed creating, updating, and deleting nodes in the DOM.

### 2006 &ndash; XMLHttpRequest

The [XMLHttpRequest](https://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/) specification was published in 2006. This class allows the web page to make network requests via JS and read their values. This allowed web applications to bypass the need for full page loads when making network requests, marking the beginning of the single page application (SPA). Before this, [JSONP](https://en.wikipedia.org/wiki/JSONP) was used, but it was not a good security practice.

### 2009 &ndash; ECMAScript 5

[ECMAScript 5](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) was published in 2009. JS became a lot more powerful with this release.

### 2012 &ndash; NW.js (aka node-webkit)

[Version 0.2.0 of NW.js](https://github.com/nwjs/nw.js/releases/tag/v0.2.0) was released in 2012. This framework later inspired [Electron](<https://en.wikipedia.org/wiki/Electron_(software_framework)>) and helped start the trend of shipping web applications as native applications for Windows, macOS, and Linux.

### 2015 &ndash; ECMAScript 2015 (aka ES6)

[ECMAScript 2015](https://262.ecma-international.org/6.0/) was published in 2015. This marked the shift towards publishing yearly ECMAScript revisions and a shift towards continuously updated (evergreen) web browsers.
