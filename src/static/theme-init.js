{
  const stored = localStorage.getItem("theme") || "auto";
  const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");
  let theme = stored;
  if (theme === "auto") {
    theme = darkModeQuery.matches ? "dark" : "light";
  }
  document.documentElement.dataset.theme = theme;
}
