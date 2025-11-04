const root = document.documentElement;

// Apply theme parameters to the document
{
  const url = new URL(location.href);
  const theme = url.searchParams.get("theme");
  if (theme) {
    document.documentElement.dataset.theme = theme;
  }
}

// Add date information to document
{
  const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];
  const date = new Date();
  root.dataset.year = date.getFullYear();
  root.dataset.month = date.getMonth() + 1;
  root.dataset.date = date.getDate();
  root.dataset.day = weekdays[date.getDay()];
}

// Enable JS figure image viewer
{
  root.dataset.figureViewer = "";
  /**
   * @param {PointerEvent} event
   */
  function handler(event) {
    if (!(event.target instanceof Element)) {
      return;
    }
    const img = event.target.closest("img");
    const figure = img?.closest("figure");
    const anchor = img?.closest("a");
    if (!(img && figure && !anchor)) {
      return;
    }
    if (!(event.button === 0 || event.button === 1)) {
      return;
    }
    const wantsNewTab =
      event.shiftKey || event.metaKey || event.ctrlKey || event.button === 1;
    event.preventDefault();
    if (wantsNewTab) {
      window.open(img.src, "_blank");
    } else {
      location.href = img.src;
    }
  }
  addEventListener("click", handler);
  addEventListener("auxclick", handler);
}
