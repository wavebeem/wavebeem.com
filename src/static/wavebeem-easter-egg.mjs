export class WavebeemEasterEgg extends HTMLElement {
  abortController = new AbortController();

  connectedCallback() {
    this.dataset.state = "outside";
    this.abortController = new AbortController();
    const { signal } = this.abortController;
    this.addEventListener(
      "pointermove",
      (event) => {
        const x = event.offsetX;
        const y = event.offsetY;
        const w = this.clientWidth;
        const h = this.clientHeight;
        const cx = 2 * (x / w) - 1;
        const cy = 2 * (y / h) - 1;
        this.dataset.x = cx;
        this.dataset.y = cy;
        this.style.setProperty("--x", cx);
        this.style.setProperty("--y", cy);
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
}

customElements.define("wavebeem-easter-egg", WavebeemEasterEgg);
