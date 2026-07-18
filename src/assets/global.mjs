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

// Theme selector (light/dark/auto), remembered in localStorage
{
  const storageKey = "theme";
  const html = String.raw;
  const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

  const lightModeColor =
    document.querySelector(
      `meta[name="theme-color"][media="(prefers-color-scheme: light)"]`,
    )?.content ?? "";
  const darkModeColor =
    document.querySelector(
      `meta[name="theme-color"][media="(prefers-color-scheme: dark)"]`,
    )?.content ?? lightModeColor;

  const getStoredTheme = () => localStorage.getItem(storageKey) || "auto";
  const getSystemTheme = () => (darkModeQuery.matches ? "dark" : "light");

  function getResolvedTheme() {
    const stored = getStoredTheme();
    return stored === "auto" ? getSystemTheme() : stored;
  }

  // Apply the current theme to the root element for CSS purposes, and
  // update the mobile browser-chrome color to match.
  function applyTheme() {
    const resolved = getResolvedTheme();
    root.dataset.theme = resolved;
    const themeColorMeta = document.querySelector(`meta[name="theme-color"]`);
    if (themeColorMeta) {
      themeColorMeta.content = resolved === "dark" ? darkModeColor : lightModeColor;
    }
  }

  class WavebeemThemeSelect extends HTMLElement {
    #abortController = new AbortController();

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      // Remove host element from CSS layout
      this.shadowRoot.innerHTML = html`
        <style>
          :host {
            display: contents;
          }
        </style>
        <slot></slot>
      `;
    }

    connectedCallback() {
      this.#abortController = new AbortController();
      const { signal } = this.#abortController;

      const select = this.querySelector("select");
      if (select) {
        select.value = getStoredTheme();
      }

      // Listen for `<select>` changes and save the new theme selected
      this.addEventListener(
        "change",
        (event) => {
          if (event.target instanceof HTMLSelectElement) {
            localStorage.setItem(storageKey, event.target.value);
            applyTheme();
          }
        },
        { signal },
      );

      // Re-apply the resolved theme when the system theme changes, in case
      // the user's stored preference is "auto"
      darkModeQuery.addEventListener("change", applyTheme, { signal });
    }

    disconnectedCallback() {
      this.#abortController.abort();
    }
  }

  customElements.define("wavebeem-theme-select", WavebeemThemeSelect);

  applyTheme();
}

// Apply theme parameters to the document (debug override, wins over
// localStorage/system, e.g. `?theme=dark`)
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
    } else {
      $(".nav-menu").showModal();
      event.preventDefault();
    }
  });
}

// Close the nav menu dialog when clicking its backdrop (native <dialog>
// doesn't do this on its own; Escape and the in-dialog close button already
// work natively)
$(".nav-menu").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    event.currentTarget.close();
  }
});

// TEMP DEBUG, REMOVE BEFORE COMMIT: ?menu=open
if (search.get("menu") === "open") {
  $(".nav-menu").showModal();
}
