export class WavebeemEasterEgg extends HTMLElement {
  abortController = new AbortController();

  connectedCallback() {
    this.dataset.state = "outside";
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.style.setProperty("--x", "0");
    this.style.setProperty("--y", "0");
    this.style.setProperty("--angle", "90rad");
    this.style.setProperty("--r", "0.5");
    this.addEventListener(
      "pointermove",
      (event) => {
        if (this.#prefersReducedMotion()) {
          return;
        }
        const x = event.offsetX;
        const y = event.offsetY;
        const w = this.clientWidth;
        const h = this.clientHeight;
        const cx = 2 * (x / w) - 1;
        const cy = 2 * (y / h) - 1;
        const angle = Math.atan2(cy, cx) + Math.PI / 2;
        const radius = Math.sqrt(cx ** 2 + cy ** 2);
        this.style.setProperty("--x", cx);
        this.style.setProperty("--y", cy);
        this.style.setProperty("--angle", `${angle}rad`);
        this.style.setProperty("--r", String(radius));
      },
      {
        signal: this.abortController.signal,
        passive: true,
      }
    );
    this.addEventListener(
      "pointerenter",
      (event) => {
        this.dataset.state = "inside";
      },
      { signal }
    );
    this.addEventListener(
      "pointerleave",
      (event) => {
        this.dataset.state = "outside";
      },
      { signal }
    );
  }

  disconnectedCallback() {
    this.abortController.abort();
  }

  #prefersReducedMotion() {
    return matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
}

customElements.define("wavebeem-easter-egg", WavebeemEasterEgg);
