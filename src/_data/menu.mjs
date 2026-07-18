// @ts-check

/**
 * @typedef MenuItem
 * @prop {string} title
 * @prop {string} url
 */

/** @type {MenuItem[][]} */
export const groups = [
  [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog/" },
    { title: "Art", url: "/art/" },
  ],
  [
    { title: "About", url: "/about/" },
    { title: "Projects", url: "/projects/" },
    { title: "Resume", url: "/resume/" },
    { title: "Contact", url: "/contact/" },
  ],
  [
    { title: "Toybox", url: "/toybox/" },
    { title: "Shrines", url: "/shrines/" },
    { title: "Things I use", url: "/uses/" },
    { title: "Past designs", url: "/past-designs/" },
    { title: "Credits", url: "/credits/" },
    { title: "Links", url: "/links/" },
  ],
];
