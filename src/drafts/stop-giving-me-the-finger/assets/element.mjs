const html = String.raw;
const css = String.raw;

export class WavebeemBlogFingerGood extends HTMLElement {
  styles = css`
    :host {
      background-color: white;
      color: black;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 8px;
    }

    button {
      --color-background: dimgray;
      --color-text: white;
      --color-border: oklch(64% 50% 280);
      font: inherit;
      font-family: system-ui, sans-serif;
      padding-inline: 16px;
      padding-block: 4px 6px;
      border-radius: 4px;
      background-color: var(--color-background);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }

    button:focus-visible {
      outline: 3px solid;
      outline-offset: -1px;
    }

    button:nth-of-type(1) {
      --color-background: oklch(50% 50% 280);
      --color-text: #fff;
      --color-border: oklch(30% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(40% 50% 280);
        --color-text: #fff;
      }

      &:focus-visible {
        outline: 2px solid var(--color-background);
        outline-offset: 2px;
      }
    }

    button:nth-of-type(2) {
      --color-background: oklch(95% 40% 280);
      --color-text: oklch(50% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(90% 50% 280);
        --color-text: oklch(50% 50% 280);
      }
    }

    button:nth-of-type(3) {
      --color-background: #fff;
      --color-text: oklch(50% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(98% 10% 280);
        --color-text: oklch(50% 50% 280);
      }
    }
  `;
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html`
      <style>
        ${this.styles}
      </style>
      <button>Primary</button>
      <button>Secondary</button>
      <button>Tertiary</button>
    `;
  }
}

export class WavebeemBlogFingerBad extends HTMLElement {
  styles = css`
    :host {
      background-color: white;
      color: black;
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 8px;
    }

    button {
      --color-background: dimgray;
      --color-text: white;
      transition: all 500ms;
      cursor: pointer;
      font: inherit;
      font-family: system-ui, sans-serif;
      padding-inline: 16px;
      padding-block: 4px 6px;
      border-radius: 4px;
      background-color: var(--color-background);
      color: var(--color-text);
      border: 1px solid transparent;
    }

    button:focus-visible {
      outline: 2px solid;
      outline-offset: -2px;
    }

    button:nth-of-type(1) {
      --color-background: oklch(50% 50% 280);
      --color-text: #fff;

      &:hover:not(:active) {
        --color-background: oklch(40% 50% 280);
        --color-text: #fff;
      }

      &:focus-visible {
        outline: 2px solid var(--color-background);
        outline-offset: 2px;
      }
    }

    button:nth-of-type(2) {
      --color-background: oklch(95% 40% 280);
      --color-text: oklch(50% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(60% 50% 280);
        --color-text: #fff;
      }
    }

    button:nth-of-type(3) {
      --color-background: #fff;
      --color-text: oklch(50% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(98% 10% 280);
        --color-text: oklch(50% 50% 280);
      }
    }
  `;
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = html`
      <style>
        ${this.styles}
      </style>
      <button>Primary</button>
      <button>Secondary</button>
      <button>Tertiary</button>
    `;
  }
}

customElements.define("wavebeem-blog-finger-good", WavebeemBlogFingerGood);
customElements.define("wavebeem-blog-finger-bad", WavebeemBlogFingerBad);
