const url = new URL(location.href);
const theme = url.searchParams.get("theme");
if (theme) {
  document.documentElement.dataset.theme = theme;
}
