// @ts-check

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
    mainUrl: "https://candiedreptile.club/bloglet/index.html",
    buttonUrl:
      "https://candiedreptile.club/bloglet/images/banners/karmabutton.gif",
    title: "Terrarium",
    localUrl: "",
  },
  {
    mainUrl: "https://algometric.pink/",
    buttonUrl: "https://algometric.pink/algobutton.gif",
    title: "algometric.pink",
    localUrl: "",
  },
  {
    mainUrl: "https://tati.codes/",
    buttonUrl: "https://tati.codes/static/tati.png",
    title: "Welcome to my garage!",
    localUrl: "",
  },
  {
    mainUrl: "https://illuminesce.net/",
    buttonUrl: "https://illuminesce.net/images/illuminesce_88x31.gif",
    title: "CJ | design & video games",
    localUrl: "",
  },
  {
    mainUrl: "https://mabbees.neocities.org/",
    buttonUrl: "",
    title: "mabbees",
    localUrl: "",
  },
  {
    mainUrl: "https://platinumtulip.net/",
    buttonUrl: "https://files.platinumtulip.net/88x31.png",
    title: "platinumtulip | digital artist",
    localUrl: "",
  },
  {
    mainUrl: "https://platinumtulip.garden/",
    buttonUrl: "https://platinumtulip.garden/img/gif/tulip88x31.gif",
    title: "platinumtulip | digital garden sanctuary",
    localUrl: "",
  },
  {
    mainUrl: "https://moonlitdecadence.neocities.org/",
    buttonUrl:
      "https://moonlitdecadence.neocities.org/site/88x31%20moonlit.png",
    title: "moonlit decadence",
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
  {
    title: "Damien Erambert",
    mainUrl: "https://erambert.me/",
    buttonUrl: "https://files.damien.zone/88x31_damien.png",
    localUrl: "",
  },
  {
    title: "aloe dot gay",
    mainUrl: "https://aloe.gay/",
    buttonUrl: "https://aloe.gay/contact/btn-bg.gif",
    localUrl: "",
  },
  {
    title: "RECCANTI's Chaos Site",
    mainUrl: "https://reccanti.art/",
    buttonUrl: "https://reccanti.art/_next/static/media/btn-smol.3299e405.gif",
    localUrl: "",
  },
  {
    title: "the melt zone",
    mainUrl: "https://meltknuckles.net/",
    buttonUrl: "https://meltknuckles.net/badges/meltknucklesbadge.gif",
    localUrl: "",
  },
  {
    title: "The web site of curilagann",
    mainUrl: "https://curilagann.neocities.org/",
    buttonUrl: "https://i.ibb.co/Fhspk6Q/ezgif-5-08c00de7f0.gif",
    localUrl: "",
  },
  {
    title: "Noctivagant",
    mainUrl: "https://noctivagant.net/",
    buttonUrl:
      "https://noctivagant.net/images/ribbons%20stuff/ribbonsbutton.png",
    localUrl: "",
  },
  {
    title: "easrng",
    mainUrl: "https://easrng.net/",
    buttonUrl: "https://badges.easrng.net/easrng.gif",
    localUrl: "",
  },
  {
    title: "Codarobo's Webzone",
    mainUrl: "https://codarobo.online/",
    buttonUrl:
      "https://staging.cohostcdn.org/attachment/d4d2b4a0-5958-47f6-9e62-5bd98cb7f4c5/88x31coda-big.png",
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

/** @type {CoolLink[]} */
export const allLinks = [
  ...siteButtons.map((b) => ({
    url: b.mainUrl,
    title: b.title,
  })),
  {
    url: "https://alainawastaken.neocities.org/",
    title: "ALAINA'S FUCK SPACE",
  },
  {
    url: "https://srxl.me/",
    title: "welcome | srxl.me",
  },
  {
    title: "Dracat",
    url: "https://drac.at/",
  },
  {
    title: "Site of Jill",
    url: "https://jillcrungus.com/",
  },
  {
    title: "Josh W. Comeau",
    url: "https://www.joshwcomeau.com/",
  },
  {
    title: "anhvn",
    url: "https://anhvn.com/",
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
    title: "Maddie Lim",
    url: "https://maddie.vision/",
  },
  {
    title: "erysdren's WWW site",
    url: "https://erysdren.me/",
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
