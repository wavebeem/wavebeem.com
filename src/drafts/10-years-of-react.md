---
title: "10 years of React"
description:
  "After a decade of React's influence on the front end web development space
  (and more!), how do I feel about it?"
tags:
  - "programming"
  - "javascript"
  - "react"
  - "essay"
  - "web"
---

_Originally posted 2023 May 23 on Cohost._

warning: longpost incoming

## a quick note

> i'm reflecting on 10 years of react here, good and bad. i want to be 100%
> clear that i've been a web developer professionally for over 10 years as well,
> and i deeply love the web. do not show up in the comments assuming i hate the
> modern web like so many nerds on this site love to do loudly and frequently.
> yes, a lot of things stink about the modern web, but a lot of things are super
> cool about it too. also, this is not the time or place to discuss that. i'm
> also not interested in discussing electron or native app development. oh, and
> if you think "javascript was a mistake" or some other hot take, keep
> scrolling. please do not try to change the subject here as i'm not interested
> in discussing that with most people.

## it seemed so cool

i remember back in like... 2014 when i was first looking into react, i was quite
excited. besides the initial surprise of jsx syntax, it really seemed so cool to
me.

## what are they up to now?

react's public release turns 10 years old this month, and it's wild to think
about its rise to power. a purely frontend js library is not spending absurd
amounts of effort to somehow increase its backend performance, i guess. i'm not
really up to speed on server components, and i'm still reeling with the fact
that they rely on javascript string "pragmas" like `"use strict";` all over
again 🙃

## how about jsx

at this point the jsx problem is moot. like sure it's still not part of the
official JS grammar, and likely never will be due to the strange ambiguity of
what the jsx function is in any given scope being a nightmare, but the tooling
is certainly here a decade later and it provides unparalleled type safety and
refactoring for your "templates", in my experience.

## bundle size

it's interesting to see preact exist at literally 10% the size of react, while
maintaining all the most important features (opinion!). it's been wild to see
the rise of next.js as the de-facto fullstack js framework.

## lasting impact from react

it feels to me like react finally put the MVC (model view controller) pattern to
rest for frontend libraries for the most part. i think the web dev community has
gotten less precious about having a million tiny files that each do almost
nothing, resulting in a web of confusing awful code.

the component model chooses to slice code in a different direction, one that i
think makes it easier to make the kinds of changes we want to do more often, and
increases discoverability of code.

it also feels like react really pushed js even further toward functional
programming, or at least state without direct mutation. js + react is nowhere
near as pure as like elm for example, but it's honestly surprising how much
react moved the needle here.

## a not-so-stable target

it's been wild to watch as react has never really come off their initial release
cycle. back when the framework was 0.x, they just released huge changes
constantly. i expected some stability when they finally broke past 0.x, but no,
they just release new major versions all the time. oh and they still don't
correctly support web components! i blame react's popularity and refusal to
reinvent their shitty event system with the absurdly delayed adoption of web
components. like no they're not perfect but react is definitely hurting the
situation.

## jsx is cool

i remember having to learn sooo many templating languages. i won't lie and say
jsx isn't a templating language, but critically it's an embedded templating
language. allowing us to use the host language (js) gives us so much power, and
frankly colocating the html and js together is a huge boon for understanding how
a lot of stuff ticks.

i also love that jsx has a strict syntax unlike html. jsx is the dream of xhtml
for html, to some extent. i want unclosed tags to be a compile error, dangit!
and i finally get that here. i'm sure other frontend frameworks have probably
figured it out with extra tooling here and there, but i love that i get
immediate obvious feedback about these issues with jsx and always have.

also, shout out to mithril js for doing the jsx thing before jsx with their
awesome `m` function. that was cool and way ahead of its time. it inspired me to
write about [react sans jsx](/blog/2017/react-without-jsx/).

## what about css-in-js

i'm so tired of hearing that react forces or even encourages you to use
css-in-js. it does not!! i think it might be a natural conclusion to react's
enforcement of colocating js and html, but it's not required. i remember feeling
pure disgust when i initially saw css-in-js. then it evolved a bit and i saw
emotion for js. this was actually highly useful on a library project i made at
work. i loved it for that. and i allowed it to be adopted on our main site. and
i quickly saw how it sucked in a larger context and in a mixed context with some
regular css and some css-in-js. and the tooling is still annoying.

