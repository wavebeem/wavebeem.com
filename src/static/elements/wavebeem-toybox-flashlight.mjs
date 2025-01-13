/**
 * @license MIT
 * @copyright Sage Fennel 2024
 * @see https://www.wavebeem.com/
 */

const html = String.raw;
const css = String.raw;

export class WavebeemToyboxFlashlight extends HTMLElement {
  #abortController = new AbortController();

  #style = css`
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
      width: 20vmax;
      height: 20vmax;
      filter: blur(16px);
      box-shadow: 0 0 0 200vmax hsl(0 0% 0% / 85%);
      background: radial-gradient(
        hsl(0 0% 100% / 50%),
        hsl(0 0% 100% / 30%) 30% 40%
      );
      position: fixed;
      border-radius: var(--rounded-pill);
      translate: -50% -50%;
      transform: translate(var(--x), var(--y));
      cursor: none;
      pointer-events: none;
      mix-blend-mode: hard-light;
    }
  `;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = html`
      <style>
        ${this.#style}
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
    const root = document.documentElement;
    if (flashlight.hidden) {
      flashlight.hidden = false;
      // Disable touch scrolling in Chrome since it causes us to lose the
      // `pointermove` event entirely...
      root.style.touchAction = "none";
    } else {
      flashlight.hidden = true;
      root.style.touchAction = "";
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

customElements.define("wavebeem-toybox-flashlight", WavebeemToyboxFlashlight);
