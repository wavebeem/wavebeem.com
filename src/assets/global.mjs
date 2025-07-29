class ShyHeader extends HTMLElement {
  #abortController = new AbortController();
  #positions = [];

  #updatePositions = () => {
    const { scrollTop } = document.documentElement;
    this.#positions.unshift(scrollTop);
    if (this.#positions.length > 2) {
      this.#positions.length = 2;
    }
    const [a, b = 0] = this.#positions;
    this.hidden = a > b;
    if (a === 0) {
      this.dataset.atTop = "";
    } else {
      delete this.dataset.atTop;
    }
  };

  connectedCallback() {
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    addEventListener("scroll", this.#updatePositions, {
      signal,
      passive: true,
    });
    this.#updatePositions();
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }
}

customElements.define("shy-header", ShyHeader);
