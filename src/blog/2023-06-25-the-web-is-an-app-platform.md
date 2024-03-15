---
title: |
  The web is an app platform
description: |
  The web has been an app platform for most of its life. I discuss the history of the web and my definition of "app".
---

## Defining the word app

Apps usually have these properties:

- It's a graphical computer program
- It's designed for human use
- It can read, write, and compute data

In contrast, documents are for consumption. An application can include documents. A JPEG file is a document but an image viewer is an app. A plain HTML file is a document, but an HTML file with JS or a backend service is an app.

It may seem odd that you need a web browser app to use a web app, but you can think of this more like an OS or VM.

## Reasons the web is an app platform

Out of a total of 33 years, over 80% (27 years) of the web's life has been as an app platform by my definition.

The initial version of the web only supported the GET request.

HTML 2.0 released in late 1995, adding the `<form>` tag, the form encoding format (e.g. `?k1=v1&k2=v2`), and the POST method for HTTP. POST requests may perform side-effects, enabling the creation of web apps.

This gave the web everything necessary to replace paper forms. The ECMAScript open standard for JS released only two years later.

The _XMLHttpRequest_ standard released in 2006, marking the beginning of client-side web apps. At 17 years, this API has been around for over 50% of the web's life.

## The web started as a document platform

The web started as a document platform, and some say it was better off that way.

They lament a time when the web was simpler and less corporate. When more people had their own web pages. When a social circle was a web ring or forum, not a subsection of a dying social media company.

I have my share of nostalgia for that era, but even phpBB forums were web apps by my definition.

## There's more than one way to make a website

