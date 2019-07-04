---
title: "Mechanical Keyboards 201"
description: "Thinking beyond pre-built gear"
layout: post
---

## Introduction

- Who is this article for

This article is for people who have some familiarity with mechanical keyboards already. If not, you should read my first article, [Mechanical Keyboards 101][keebs101]. You might be considering building your own keyboard or trying out more niche hardware.

- Why not just use a pre-built?
- Nice cases, enthusiast switches, better build quality

There are a few main reasons you might want to build your own keyboard: it's a learning experience, you want to try hobbyist keyboard switches, or you want to try an obscure keyboard layout (small, split, etc).

- Rabbit hole, pricing, lack of TKL or full size options

Before we embark on this journey I do caution you that it is not without its perils. First of all, building custom keyboards and getting into niche hardware is an expensive hobby. It is also filled with "fear of missing out" (FOMO). Many things in this hobby are done as Group Buys (GB), where you pay to pre-order a product that may only ever get made once, if it doesn't get cancelled. Additionally, if you want to create a full size or tenkeyless keyboard, there are _very_ few custom options for those form factors.

## Jargon Dictionary

Here is a list of mechanical keyboards jargon words and what they mean

- Keeb
  - Short for keyboard, keeb is a fun word for talking about keyboards. You may also see "MK" for mechanical keyboard. I think keeb is more fun though.
- Stab
  - Stabilizers are often called stabs. They are used to keep long keys from becoming misaligned while typing.
- Lube
  - Lubricant is usually just called lube, and it's applied to stabilizers and key switches in order to make them smoother and quieter. It's generally a liquid or thin paste which fills in the rough surface on the metal or plastic pieces that are touching each other.
- MoQ (minimum order quantity)
  - The smallest order size a factory will take. Running a factory is hard work, and calibrating everything just to make a single keycap set is expensive. This number allows the factories to make a profit.
- GB (group buy)
  - This is a selling method usually used for custom keycaps. Keycaps are generally made in large factories, but such factories have high MoQs, so it's too expensive for one person to buy enough keycap sets to cover the MoQ themselves. With a group buy, many people online pre-order the keycaps (several months in advance), and if the MoQ is reached, eventually get their keycaps in the mail.
- IC (interest check)
  - Usually a Google Form, this is a survey about a potential group buy, in order to gauge interest and receive feedback (e.g. I really wish this keycap set supported my Ergodox, that shade of blue is not pretty, etc)
- QMK
  - This is the most common custom firmware for keyboards. It is written in C and hosted on GitHub. It is designed to be extensible so that new keyboards can be easily added to the QMK project, allowing the PCB to communicate with a computer as a keyboard.
- PCB (printed circuit board)
  - This is the "chip" that powers the keyboard, which all the components plug into.
- nippers
  - These are basically specialized pliers designed for cutting thin soft plastics and metals. Please do not use scissors instead.

## Parts of a Keyboard

- Case

This is the base of your keyboard. Either the PCB or the plate screws in to this piece in order to hold everything together. It usually has rubber feet to give it grip to keep from sliding. Cases also add weight to keep your keyboard solid and in place.

- PCB

This is the part that the key switches and USB cable plug in to. Some PCBs are very barebones and require soldering your own diodes and microcontroller in order to work, while others only require soldering switches, and the most convenient ones don't require a single drop of solder.

Technically this part can be replaced with handwiring, but you should look up how to do that yourself.

- Plate

Plates are generally sheets of aluminum with holes that key switches slot into. They are optional depending on your case, but can provide additional rigidity and weight to your build. That being said, they also complicate a build and make keyboard maintenance harder (especially if the switches are soldered on).

- Key switches

Most keyboards come stock with Cherry MX switches. If you are building your own, you can also use most Gateron or Kailh switches. These come in two varieties: PCB mount (also called 5-pin) and plate mount (also called 3-pin). If you are using a plate, you can generally use either. If you are not using a plate you _must_ use the PCB mount variety or else the switches will not align correctly.

- Stabilizers

Stabilizers are required for most keyboards. Keys are measured in "units", which are the width of alphabet keys. This is typically abbreviated as 1u, 1.5u, 2u, 6.25u, etc. Keys that are at least 2u wide require stabilizers (also called "stabs") to keep from tilting like a side-to-side. Most keyboards use "Cherry" stabilizers which mount directly to the PCB. Most keyboards have several 2u stabilizers and one 6.25u stabilizer for the spacebar.

Unfortunately, most stabilizers are poorly made. They usually rattle like a jar full of coins when pressed. Fortunately, a small bit of lube and nippers can fix stabilizers to be quiet and smooth. See the [stabilizer mod video][stabmod] by Taeha Types for instructions on how to do this.

- Lube

This is technically optional, but I highly recommend buying lube at least for your stabilizers if you build your own keyboard. It will make a huge difference in smoothness and volume. If you have the patience for it, you can also lube each switch in your board, as demonstrated in this [switch lube video][switchlube] by Taeha Types.

- Keycaps


## Kits & Builds

- Soldering vs Hotswap

The first decision you need to make when you're considering building your own keyboard is whether you want to solder or not. I was initially scared of soldering, but I promise you can learn it if you want to.

You can search for soldering tutorials yourself, but at the end of the day it's using a hot stick to melt metal and glue two things together. Don't be afraid, just treat it with respect and be careful.

That being said, solder-free builds can be really nice. They are typically made using boards that come with "hot swap sockets" preinstalled. These are basically a tight fitting hole that the plugs on the keyboard switches can fit snugly into, like a cable into a port. It's less durable than soldering, but way faster if you want to change things later.

- Simple solder-free plate-free build for easy maintenance and trial
  - <https://www.1upkeyboards.com/shop/controllers/1up-rgb-pcb-hse>
  - <https://www.1upkeyboards.com/shop/bases-and-cases/acrylic-60-base-frosted>
- More expensive hot swap
  - <https://kbdfans.cn/collections/diy-kit/products/kbdfans-dz60rgb-ansi-hot-swap-diy-kit>
- Cheaper 65%
  - <https://kbdfans.cn/collections/diy-kit/products/tada68-keyboard-diy-kit>
- Straightforward 40% option with minimal soldering
  - <https://www.1upkeyboards.com/shop/keyboard-kits/diy-40-kits/zlant-40-keyboard-kit>
- Good soldering tutorial macro pad
  - <https://www.1upkeyboards.com/shop/keyboard-kits/macro-pads/sweet-16-macro-pad-black>

## QMK

- What is it and why do I care

## Switches

- This is all extremely personal preference
- Gateron
- Kailh
- Plate mount vs PCB mount

## Niche Layouts

- 60%
  - TODO: KLE pic of ANSI 60%
  - TODO: KLE pic of ISO 60%
- 40%
  - TODO: KLE pic of MiniVan or similar
- ortholinear
  - TODO: KLE pic of Planck
- split
  - TODO: KLE pic of Let's Split

## Keycap Group Buys

- This is all extremely personal preference
- IC
- GB info

[keebs101]: /blog/2018/07/28/mechanical-keyboards-101/
[stabmod]: https://www.youtube.com/watch?v=cD5Zj-ZgMLA
[switchlube]: https://youtu.be/qSgPKPoFo2k?t=109
