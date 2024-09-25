/**
 * @typedef SiteButton
 * @prop {string} mainUrl
 * @prop {string} buttonUrl
 * @prop {string} localUrl
 * @prop {string} title
 */

/** @type {SiteButton[]} */
export const siteButtons = [
  {
    mainUrl: "https://chostett.com/",
    buttonUrl: "https://chostett.com/images/illuminesce_88x31.gif",
    title: "illuminesce.",
    localUrl: "",
  },
  {
    mainUrl: "https://mabbees.neocities.org/",
    buttonUrl: "",
    title: "mabbees",
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
    mainUrl: "https://cdrom.ca/",
    // TODO: It's a PNG...
    buttonUrl: "https://cdrom.ca/images/buttons/cdromjournal.png",
    title: "CD-ROM Journal",
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
    mainUrl: "https://lexfeathers.ca/",
    buttonUrl: "https://lexfeathers.ca/uploads/lexfeathers88x31.gif",
    title: "Lex Feathers - home",
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

siteButtons.sort((a, b) => a.title.localeCompare(b.title));

for (const siteButton of siteButtons) {
  const { hostname } = new URL(siteButton.mainUrl);
  const filename = `/buttons/${hostname}.gif`;
  siteButton.localUrl = filename;
}

/**
 * @typedef CoolLink
 * @prop {string} url
 * @prop {string} title
 */

export const allLinks = [
  ...siteButtons.map((b) => ({
    url: b.mainUrl,
    title: b.title,
  })),
  {
    title: "Josh W. Comeau",
    url: "https://www.joshwcomeau.com/",
  },
  {
    title: "anhvn",
    url: "https://anhvn.com/",
  },
  {
    title: "RECCANTI's Chaos Site",
    url: "https://reccanti.art/",
  },
  {
    title: "the melt zone",
    url: "https://meltknuckles.net/",
  },
  {
    title: "Nice Gear Games",
    url: "https://nicegear.games/",
  },
  {
    title: "wow, perfect!",
    url: "https://wowperfect.net/",
  },
  {
    title: "MADDIEBISCUITS ART",
    url: "https://madmaddiecomms.carrd.co/",
  },
  {
    title: "NotDiegues - Illustration",
    url: "https://itsnotdiegues.carrd.co/",
  },
  {
    title: "Shafer Brown Illustration",
    url: "https://www.shaferbrown.com/",
  },
  {
    title: "Noctivagant",
    url: "https://noctivagant.net/",
  },
  {
    title: "Maddie Lim",
    url: "https://maddie.vision/",
  },
  {
    title: "erysdren's WWW site",
    url: "https://erysdren.me/",
  },
  {
    title: "Damien Erambert",
    url: "https://erambert.me/",
  },
  {
    title: "2 Mello",
    url: "https://2mello.net/",
  },
  {
    title: "jneens web site",
    url: "https://jneen.net/",
  },
  {
    title: "eevee's fuzzy notepad",
    url: "https://eev.ee/",
  },
  {
    title: "Tyler Robertson",
    url: "https://www.atylerrobertson.com/",
  },
  {
    title: "AURAHACK",
    url: "https://aurahack.jp/",
  },
  {
    title: "goofpunk.com",
    url: "https://goofpunk.com/",
  },
  {
    title: "bunp dot com",
    url: "https://bunp.neocities.org/",
  },
  {
    title: "sproutsnout's garden",
    url: "https://sproutsnout.com/",
  },
  {
    title: "maya.land",
    url: "https://maya.land/",
  },
  {
    title: "meow.garden",
    url: "https://meow.garden/",
  },
  {
    title: "HUHIDK.DEV",
    url: "https://huhidk.dev/",
  },
  {
    title: "HJEOJEO.COM",
    url: "https://hjeojeo.com/",
  },
];

allLinks.sort((a, b) => a.title.localeCompare(b.title));
