---
date: "2024-11-10"
title: "Becoming an Astro-not"
description:
  "I spent an entire weekend migrating my Eleventy site to Astro—and then back
  to Eleventy! A reflection on using the right tool for the job, when many
  options are viable."
---

## It's so hard to compare frameworks

Marketing pages tend to make everything look like the best thing since sliced
bread. I've been in this industry long enough to know that everything has
tradeoffs, and I'd prefer to have an honest evaluation of the faults of various
tools.

I typically need to get neck deep (e.g. spend an entire weekend coding) in a
framework change to understand if I want to keep it or not.

## Eleventy's vibes

> **Eleventy is a simpler static site generator**

Their home page includes a cute cartoon opossum mascot that slowly floats in
from the left side of the screen. It feels very no-nonsense, but a bit cute too.

Seeing this I think "this is a well established tool made by a small group of
quirky people". It seems like a good fit for an individual web enthusiast like
me.

![](/blog/astro-not/11ty-home.webp)

![](/blog/astro-not/11ty-home2.webp)

![](/blog/astro-not/11ty-docs.webp)

**Eleventy's home page & documentation page**

## Astro's vibes

> **The web framework for content-driven websites**
>
> Astro powers the world's fastest marketing sites, blogs, e-commerce websites,
> and more.

Their home page opens with a highly polished style and catchy headline,
underlined by a huge list of famous logos for some social proof.

After that, we see a really cool hacker-esque set of code snippets about...
building an e-commerce platform. I just want a blog with sprinkles lol.

![](/blog/astro-not/astro-home.webp)

![](/blog/astro-not/astro-home2.webp)

![](/blog/astro-not/astro-docs.webp)

**Astro's home page & documentation page**

## What does it mean to be "simpler"?

> Eleventy offers full control over your project’s output. We don’t inject our
> own markup into your pages.

For better and for worse, Eleventy really puts the control in your hands. For a
project like my personal site, I really like this. I'm a perfectionist, and I
hate slow and messy websites. I believe that something as static as my personal
site should get by on using the simplest tool for the job. And Eleventy fits
really well for me.

Astro on the other hand feels very business ready&trade;. With CSS modules,
scoped inline styles, automatic script concatenation, JSX, TypeScript, etc... It
brings a lot to the table for larger teams and bigger sites.

## This isn't a hate post

I'm fine with Astro. In fact, it seems really good. But I'm trying to be more
conservative with my tech choices these days, with regard to not betting
everything on brand new projects all the time (like so many of my peers seem to
love doing).

I think Astro seems like a really good framework for business use cases, and
could be a nice alternative to the recent dominance of Next.js and React-based
websites.

<aside>

### Inline JavaScript in 2024?

Astro requires
[allowing inline JavaScript](https://docs.astro.build/en/guides/troubleshooting/#refused-to-execute-inline-script).
There's an
[ongoing discussion](https://github.com/withastro/roadmap/discussions/377) about
changing this behavior, but it doesn't seem to be a priority.

Google claims that most
[Content Security Policy](https://research.google/pubs/csp-is-dead-long-live-csp-on-the-insecurity-of-whitelists-and-the-future-of-content-security-policy/)
(CSP) directives aren't actually effective in production, but the full text is
not available.

My understanding is that cross-site scripting (XSS) attacks other than inline
code (it's literally called `unsafe-inline` in CSP) execution primarily happen
by compromising the integrity of third-party domains. I only include one
third-party domain: [Plausible Analytics](https://plausible.io), and there is
little value in XSS attacks against my site since it's a static blog with
minimal traffic.

</aside>

## Why I'm sticking with Eleventy

Astro is an opinionated tool, and I think especially for business use-cases this
is really helpful. Eleventy is a bit less opinionated and a bit more pluggable.

If it wasn't so tedious to maintain an RSS feed and keep consistent `<head>`
tags across various pages, I would consider the simplicity of "a huge folder of
HTML files" as my site's source format.

I won't claim that Eleventy is the most minimal possible static site generator
(SSG), but it is simpler than Astro. It's
[extremely fast](https://www.11ty.dev/docs/performance/#build-performance) and
just enough to get me where I need to be with my site.

## What I still want from Eleventy

The documentation for various features can be pretty lightweight. I recently saw
they added JSX support, but it's not especially documented besides a link out to
an external
[blog post from JetBrains](https://www.jetbrains.com/guide/javascript/tutorials/eleventy-tsx/)
that didn't really work out for me very well. Maybe one day I'll get motivated
and figure it out well enough to contribute to the official documentation.

Nunjucks doesn't seem especially well supported these days, but migrating to
Liquid was a horrible experience for me. Maybe I should play around with EJS?
All I really want is something that has a nice auto formatter and decent error
messages. Unfortunately there doesn't seem to be many tools that fit the bill,
but [Pug](https://pugjs.org) might, actually... I just don't like
indentation-based syntax lol.

## Saying "good enough"

I've been a professional web developer for over a decade, and I've been making
websites even longer than that. Sometimes my perfectionist side gets the best of
me and I want to use more complicated and powerful tools. But it's my personal
site: it should be fun!

## Further reading

[Which Generator builds Markdown the fastest?](https://www.zachleat.com/web/build-benchmark/#benchmark-results)
by Zach Leatherman

[Comparing Static Site Generator Build Times](https://css-tricks.com/comparing-static-site-generator-build-times/)
by Sean C Davis

[A List of Static Site Generators for Jamstack Sites](https://jamstack.org/generators/)
by Netlify
