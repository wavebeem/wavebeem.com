/**
 * @license MIT
 * @copyright Sage Fennel 2024
 * @see https://www.wavebeem.com/
 */
{
  const html = String.raw;
  const root = document.documentElement;
  const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

  function getSystemTheme() {
    return darkModeQuery.matches ? "dark" : "light";
  }

  function saveTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }

  class WavebeemThemeSelect extends HTMLElement {
    #abortController = new AbortController();

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      // Remove host element for layout purposes
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
      this.addEventListener(
        "change",
        (event) => {
          if (event.target instanceof HTMLSelectElement) {
            saveTheme(event.target.value);
            // Ensure the default option is selected
            event.target.value = "";
          }
        },
        { signal }
      );
      darkModeQuery.addEventListener(
        "change",
        () => {
          saveTheme(getSystemTheme());
        },
        { signal }
      );
      // Ensure the default option is selected
      const select = this.querySelector("select");
      if (select) {
        select.value = "";
      }
      addEventListener(
        "DOMContentLoaded",
        () => {
          const select = this.querySelector("select");
          if (select) {
            select.value = "";
          }
        },
        { signal }
      );
    }

    disconnectedCallback() {
      // Remove event listeners when disconnected
      this.#abortController.abort();
    }
  }

  saveTheme(localStorage.getItem("theme") || getSystemTheme());
  customElements.define("wavebeem-theme-select", WavebeemThemeSelect);
}
