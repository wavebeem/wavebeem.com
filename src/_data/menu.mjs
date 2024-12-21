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
  {
    url: "/resume/",
    title: "Resume",
  },
  {
    url: "/links/",
    title: "Links",
  },
];

/** @type {MenuItem[]} */
export const more = [
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
    url: "/shrines/",
    title: "Shrines",
  },
  {
    url: "/credits/",
    title: "Credits",
  },
];

/** @type {MenuItem[]} */
export const all = [...main, ...more];
