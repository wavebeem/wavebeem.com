class ShyHeader extends HTMLElement {
  #abortController = new AbortController();
  #positions = [];

  /** @param {Event} event */
  #onScroll = (event) => {
    const root = document.documentElement;
    this.#positions.unshift(root.scrollTop);
    if (this.#positions.length > 2) {
      this.#positions.length = 2;
    }
    if (this.#positions.length < 2) {
      return;
    }
    const [a, b] = this.#positions;
    this.hidden = a > b;
    if (a === 0) {
      delete this.dataset.sticky;
    } else {
      this.dataset.sticky = "";
    }
  };

  connectedCallback() {
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    addEventListener("scroll", this.#onScroll, { signal, passive: true });
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }
}

customElements.define("shy-header", ShyHeader);
