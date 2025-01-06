// @ts-check

/**
 * @typedef MenuItem
 * @prop {string} url
 * @prop {string} title
 */

/** @type {MenuItem[]} */
export const main = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/about/",
    title: "About",
  },
  {
    url: "/blog/",
    title: "Blog",
  },
  {
    url: "/art/",
    title: "Art",
  },
];

/** @type {MenuItem[]} */
export const more = [
  {
    url: "/resume/",
    title: "Resume",
  },
  {
    url: "/links/",
    title: "Links",
  },
  {
    url: "/contact/",
    title: "Contact",
  },
  {
    url: "/projects/",
    title: "Projects",
  },
  {
    url: "/toybox/",
    title: "Toybox",
  },
  {
    url: "/uses/",
    title: "Things I use",
  },
  {
    url: "/credits/",
    title: "Credits",
  },
  {
    url: "/shrines/",
    title: "Shrines",
  },
  {
    url: "/past-designs/",
    title: "Past designs",
  },
];

/** @type {MenuItem[]} */
export const all = [...main, ...more];
