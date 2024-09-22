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
];

for (const siteButton of siteButtons) {
  const hostname = new URL(siteButton.buttonUrl).hostname;
  const filename = `/buttons/${hostname}.gif`;
  siteButton.localUrl = filename;
}

export default siteButtons;
