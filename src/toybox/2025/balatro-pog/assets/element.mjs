/**
 * @license MIT
 * @copyright wavebeem 2025
 * @see https://www.wavebeem.com/
 */
export class WavebeemEasterEgg extends HTMLElement {
  connectedCallback() {
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    this.dataset.state = "outside";
    this.#css("--x", "0");
    this.#css("--y", "0");
    this.#css("--angle", "0.25turn");
    this.#css("--r", "0.5");
    this.addEventListener(
      "pointermove",
      (event) => {
        // if (this.#shouldSkip()) {
        //   return;
        // }
        const x = event.offsetX;
        const y = event.offsetY;
        const w = this.clientWidth;
        const h = this.clientHeight;
        const cx = this.#clamp(2 * (x / w) - 1);
        const cy = this.#clamp(2 * (y / h) - 1);
        const angle = Math.atan2(cy, cx) + Math.PI / 2;
        const radius = Math.sqrt(cx ** 2 + cy ** 2);
        this.#css("--x", cx);
        this.#css("--y", cy);
        this.#css("--angle", `${angle}rad`);
        this.#css("--r", radius);
      },
      {
        signal: this.#abortController.signal,
        passive: true,
      },
    );
    this.addEventListener(
      "pointerenter",
      (event) => {
        if (this.#shouldSkip()) {
          return;
        }
        this.dataset.state = "inside";
      },
      { signal },
    );
    this.addEventListener(
      "pointerleave",
      (event) => {
        if (this.#shouldSkip()) {
          return;
        }
        this.dataset.state = "outside";
      },
      { signal },
    );
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }

  #abortController = new AbortController();
  #prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  #hover = matchMedia("(hover)");

  #shouldSkip() {
    return this.#prefersReducedMotion.matches || !this.#hover.matches;
  }

  #clamp(x) {
    return Math.min(1, Math.max(-1, x));
  }

  #css(key, value) {
    this.style.setProperty(key, value);
  }
}

customElements.define("wavebeem-easter-egg", WavebeemEasterEgg);
