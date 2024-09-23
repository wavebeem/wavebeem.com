// @ts-check

/**
 * @typedef SiteButton
 * @prop {string} mainUrl
 * @prop {string} buttonUrl
 * @prop {string} localUrl
 * @prop {string} title
 */

/** @type SiteButton[] */
const siteButtons = [
  {
    mainUrl: "https://chostett.com/",
    buttonUrl: "https://chostett.com/images/illuminesce_88x31.gif",
    title: "illuminesce.",
    localUrl: "",
  },
  {
    mainUrl: "https://platinumtulip.garden/",
    buttonUrl: "https://platinumtulip.garden/img/gif/tulip88x31.gif",
    title: "platinumtulip | digital garden sanctuary",
    localUrl: "",
  },
  {
    mainUrl: "https://renkotsuban.com/",
    buttonUrl: "http://renkotsuban.com/button.gif",
    title: "Midnight Reading: Renkon's Personal Site",
    localUrl: "",
  },
  {
    mainUrl: "https://indietsushin.net/",
    buttonUrl: "https://indietsushin.net/button.gif",
    title:
      "インディー通信 Indie Tsushin: Highlighting indie games and developers from Japan!",
    localUrl: "",
  },
  {
    mainUrl: "https://milliesquilly.com/",
    buttonUrl:
      "https://milliesquilly.com/media/posts/42/responsive/millie-squilly-dot-com-button-2xl.png",
    title: "Millie Squilly Dot Com",
    localUrl: "",
  },
  {
    mainUrl: "https://zine.milliesquilly.com/",
    buttonUrl: "https://zine.milliesquilly.com/button.png",
    title: "zine of millie",
    localUrl: "",
  },
  {
    mainUrl: "https://froey.bearblog.dev/",
    buttonUrl:
      "https://bear-images.sfo2.cdn.digitaloceanspaces.com/froey/ellebutton.png",
    title: "Froey",
    localUrl: "",
  },
];

for (const siteButton of siteButtons) {
  const { hostname } = new URL(siteButton.mainUrl);
  const filename = `/buttons/${hostname}.gif`;
  siteButton.localUrl = filename;
}

export default siteButtons;
