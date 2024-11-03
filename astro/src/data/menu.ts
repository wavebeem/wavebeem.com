interface MenuItem {
  url: string;
  title: string;
}

const menu: MenuItem[] = [
  { url: "/", title: "Home" },
  { url: "/projects/", title: "Projects" },
  { url: "/contact/", title: "Contact info" },
  { url: "/blog/", title: "Blog" },
  { url: "/art/", title: "Art gallery" },
  { url: "/resume/", title: "Resume" },
  { url: "/about/", title: "About this site" },
  { url: "/uses/", title: "Things I use" },
  { url: "/links/", title: "Cool links" },
  { url: "/blog/tags/toybox/", title: "Toybox" },
  { url: "/shrines/", title: "Shrines" },
];

export default menu;
