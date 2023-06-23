---
title: |
  The web is an app platform
description: |
  The web is not merely a document platform. It has been an app platform for nearly its entirely life. I discuss the history of the web and my thoughts about why the web as an app platform has been incredible.
---

@[toc]

## What's an app anyway?

Let's start with how I'm defining app: a graphical program designed to be used by humans. It should be capable of performing computation and/or data storage. I don't care whether the computation and storage happens locally or on a server; most apps these days do both anyway.

In contrast, a document is something that is primarily consumed: reading text and/or viewing images. It generally is not capable of performing meaningful computation or data storage for the user.

I want to be clear that categorization is fraught. For every rule there exists some strange exception (e.g. PDFs can run JS). These are guidelines not rules. I have no patience for ["is a hot dog a sandwich?"](https://cuberule.com/) and similar questions.

## Why do I say the web is an app platform?

Out of a total of 33 years, 82% (27 years) of the web's life has been as an app platform by my definition.

The initial version of the web only supported the GET request, which is meant to be side-effect free. You could've abused URL structure to make an app with side effects, but it would've been going against the grain.

This changed in late 1995 with HTML 2.0: That specification added the `<form>` tag, the form encoding format (e.g. `?k1=v1&k2=v2`), and the POST method for HTTP. The method POST is explicitly allowed to perform side-effects (though it doesn't have to).

This gave the web everything necessary to replace paper forms. Forget JS, we had the foundation of an app web in 1995. Though the standardization of JS via ECMAScript happened less than two years later, furthering the web's abilities as an app platform.

If you wanted to count starting with the release of `XMLHttpRequest` (2006) then it would be 17 years (52%) of the web's life that we've had the ability to make networked apps inside the browser.

## Why do people say the web is a document platform?

They have a point in that it _started_ as a document platform, even if it's been more than that for over 27 years. I think some people take the view that the web _would be better off_ if it was still a document platform, and they say "the web is a document platform" as an affirmation or a wish about their desired state of the world.

There is no objective truth about categorization and meaning of words, though, so all I can do here is offer my perspective and see if it means anything to you.

I think the other reason people say this is that they lament a time when the web was simpler and less corporate. When more netizens had their own web pages. When our social space was something more free form like a web ring, not a locked down corporate entity like a Discord or Reddit group.

I too have nostalgia for that era, but I think it's unwise to let these judgments cloud our thoughts about the state of the web as a platform.

## The web can be both

It can be as simple or as complex as you want it to be. I've been doing web development professionally since 2012, so I've seen the build up to a lot of tools and processes that feel standard and unavoidable these days. But it's all about scale. I maintain side projects that are _literally_ a [git repository full of plain HTML](https://2bit-ui.wavebeem.com/), CSS, and JS files. I also maintain projects that use [advanced build systems like Vite](https://www.pkmn.help/defense/?mode=solo&types=normal&ability=none&format=simple).

If you're not steeped in the world of web development, a lot of the tooling might seem useless or even counterproductive. And sometimes I agree with that sentiment. The advent of [npm](https://www.npmjs.com/) (the Node.js package ecosystem) and bundling tools like [Browserify](https://en.wikipedia.org/wiki/Browserify) (2011) (eventually supplanted by [Webpack](https://en.wikipedia.org/wiki/Webpack) (2014)) marked a massive shift in how JS was written for the web. I think the Node.js culture swung the web too far toward shipping an extremely large amount of code client side, and using too many small modules, or modules that change too dramatically too often. But it's hard to deny that we can build incredibly powerful UIs quickly with the modern library selection for JS.

You can literally drag and drop a `.zip` file web content into [Netlify](https://www.netlify.com/) to get started hosting your site. You can use the web-based HTML editor on [Neocities](https://neocities.org/). Both of these are totally free even for sites that get thousands of visitors monthly, and support table-stakes features like HTTPS and HTTP/2 for security and speed.

I too miss the days when we would load a small handful of libraries globally on our web page, aware of just how much we were adding to our app size by virtue of nothing being abstracted. But [dependency hell was a real thing](https://api.jquery.com/jQuery.noConflict/) back then too for different reasons.

The web has your back. The size of the ecosystem means that you can generally find a tool that does what you want when making your website.

## I love the web

A list of some of my favorite parts about web development:

- CSS is extremely powerful (flexbox, grid, and custom properties can do so much)

- JS has a massive library ecosystem

- npm is relatively easy to use

- Generally a fast feedback loop

- Comparatively simple to make an app that works on every operating system

- App distribution is based on domain ownership (relatively cheap & easy), not a single gatekeeping entity (i.e. App Store on iOS, Google Play on Android)

- Impressive commitment to backwards compatibility: The [first website](http://info.cern.ch/hypertext/WWW/TheProject.html) from 1991 still works in modern browsers

## Nostalgia for Flash and Java

I fondly remember playing lots of Flash games, and how Flash was originally used to play videos on the web. This was very cool. But Flash was a plugin owned and operated by a single company. Apparently the developer experience was pretty nice, but the end user experience of having a little box inside a website that all the cool content was stuck inside of wasn't great. I remember having Flash player on Linux, at least, but I think I had to jump through some hoops more than once there. And Apple refused to work with Adobe to get it on phones. And there's good reason why. Flash was not good from an accessibility perspective, a security perspective, or even a usability perspective most of the time. I think some people forget how truly awful Flash-based web pages were at the time. Many of those sins of the past have come back to haunt us with modern JS-based web pages abusing things like the history API, animations, and event listeners to make us dizzy, all while ignoring accessibility, but at least what we have now is based on _open standards_ and not the whims of a single company (though Google has an outsized influence on the web due to Chrome, much like Microsoft had with Internet Explorer, and Netscape had with Netscape Navigator).

Java on the other hand I never really remember using. Though the idea is similar: You ship a file containing bytecode for a plugin that knows how to read it and execute it. I guess both of these plugins had lots of security flaws, though, and were too awkward in the middle of web pages to survive.

## Let's talk about Electron

[Electron](<https://en.wikipedia.org/wiki/Electron_(software_framework)>) is the popular app development framework for embedding your website inside Chromium (the open source project behind Google Chrome). It's become a huge discussion topic because many apps, especially ones that work on more than one operating system, are being created using it these days. People often lament that Electron-based apps don't feel native and use too many system resources. These are valid concerns, but I'd like to mention some of positives:

- Relatively simple to make an app for Windows, macOS, and Linux with a single code base

- Easy to keep up to date with the pure web version of your product, due to code sharing

- Powerful theming via CSS allows deep UI customization

- You can hire web developers to work on your product

Making a native app for any operating system is considerably more challenging than making a web app. In the past I worked for a company that maintained a single product built as a web app, an Android app, and an iOS app. These were three fully separate code bases which required hiring three different types of software developers with little career overlap in skills. It's clear to see this solution is already going to cost three times as many developers, and that's only if you're developing the app for three platforms. Throw in a native Windows app too and you're up to four. I won't even count macOS or Linux here. Plus there's the organizational overhead of keeping many different apps consistent. I understand that part of the point of native apps is to be more consistent with the host OS than internally to the app's branding, but this can be really confusing if you use the same app on multiple platforms. Besides, users will expect most features to work on every OS, and now you have to reimplement every feature.

Some people will say "make a shared library" as a response to this. That might help, though sharing code across many operating systems is harder than you might think. But the real problem is it ignores that while you can share core logic, maybe, there's mountains of UI work to be done. UI work is consistently underestimated and underappreciated. It's expensive, time consuming, and incredible challenging to maintain more than one version of an app.

Imagine a world where instead of being a cross platform Electron app, [VS Code](https://code.visualstudio.com/) had been made using a native Windows UI library. Would it have ever become popular in the way that it has? Sure, lots of developers use Windows, but macOS and Linux are quite common too. As someone who uses more than one operating system, I treasure that VS Code is nearly identical across all of them. I constantly lament that there are few good cross platform apps, and it feels like most of the best ones are web based.

Cross platform UI toolkits can help, but they have their own limitations. [Qt](https://www.qt.io/) is quite popular and has even adopted many features of the web: [declarative UI](https://doc.qt.io/qt-6/qtquick-usecase-visual.html) and [CSS](https://doc.qt.io/qt-5/stylesheet.html). Cross platform UI toolkits are often disliked for their lack of native "feel", but they do tend to be more efficient than Electron apps.

I don't think every app should use Electron, but I'm also not surprised that so many are. It's a good technical and economic choice. Software developers and business people at companies are not asking their users what technologies to use to build their apps, and they never will.

## Hatred as a personality trait rots you from the inside

As [Bjarne Stroustrop](https://www.stroustrup.com/quotes.html), creator of C++, once said:

> There are only two kinds of languages: the ones people complain about and the ones nobody uses.

I feel like this quote is highly relevant to the web: lots of people complaining about it, but also a lot of people using it. It's certainly relevant to HTML, CSS, and JS: The underlying languages of the web.

I want to be clear that I understand being disappointed about the web, especially the massive shift towards destroying our privacy, plastering everything in invasive ads, centralizing all our communication in the hands of a few giant companies, the overuse of JS for simple sites, the trend towards websites consuming absurd amounts of bandwidth, etc. I've been a web developer for over a decade and I've used the web for most of my life. I remember the pre-Web 2.0 days. But there's a point where the negative energy emitting from some people online feels radioactive and self-destructive.

If your social media bio opens with "JS was a mistake" or "React sucks", I just have to ask: Why? Imagine meeting someone in real life and opening with that. Or imagine hanging around that person and they incessantly talk about what they _hate_ about the web.

I can say from personal experience that defining yourself in terms of your opposition to something else isn't good for you. It's so much easier to tear something down than to create something. It's so much easier to mock people than it is to help them. It's so much easier to hate than to love.

I could rant about things I hate about the web for ages, but for better and for worse, this place has stuck around because it did a lot of things right, and is fairly resilient.

I can't tell you what to do or how to think, but I can choose who I engage with. And remember that your words matter. Just recently I was reading about how someone who had a habit of saying "Computers were a mistake" was asked to stop at work because it was scaring new employees. This level of negativity and edginess seems like a defense mechanism to me. It's so much scarier to be vulnerable and sincere than it is jaded and bitter. I fucking know it is, and it's a conscious decision to try spending more of my time not indulging that part of myself.

Computers were not a mistake. The web was not a mistake. JS was not a mistake. It's reductionist to act this way. Social media has really done a number on our ability to speak at length and with any nuance on subjects. Please resist the urge to speak so negatively and forcefully especially about things that are of relatively little consequence. If not for others, do it for yourself. You deserve to be happy.

## The End

Sorry that got a little heavy at the end. To summarize, I think that since HTML 2.0 the web has clearly been an app platform. That's most of the web's life, so I think it's safe to call the web an app platform, even given its roots as a document platform.

## Appendix: Web timeline

This section covers a timeline of the web and key technologies related to it. I want to be transparent about myself: I am approximately the same age as the web. I was born in 1990, started programming in 2004, and started working as a software developer in 2012. I researched this section to the best of my ability, but please let me know if I've misunderstood or misrepresented something here.

### 1990 &ndash; WorldWideWeb

The first web browser was created: [WorldWideWeb](https://www.mozilla.org/en-US/firefox/browsers/browser-history/). It was created in 1990 by Tim Berners-Lee while he was working for CERN.

### 1991 - The first website is released

The first website was [released in 1991](https://www.npr.org/2021/08/06/1025554426/a-look-back-at-the-very-first-website-ever-launched-30-years-later). It was a page about the web itself: ["World Wide Web"](http://info.cern.ch/hypertext/WWW/TheProject.html).

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

The [XMLHttpRequest](https://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/) specification was published in 2006. This class allows the web page to make network requests via JS and read their values. This allowed web apps to bypass the need for full page loads when making network requests, marking the beginning of the single page app (SPA). Before this, [JSONP](https://en.wikipedia.org/wiki/JSONP) was used, but it was not a good security practice.

### 2009 &ndash; ECMAScript 5

[ECMAScript 5](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/) was published in 2009. JS became a lot more powerful with this release.

### 2012 &ndash; NW.js (aka node-webkit)

[Version 0.2.0 of NW.js](https://github.com/nwjs/nw.js/releases/tag/v0.2.0) was released in 2012. This framework later inspired [Electron](<https://en.wikipedia.org/wiki/Electron_(software_framework)>) and helped start the trend of shipping web apps as native apps for Windows, macOS, and Linux.

### 2015 &ndash; ECMAScript 2015 (aka ES6)

[ECMAScript 2015](https://262.ecma-international.org/6.0/) was published in 2015. This marked the shift towards publishing yearly ECMAScript revisions and a shift towards continuously updated (evergreen) web browsers.
