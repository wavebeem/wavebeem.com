---
date: "2025-05-10"
title: >-
  CSS Obfuscation and Userstyles
description: >-
  HTML is not an API for site visitors; do not expect stability. The days of
  userstyles are essentially over, and they're not likely to come back.
---

## Why I'm Writing This

I was initially writing this post for the new defunct website
[Cohost](https://cohost.org). This topic came up a _lot_ in my circles on that
website, and I still want to publish my thoughts even though the site is gone.

## What are Userstyles

Userstyles are CSS stylesheets supplied by the user's web browser, rather than
the website being visited. These stylesheets are applied after the website's
styles, with the intention of overriding the rules and changing the look of a
website.

Basic userstyles will often do things like hide annoying or distracting UI
elements:

```css
.autoplaying-video,
.stories,
.promoted-content,
.advertisement {
  display: none;
}
```

You could even hack a low-budget dark mode with a few lines of code:

```css
/* Invert the colors but return the hues back to the original color */
html {
  filter: invert(1) hue-rotate(180deg);
}

/* This filter is its own inverse, so applying it again removes it.
 * Useful since you can't remove the cascading effect of a filter.
 */
img {
  filter: invert(1) hue-rotate(180deg);
}
```

These custom styles are used to tailor a website's appearance to a user's
preferences. I want to stress that I'm extremely sympathetic to this desire. I
have a long history of making custom themes, and I'm extremely picky about UIs.
But even the nicest markup still requires ongoing support from the userstyle
author to respond to changes in the page structure.

## Userstyles Range From Easy to Impossibly Hard to Maintain

In the early days of CSS, it was more common to see readable class names like
`button` or `accordion` or `checkbox-label`. With modern technologies like
[CSS modules](https://github.com/css-modules/css-modules) or CSS-in-JS (e.g.
[Emotion](https://emotion.sh/docs/introduction),
[styled-components](https://styled-components.com)), class names often come out
looking like `MyReactComponent-sectionName-213abe` or `css-126eaf89`. While the
first class could be selected via `[class*="MyReactComponent-sectionName"]`,
targeting the second is like trying to build your house on quicksand.

I've seen some extremely bizarre reactions to these class names from people who
I assume have never used these tools. I've seen a reaction of calling this _CSS
obfuscation_. While the second example does completely obscure the meaning, this
is not the reason anyone reaches for these tools. HTML and CSS operate entirely
within a page global namespace. Global namespaces are really hard to deal with,
and only get harder as you add more developers and more lines of code to a
project. By using tools that keeps specificity consistent, and never
mixing-and-matching CSS classes from different "components" together, we can
write code with styles that are unlikely to break just because we changed code
in a different file.

I'm not a fan of CSS-in-JS for many reasons, but CSS Modules offers similar
benefits without sacrificing performance.

## It's Not Personal

I'd wager that unless an obfuscated class name shows up only on a malicious UI
element (e.g. an advertisement or a dialog gating access to a page), that
chances are there's zero malicious intent behind using it.

I've been in the web development industry for a dozen years now and I can tell
you that precisely zero people on any of my teams have ever discussed the
possibility of site visitors writing or using userstyles. Web developers aren't
trying to stop you from doing anything here. I doubt most developers have even
_heard_ of userstyles plugins like Stylus or Stylish ever. And the ones that
have certainly aren't pushing for the sites they work on to be conducive to
this.

## CSS Zen Garden was 10 Billion Years Ago

If you weren't around for [CSS Zen Garden](https://csszengarden.com) in its
moment, the idea was one static HTML page that users would submit fully custom
replacement CSS stylesheets for.

_I've collapsed the example images because they're quite large. Open them if you
dare._

<details>
  <summary>
    <em>Show CSS Zen Garden #1</em>
  </summary>
  <p>
    <img
      src="./assets/zen1.webp"
      loading="lazy"
      width="2624"
      height="6500"
    />
  </p>
</details>

<details>
  <summary>
    <em>Show CSS Zen Garden #2</em>
  </summary>
  <p>
    <img
      src="./assets/zen2.webp"
      loading="lazy"
      width="2624"
      height="7118"
    />
  </p>
</details>

<details>
  <summary>
    <em>Show CSS Zen Garden #3</em>
  </summary>
  <p>
    <img
      src="./assets/zen3.webp"
      loading="lazy"
      width="2624"
      height="11516"
    />
  </p>
</details>

This was an amazing creative outlet for CSS coders to show their problem solving
abilities (you can't change the HTML) and design skill all in one go. But this
is nothing like modern web development in my experience. Everything has shifted
so far towards React, component oriented design, non-global CSS styling, and
JS-based design systems. Yeah, I'm sure there's a bias here in that I've
primarily worked on _web apps_ more than _web sites_ (if you want to make such a
distinction---[something I've ranted about in the past](/blog/2023/the-web-is-an-app-platform/)),
but it seems like web app development tools are increasingly being used even for
simple relatively static websites these days.

## And Then There's Tailwind

Call me a hipster, but I was using [Tailwind](https://tailwindcss.com) before it
was Tailwind. I used [Tachyons](https://tachyons.io) for years on a few of my
sites, and I really liked it for rapidly prototyping things. It works really
well for the "component age" of web development. Repeating these obnoxious class
names outside of an aggressively componentized system would be error prone and
obnoxious, to be clear. Granted I've seen how organizationally Tailwind code
bases become a total nightmare to read, and I worry that Tailwind's popularity
and culture is just another extension of the "CSS is women's work" vibe and the
increasing backendification of frontend development. But whether you like it or
not, Tailwind is everywhere these days. While the selectors might be slightly
more stable than CSS-in-JS... they are also substantially less unique.

```css
.flex.h-6.items-end.px-2.font-mono.text-xs\/6.whitespace-pre.text-black\/20.max-sm\:px-4.sm\:h-10.dark\:text-white\/25 {
  /* AGH this is horrible... but which classes should I target?
   * None of them are about what I want to select...
   * just its appearance today in this exact moment.
   */
}
```

## About Cohost

I was an active user on [Cohost](https://cohost.org), a website filled with
indie web nerds and the ability to put custom HTML with inline styles in your
posts. Many users on this site enthusiastically created and shared their own
userstyles for it. But since Cohost used Tailwind, it was pretty hard to do this
reliably. The only saving grace was that the Cohost team was so small that
frontend code didn't change often enough to severely break many themes. I saw a
lot of maladjusted weirdos on that site hand wringing about evil developers who
obfuscate their CSS or use "inaccessible technologies" like Tailwind (??? there
is no basis for that lmao, userstyles are not any kind of accessibility
requirement). But I've also seen weird cries online about how having extra
`<div>`s on your site hurts accessibility. Yes, `<div>` soup (excessive use of
`<div>` instead of semantic HTML like `<h2>` and `<section>` and `<nav>`) can
make your page harder to navigate for assistive technologies, nothing is quite
so clear cut as these haters wanted to make it out to be.

## Conclusion

I mourn the era of simpler technology and more user control as much as the next
person, but as a developer I can clearly see why this unmaintainable endeavour
has only become more arduous. My hope is that the talented CSS wizards out there
making userstyles can find another outlet for their skills, like making their
own personal sites that look awesome :)
