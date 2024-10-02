const html = String.raw;
const css = String.raw;

const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

function getQueryTheme() {
  return darkModeQuery.matches ? "dark" : "light";
}

const root = document.documentElement;

root.dataset.theme = localStorage.getItem("theme") || getQueryTheme();
localStorage.setItem("theme", root.dataset.theme);

class ThemeSelect extends HTMLElement {
  #abortController = new AbortController();

  #css = css`
    :host {
      display: contents;
    }
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html`<style>
        ${this.#css}</style
      ><slot></slot>`;
  }

  connectedCallback() {
    const { signal } = this.#abortController;
    this.style.display = "contents";
    this.querySelector("select").value = "";
    this.addEventListener(
      "change",
      (event) => {
        if (event.target instanceof HTMLSelectElement) {
          root.dataset.theme = event.target.value;
          localStorage.setItem("theme", root.dataset.theme);
          event.target.value = "";
        }
      },
      { signal }
    );
    darkModeQuery.addEventListener(
      "change",
      () => {
        root.dataset.theme = darkModeQuery.matches ? "dark" : "light";
        localStorage.setItem("theme", root.dataset.theme);
      },
      { signal }
    );
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }
}

customElements.define("theme-select", ThemeSelect);
