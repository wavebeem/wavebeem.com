import { html } from "../lib/html.js";
import { icons } from "../lib/icons.js";

export function themeSelect() {
  return html`
    <wavebeem-theme-select class="theme-select">
      <button
        type="button"
        class="theme-select-trigger"
        aria-haspopup="dialog"
        aria-label="Choose theme…"
      >
        ${icons.theme}
      </button>
      <dialog class="theme-select-dialog" aria-label="Choose theme">
        <div class="theme-select-options">
          <button type="button" class="theme-select-option" data-theme="auto">
            Auto
          </button>
          <button type="button" class="theme-select-option" data-theme="light">
            Light
          </button>
          <button type="button" class="theme-select-option" data-theme="dark">
            Dark
          </button>
        </div>
        <button type="button" class="button theme-select-done">Done</button>
      </dialog>
    </wavebeem-theme-select>
  `;
}
