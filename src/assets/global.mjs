function $(selector, root = document) {
  const element = root.querySelector(selector);
  if (!element) {
    throw new Error(`couldn't find ${selector}`);
  }
  return element;
}

function $$(selector, root = document) {
  return root.querySelectorAll(selector);
}

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

for (const hamburg of $$(".hamburger")) {
  hamburg.addEventListener("click", (event) => {
    if (hamburg.dataset.action === "back") {
      const url = new URL(document.referrer, "https://fake.example");
      if (url.hostname === location.hostname) {
        history.back();
        event.preventDefault();
      }
    }
  });
}
