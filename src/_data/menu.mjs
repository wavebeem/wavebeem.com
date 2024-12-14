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
    image: "/icons/home.webp", // 🏠
  },
  {
    url: "/blog/",
    title: "Blog",
    image: "/icons/blog.webp", // ✍️
  },
  {
    url: "/art/",
    title: "Art",
    image: "/icons/art.webp", // 🎨
  },
  {
    url: "/contact/",
    title: "Contact",
    image: "/icons/contact.webp", // 📬
  },
  {
    url: "/projects/",
    title: "Projects",
    image: "/icons/projects.webp", // 💻
  },
  {
    url: "/resume/",
    title: "Resume",
    image: "/icons/resume.webp", // 📋
  },
  {
    url: "/links/",
    title: "Links",
    image: "/icons/links.webp", // 🔗
  },
  {
    url: "/toybox/",
    title: "Toybox",
    image: "/icons/toybox.webp", // 🧸
  },
];

export default menu;
