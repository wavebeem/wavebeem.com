import {
  IconNavAbout,
  IconNavArt,
  IconNavBlog,
  IconNavExtras,
  IconNavHome,
  IconNavProjects,
  IconNavShrines,
} from "@/components/icons";

export interface MenuItem {
  title: string;
  url: string;
  icon: typeof IconNavHome;
}

export const groups: MenuItem[][] = [
  [
    { title: "Home", url: "/", icon: IconNavHome },

    { title: "Blog", url: "/blog/", icon: IconNavBlog },
    { title: "Art", url: "/art/", icon: IconNavArt },
    { title: "Projects", url: "/projects/", icon: IconNavProjects },

    { title: "About", url: "/about/", icon: IconNavAbout },
    { title: "Shrines", url: "/shrines/", icon: IconNavShrines },
    { title: "Extras", url: "/extras/", icon: IconNavExtras },
  ],
];
