// date attributes on <html>, for CSS/print rules that key off them
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
  const root = document.documentElement;
  root.dataset.year = String(date.getFullYear());
  root.dataset.month = String(date.getMonth() + 1);
  root.dataset.date = String(date.getDate());
  root.dataset.day = weekdays[date.getDay()];
}

// click a figure/paragraph image to open it full-size
{
  document.documentElement.dataset.figureViewer = "";
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

// mobile hamburger nav-menu dialog
{
  const navMenu = document.querySelector(".nav-menu");
  if (navMenu) {
    for (const hamburger of document.querySelectorAll(".hamburger")) {
      hamburger.addEventListener("click", () => {
        navMenu.showModal();
      });
    }

    // Close on backdrop click (native <dialog> doesn't do this on its own;
    // Escape and the in-dialog close button already work natively).
    navMenu.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        navMenu.close();
      }
    });
  }
}

// <wavebeem-theme-select> custom element
{
  const storageKey = "theme";
  const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");

  const lightModeColor =
    document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
    )?.content ?? "";
  const darkModeColor =
    document.querySelector(
      'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
    )?.content ?? lightModeColor;

  const getStoredTheme = () => localStorage.getItem(storageKey) || "auto";
  const getSystemTheme = () => (darkModeQuery.matches ? "dark" : "light");

  function getResolvedTheme() {
    const stored = getStoredTheme();
    return stored === "auto" ? getSystemTheme() : stored;
  }

  function applyTheme() {
    const resolved = getResolvedTheme();
    document.documentElement.dataset.theme = resolved;
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.content =
        resolved === "dark" ? darkModeColor : lightModeColor;
    }
  }

  class WavebeemThemeSelect extends HTMLElement {
    #abortController = new AbortController();

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = `<slot></slot>`;
    }

    connectedCallback() {
      this.#abortController = new AbortController();
      const { signal } = this.#abortController;

      const trigger = this.querySelector(".theme-select-trigger");
      const dialog = this.querySelector(".theme-select-dialog");
      const doneButton = this.querySelector(".theme-select-done");
      const options = [...this.querySelectorAll(".theme-select-option")];

      const syncOptions = () => {
        const current = getStoredTheme();
        for (const option of options) {
          option.setAttribute(
            "aria-pressed",
            String(option.dataset.theme === current),
          );
        }
      };

      trigger.addEventListener(
        "click",
        () => {
          syncOptions();
          dialog.showModal();
          options
            .find((option) => option.dataset.theme === getStoredTheme())
            ?.focus();
        },
        { signal },
      );

      for (const option of options) {
        option.addEventListener(
          "click",
          () => {
            localStorage.setItem(storageKey, option.dataset.theme);
            applyTheme();
            syncOptions();
          },
          { signal },
        );
      }

      doneButton.addEventListener("click", () => dialog.close(), { signal });

      dialog.addEventListener(
        "click",
        (event) => {
          if (event.target === event.currentTarget) {
            dialog.close();
          }
        },
        { signal },
      );

      darkModeQuery.addEventListener("change", applyTheme, { signal });
    }

    disconnectedCallback() {
      this.#abortController.abort();
    }
  }

  customElements.define("wavebeem-theme-select", WavebeemThemeSelect);

  applyTheme();

  // Debug override, wins over localStorage/system, e.g. `?theme=dark`.
  {
    const theme = new URL(location.href).searchParams.get("theme");
    if (theme) {
      document.documentElement.dataset.theme = theme;
    }
  }
}

// <wavebeem-color-roles> custom element (style guide page)
{
  function toHex(channel) {
    return Math.round(channel).toString(16).padStart(2, "0");
  }

  function rgbToHex(rgb) {
    const [r, g, b] = rgb.match(/\d+(\.\d+)?/g).map(Number);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  const hexButtonClassName = "color-roles-hex";
  const hexButtonSelector = `.${hexButtonClassName}`;

  class WavebeemColorRoles extends HTMLElement {
    #abortController = new AbortController();
    #themeObserver;

    get #swatches() {
      return this.querySelectorAll(".color-roles-swatch");
    }

    connectedCallback() {
      this.#abortController = new AbortController();
      const { signal } = this.#abortController;
      this.#renderHexButtons();
      this.#themeObserver = new MutationObserver(() =>
        this.#renderHexButtons(),
      );
      this.#themeObserver.observe(document.documentElement, {
        attributeFilter: ["data-theme"],
      });
      this.addEventListener("click", (event) => this.#handleClick(event), {
        signal,
      });
    }

    disconnectedCallback() {
      this.#abortController.abort();
      this.#themeObserver?.disconnect();
    }

    // Recomputed on theme change since swatches use light-dark().
    #renderHexButtons() {
      for (const swatch of this.#swatches) {
        const hex = rgbToHex(getComputedStyle(swatch).backgroundColor);
        const button = this.#ensureHexButton(swatch);
        button.dataset.hex = hex;
        button.textContent = hex;
        button.setAttribute("aria-label", `Copy ${hex} to clipboard`);
      }
    }

    #ensureHexButton(swatch) {
      let button = swatch.querySelector(hexButtonSelector);
      if (!button) {
        button = document.createElement("button");
        button.type = "button";
        button.className = hexButtonClassName;
        swatch.append(button);
      }
      return button;
    }

    #handleClick(event) {
      const button = event.target.closest(hexButtonSelector);
      if (!button) {
        return;
      }
      navigator.clipboard.writeText(button.dataset.hex);
    }
  }

  customElements.define("wavebeem-color-roles", WavebeemColorRoles);
}
