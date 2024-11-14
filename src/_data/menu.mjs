// @ts-check

// https://github.com/microsoft/fluentui-emoji

/**
 * @typedef MenuItem
 * @prop {string} url
 * @prop {string} title
 * @prop {string} image
 */

/** @type {MenuItem[]} */
const menu = [
  {
    url: "/",
    title: "Home",
    image: "/icons/home.svg", // 🏠
  },
  {
    url: "/projects/",
    title: "Projects",
    image: "/icons/projects.svg", // 💻
  },
  {
    url: "/contact/",
    title: "Contact info",
    image: "/icons/contact.svg", // 📬
  },
  {
    url: "/blog/",
    title: "Blog",
    image: "/icons/blog.svg", // ✍️
  },
  {
    url: "/art/",
    title: "Art gallery",
    image: "/icons/art.svg", // 🎨
  },
  {
    url: "/resume/",
    title: "Resume",
    image: "/icons/resume.svg", // 📋
  },
  {
    url: "/about/",
    title: "About this site",
    image: "/icons/about.svg", // ℹ️
  },
  {
    url: "/uses/",
    title: "Things I use",
    image: "/icons/uses.svg", // 🧰
  },
  {
    url: "/links/",
    title: "Cool links",
    image: "/icons/links.svg", // 🔗
  },
  {
    url: "/toybox/",
    title: "Toybox",
    image: "/icons/toybox.svg", // 🧸
  },
  {
    url: "/shrines/",
    title: "Shrines",
    image: "/icons/shrines.svg", // ⛩️
  },
];

export default menu;
