/**
 * @license MIT
 * @copyright Sage Fennel 2024
 * @see https://www.wavebeem.com/
 */

// Change this if you want to use a different localStorage key
const storageKey = "theme";

function $(selector, element = document) {
  return element.querySelector(selector);
}

const html = String.raw;

const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

const themeColorElement = $(`meta[name="theme-color"]`);
const lightModeColor = $(`meta[name="theme-color"]`)?.content ?? "";
const darkModeColor =
  $(`meta[name="theme-color"][media="(prefers-color-scheme: dark)"]`)
    ?.content ?? lightModeColor;

// Get the current system theme
function getSystemTheme() {
  return darkModeQuery.matches ? "dark" : "light";
}

// Apply the current theme to the root element for CSS purposes
function applyTheme() {
  let computedTheme = localStorage.getItem(storageKey);
  if (!computedTheme || computedTheme === "auto") {
    computedTheme = getSystemTheme();
  }
  document.documentElement.dataset.theme = computedTheme;
  if (themeColorElement) {
    themeColorElement.content =
      computedTheme === "dark" ? darkModeColor : lightModeColor;
  }
}

export class WavebeemThemeSelect extends HTMLElement {
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
    // Use this to remove event listeners if disconnected
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;

    // Listen for `<select>` changes and save the new theme selected
    this.addEventListener(
      "change",
      (event) => {
        if (event.target instanceof HTMLSelectElement) {
          localStorage.setItem(storageKey, event.target.value);
          applyTheme();
          // Ensure the default option is selected
          event.target.value = "";
        }
      },
      { signal }
    );
    // Re-apply theme when system theme changes
    darkModeQuery.addEventListener(
      "change",
      () => {
        applyTheme();
      },
      { signal }
    );
    // Ensure the default option is selected
    const select = this.querySelector("select");
    if (select) {
      select.value = "";
    }
  }

  disconnectedCallback() {
    // Remove event listeners when disconnected
    this.#abortController.abort();
  }
}

customElements.define("wavebeem-theme-select", WavebeemThemeSelect);

// Restore theme on load
applyTheme();
