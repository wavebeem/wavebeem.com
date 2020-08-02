window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}

gtag("js", new Date());

if (
  true ||
  window.location.hostname === "mockbrian.com" ||
  window.location.hostname === "www.mockbrian.com"
) {
  gtag("config", "UA-52704502-1");
  window.gtag = gtag;
} else {
  window.gtag = console.log.bind(console, "gtag");
}
