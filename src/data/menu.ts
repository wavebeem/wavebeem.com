export interface MenuItem {
  title: string;
  url: string;
}

export const groups: MenuItem[][] = [
  [
    { title: "Home", url: "/" },

    { title: "Blog", url: "/blog/" },
    { title: "Art", url: "/art/" },
    { title: "Projects", url: "/projects/" },

    { title: "About", url: "/about/" },
    { title: "Shrines", url: "/shrines/" },
    { title: "Extras", url: "/extras/" },
  ],
];