at this point, though, with ubiquitous access to css custom properties, the
massively more powerful than css-in-js and natively browser supported feature,
there's really no need to use these libraries. i want to see us go back to basic
css and use custom properties when we need runtime values. for everything else,
`data-*` attributes are fantastic for styling hooks. i'll admit though that in
larger code bases it is nice to have some automatic namespacing via something
like css modules, since it's hard to trust many engineers at scale to carefully
manage a global namespace like css.

## remember class components

it's so wild thinking about how react is so old that it originally used class
components before js even had native classes. and their own class creation
helper function allowed mixins! something that modern js classes do not support
directly. i kinda hate mixins because they're too hard to understand and don't
encapsulate well. that being said, there was a simplicity to class components
with the named lifecycle methods and the ability to use `this.state` as a simple
reference to updated state, even when dealing with nasty async/event stuff. and
if you ever _wanted_ stale data on purpose, it was easy to copy that state to
variables you captured via closure.

anyway, i'm not surprised that react ditched mixins, but it's a bummer that
hooks took so long to show up as their replacement.

## react hooks

i blame the design of react hooks for countless programming errors. the authors
of that feature clearly assumed that the common react programmer wouldn't
absolutely buckle under the weight of understanding and working with variable
closures in async and event handler contexts. i think they were wrong to make
that bet. other frameworks like vue have taken that idea and run with them. in
particular im excited about solid.js which takes inspiration from knockout.js's
observables, which are still my favorite reactivity system i've used.

something about hooks just strikes me as a programmer feeling very clever about
themselves. react function components were already weird but i guess technically
they were state free and actually _were_ functions. but now functions are
actually classes in disguise, and jeez they were not built for that. there's a
lot to be said about object oriented programming and how variable closure with
record interfaces is analogous to classes and instances and whatnot, though
that's not what's happening here. react just manages a secret state for you that
it injects. oh yeah, like angular 1.x! remember how confusing that was. first js
library i absolutely struggled to wrap my head around haha.

## remember when it "wasn't accessible"?

i remember folks blaming react for not being accessible because it "forces you
to use divs", which was genuinely hilarious. like yes for a long time every
component had to return a dom element, such as a div, as the root... but nobody
was forcing you to use components in a certain way! also, to my knowledge,
adding extra divs rarely impacts accessibility, as long as you're not adding
them in invalid places that will mess up your markup, like as children of a
`<ul>` for example. don't do that.

## we use react too much

i think it's a bummer we all use react as much as we do. there are lots of good
options for web development. and i miss server-side html. i'm glad that next.js
is helping us go back to that direction sneakily while letting us keep our
react. though i think the design of react as a fullstack framework feels kinda
sus. i realize this is a hard problem, though. i know a lot of people want a
return to progressive enhancement, where js only adds some sprinkles on top of a
fully server side html-based form-based website. i think that's good and well in
theory, and it does make your system more resilient, but frankly people expect
web apps nowadays, not websites. half the stuff i've seen people complain about
on cohost are because it isn't app-y enough. we want js modals rather than full
page refreshes. we want to share and scroll at the same time. we want to like
and cruise by. and frontend js is how you do that, period. full page refreshes
are a bummer. but still, we use react too much. hopefully we can see a future
where less and less js is shipped unnecessarily to the browser, but like,
capitalism.

## haha this post is about capitalism now!

ok so i wanna be clear that like a lot of what people hate about the web is not
because web developers are morons or lazy or whatever but that the software we
use is made under capitalism. i care so fucking much, and i'm constantly
divorced from my ability to improve things because economically it's not worth
it. you realize that accessibility isn't prioritized because it's cheaper to pay
off the occasional lawsuit than it is to spend more engineering hours fixing it,
right? it sucks, but capitalists will view everything as a financial
spreadsheet, and not as a moral choice. "nobody got fired for using jira" is now
true for react as well. you know how easy it is to hire someone with react
experience? everyone knows it now. hiring employees that already know a lot
about your tech stack cuts down on onboarding, which is the period where new
employees make the least revenue for you, thus costing you the most money.
companies that use less popular technology have to settle for on the job
training, mostly. imo it's not a huge deal and most good developers will pick up
the new skills easily if they're not extremely brand new, but also not everyone
is a good developer, and businesses still want to minimize risk.
