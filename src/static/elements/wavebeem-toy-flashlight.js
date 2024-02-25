const html = String.raw;
const css = String.raw;

class WavebeemToyFlashlight extends HTMLElement {
  #abortController = new AbortController();

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = html`
      <style>
        :host {
          display: block;
        }

        .flashlight {
          --x: 0px;
          --y: 0px;
          --z-index: 100;
          z-index: var(--z-index);
          top: 0;
          left: 0;
          width: 30vmax;
          height: 30vmax;
          filter: blur(8px);
          box-shadow: 0 0 0 200vmax hsl(0 0% 0% / 85%);
          background: radial-gradient(
            hsl(0 0% 90% / 30%),
            hsl(0 0% 90% / 10%) 30% 40%
          );
          position: fixed;
          border-radius: 9999px;
          translate: -50% -50%;
          transform: translate(var(--x), var(--y));
          cursor: none;
          pointer-events: none;
          mix-blend-mode: hard-light;
        }
      </style>
      <div class="flashlight" id="flashlight" hidden></div>
      <slot></slot>
    `;
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    // Listen for pointer movement on the whole page, not just this element
    for (const eventName of ["pointerdown", "pointerup", "pointermove"]) {
      addEventListener(
        eventName,
        (event) => {
          this.#onPointerMove(event);
        },
        { signal }
      );
    }
    // Clicks inside this element toggle the flashlight
    this.shadowRoot.addEventListener(
      "click",
      (event) => {
        this.#onClick(event);
      },
      { signal }
    );
  }

  #flashlight() {
    return this.#$("#flashlight");
  }

  #onPointerMove(event) {
    const x = event.clientX;
    const y = event.clientY;
    const flashlight = this.#flashlight();
    flashlight.style.setProperty("--x", `${x}px`);
    flashlight.style.setProperty("--y", `${y}px`);
  }

  #onClick(event) {
    const flashlight = this.#flashlight();
    if (flashlight.hidden) {
      flashlight.hidden = false;
      // Disable touch scrolling in Chrome since it causes us to lose the
      // `pointermove` event entirely...
      document.documentElement.style.touchAction = "none";
    } else {
      flashlight.hidden = true;
      document.documentElement.style.touchAction = "";
    }
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }

  #$(selector) {
    const element = this.shadowRoot.querySelector(selector);
    if (!element) {
      throw new Error(`no such element: ${selector}`);
    }
    return element;
  }
}

customElements.define("wavebeem-toy-flashlight", WavebeemToyFlashlight);