Web development can be as simple or as complex as you want. I've been a web developer since 2012, and I've seen the creation of many modern web development tools. I maintain side projects that are a [git repository full of plain HTML/CSS/JS](https://2bit-ui.wavebeem.com/ "https://2bit-ui.wavebeem.com/") files. I also maintain projects that use [advanced build systems like Vite](https://www.pkmn.help/defense/?mode=solo&types=normal&ability=none&format=simple "https://www.pkmn.help/defense/?mode=solo&types=normal&ability=none&format=simple"). I choose tools based on the problem I'm solving.

Modern web development stacks might seem useless or counterproductive to some. Sometimes we go overboard with tooling, but it serves a purpose. [npm](https://www.npmjs.com/ "https://www.npmjs.com/") and [Browserify](https://en.wikipedia.org/wiki/Browserify "https://en.wikipedia.org/wiki/Browserify") made integrating millions of packages easy. Modern websites rely on lots of third party code, enabling more ambitious projects. TypeScript made coding safer and IDEs smarter. Once you get used to these tools, their absence can feel frustrating.

You can drag-and-drop a `.zip` file into [Netlify](https://www.netlify.com/ "https://www.netlify.com/") to start hosting your site. You can use the web-based HTML editor on [Neocities](https://neocities.org/ "https://neocities.org/"). These hosting platforms can serve high-traffic pages for free. And they support modern protocols like HTTPS and HTTP/2.

Module bundlers have enabled JS bloat by hiding complexity. We used to include every library by hand, but [dependency hell existed](https://api.jquery.com/jQuery.noConflict/) before bundlers.

## Web apps have many strengths

- CSS is powerful
  - Flexbox, grid, custom properties
- JS has a massive library ecosystem
- npm is easy-to-use
- Has a fast feedback loop
  - Vite can often achieve sub-second hot reloads!
- Works on every operating system
- Owning a secure site is easy thanks to services like Netlify, Vercel, and Neocities
- Impressive commitment to backwards compatibility
  - The [first website](http://info.cern.ch/hypertext/WWW/TheProject.html "http://info.cern.ch/hypertext/WWW/TheProject.html") from 1991 still works in modern browsers

## We needed an app platform

The release of HTML 2.0 in 1995 enabled web apps to exist. HTML forms and HTTP POST requests were all we needed to build apps. Everything since then has been a refinement.

It's unsurprising the web became an app platform. We needed a standardized way of doing apps across many devices. Where Java failed, the web flourished. If not the web, some other platform would've taken its place.

## Appendix: Web timeline

This section covers a timeline of the web and key technologies related to it. I want to be transparent about myself: I am approximately the same age as the web. I was born in 1990, started programming in 2004, and started working as a software developer in 2012\. I researched this section to the best of my ability. Let me know if I've made any mistakes.

**1990 – WorldWideWeb**

Tim Berners-Lee created [WorldWideWeb](https://www.mozilla.org/en-US/firefox/browsers/browser-history/), the first web browser.

**1991 – The first website**

CERN released the first website: ["World Wide Web"](http://info.cern.ch/hypertext/WWW/TheProject.html "http://info.cern.ch/hypertext/WWW/TheProject.html").

**1994 – Netscape Navigator**

Netscape released [Netscape Navigator](https://www.mozilla.org/en-US/firefox/browsers/browser-history/ "https://www.mozilla.org/en-US/firefox/browsers/browser-history/") in 1994\. It was the first popular web browser.

**1995 – HTML 2.0**

The HTML 2.0 specification was published as [RFC 1866](https://datatracker.ietf.org/doc/html/rfc1866 "https://datatracker.ietf.org/doc/html/rfc1866") in November 1995\. It included all the features needed to make server side web apps:

- HTML forms
  - text inputs
  - password inputs
  - multi-line text inputs
  - checkboxes
  - radio buttons
  - dropdowns
  - submit buttons
  - reset buttons
  - hidden fields
- POST method
  - Allows side-effects in request processing, enabling the creation of web apps

**1995 – Java applets**

Sun Microsystems released [Java](https://en.wikipedia.org/wiki/Java_applet "https://en.wikipedia.org/wiki/Java_applet") in 1995, along with Java applets for the web.

**1997 – ECMAScript**

[ECMAScript](https://en.wikipedia.org/wiki/JavaScript#The_rise_of_JScript "https://en.wikipedia.org/wiki/JavaScript#The_rise_of_JScript") was published in June 1997\. This marked the beginning of JS as an open standard for the web. Microsoft had already reverse engineered JS for use in Internet Explorer.

**1998 – DOM Level 1**

The [DOM Level 1](https://www.w3.org/TR/REC-DOM-Level-1/ "https://www.w3.org/TR/REC-DOM-Level-1/") specification was published in October 1998\. This included basic APIs to manipulate the DOM, such as [document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement").

**2006 – XMLHttpRequest**

The [XMLHttpRequest](https://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/ "https://www.w3.org/TR/2006/WD-XMLHttpRequest-20060405/") specification was published in 2006\. This class allows the web page to make network requests via JS and read their values. This allowed web apps to bypass the need for full page loads when making network requests. This was the beginning of the single page app (SPA). Some APIs used [JSONP](https://en.wikipedia.org/wiki/JSONP "https://en.wikipedia.org/wiki/JSONP") before this, but it wasn't a good security practice.

**2009 – ECMAScript 5**

[ECMAScript 5](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/ "https://www.ecma-international.org/publications-and-standards/standards/ecma-262/") was published in 2009\. JS became a lot more powerful with this release.

**2012 – NW.js (aka node-webkit)**

[Version 0.2.0 of NW.js](https://github.com/nwjs/nw.js/releases/tag/v0.2.0 "https://github.com/nwjs/nw.js/releases/tag/v0.2.0") was released in 2012\. This framework later inspired [Electron.](<https://en.wikipedia.org/wiki/Electron_(software_framework)> "https://en.wikipedia.org/wiki/Electron_(software_framework)") It popularized shipping web apps as "native" apps for Windows, macOS, and Linux.

**2015 – ECMAScript 2015 (aka ES6)**

[ECMAScript 2015](https://262.ecma-international.org/6.0/ "https://262.ecma-international.org/6.0/") was published in 2015\. This marked the shift towards publishing yearly ECMAScript revisions. Browsers have generally moved to continuous update model as well.
