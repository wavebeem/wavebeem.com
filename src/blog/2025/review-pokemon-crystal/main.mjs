function preloadImage(src) {
  const img = new Image();
  img.src = src;
  return img;
}

class WavebeemReviewPokemonCrystalSprites extends HTMLElement {
  #abortController = new AbortController();
  #i = 0;
  #images = [
    preloadImage("./assets/kris.webp"),
    preloadImage("./assets/gold.webp"),
  ];

  #$(selector) {
    const element = this.querySelector(selector);
    if (!element) {
      throw new Error(`couldn't find selector: ${selector}`);
    }
    return element;
  }

  connectedCallback() {
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    this.addEventListener(
      "click",
      (_event) => {
        const img = this.#$("img");
        this.#i = (this.#i + 1) % this.#images.length;
        img.src = this.#images[this.#i].src;
      },
      { signal },
    );
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }
}

customElements.define(
  "wavebeem-review-pokemon-crystal-sprites",
  WavebeemReviewPokemonCrystalSprites,
);
