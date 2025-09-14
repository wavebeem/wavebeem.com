const html = String.raw;
const css = String.raw;

export class WavebeemBlogFinger extends HTMLElement {
  styles = css`
    :host {
      background-color: white;
      color: black;
      display: flex;
      flex-wrap: wrap;
      padding: 8px;
      gap: 8px;
      display: grid;
      grid-template-columns: repeat(2, auto);
    }

    button {
      --color-background: dimgray;
      --color-text: white;
      --color-border: oklch(64% 50% 280);
      font: inherit;
      font-family: system-ui, sans-serif;
      padding-inline: 16px;
      padding-block: 8px;
      line-height: 1;
      border-radius: 4px;
      background-color: var(--color-background);
      color: var(--color-text);
    }

    button.good {
      border: 1px solid var(--color-border);
    }

    button.bad {
      border: 1px solid transparent;
      transition: 300ms all;
      cursor: pointer;
    }

    button:focus-visible {
      outline: 3px solid;
      outline-offset: -1px;
    }

    button.primary {
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

    button.secondary {
      --color-background: oklch(95% 40% 280);
      --color-text: oklch(50% 50% 280);

      &:hover:not(:active) {
        --color-background: oklch(90% 50% 280);
        --color-text: oklch(50% 50% 280);
      }
    }

    button.tertiary {
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
      <button class="bad primary">Primary</button>
      <button class="good primary">Primary</button>
      <button class="bad secondary">Secondary</button>
      <button class="good secondary">Secondary</button>
      <button class="bad tertiary">Tertiary</button>
      <button class="good tertiary">Tertiary</button>
    `;
  }
}

customElements.define("wavebeem-blog-finger", WavebeemBlogFinger);
