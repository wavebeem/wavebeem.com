const root = document.documentElement;
const search = new URLSearchParams(location.search);

// Apply theme parameters to the document
{
  const url = new URL(location.href);
  const theme = url.searchParams.get("theme");
  if (theme) {
    root.dataset.theme = theme;
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
    "saturday",
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
  addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }
    const img = event.target.closest("img");
    const parent = img?.closest("figure") || img?.closest("p");
    const anchor = img?.closest("a");
    if (!(img && parent && !anchor)) {
      return;
    }
    event.preventDefault();
    location.href = img.src;
  });
}

if (search.get("sticky") === "auto") {
  const y = [];
  const header = document.querySelector("header.header");
  const headerHeight = header.clientHeight;
  addEventListener(
    "scroll",
    () => {
      y.unshift(root.scrollTop);
      const isNearTop = y[0] < headerHeight;
      const maxData = 2;
      // TODO: Require more scrolling data so it it isn't jumpy on mobile, or
      // something...
      y.length = Math.min(y.length, maxData);
      const insufficientData = y.length < maxData;
      const isScrollingUp = y
        .slice(0, maxData - 1)
        .every((_, i) => y[i] < y[i + 1]);
      root.dataset.sticky = insufficientData || isNearTop || isScrollingUp;
    },
    { passive: true },
  );
}

if (search.get("sticky") === "fixed") {
  root.dataset.sticky = "";
}
