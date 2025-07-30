/**
 * A header that hides itself based on how the user is scrolling.
 *
 * It sets the `hidden` DOM property, which is reflected as the `hidden` HTML
 * attribute.
 */
export class ShyHeader extends HTMLElement {
  #abortController = new AbortController();
  #lastY = 0;
  #lastDelta = 0;

  #onScroll() {
    const y = document.documentElement.scrollTop;
    const delta = this.#lastY - y;
    // Firefox sometimes dispatches fake scroll events by small amounts in the
    // opposite dirction from where you were just scrolling. In order to work
    // around those, lets ensure two consecutive scrolls are in the same
    // direction before hiding the header. This would probably also help with
    // buggy mouse wheels too.
    this.hidden = delta < 0 && this.#lastDelta < 0;
    this.#lastY = y;
    this.#lastDelta = delta;
  }

  connectedCallback() {
    this.#abortController = new AbortController();
    const { signal } = this.#abortController;
    addEventListener("scroll", () => this.#onScroll(), {
      signal,
      passive: false,
    });
  }

  disconnectedCallback() {
    this.#abortController.abort();
  }
}

customElements.define("shy-header", ShyHeader);
