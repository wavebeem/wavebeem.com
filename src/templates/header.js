import { html } from "../lib/html.js";
import { icons } from "../lib/icons.js";
import { logo } from "./logo.js";
import { themeSelect } from "./themeSelect.js";
import { groups } from "../_data/menu.js";

export function header() {
  return html`
    <header class="header">
      <div class="header-content">
        <span class="logo">
          <a href="/" role="presentation">${logo()}</a>
        </span>
        <nav class="nav" aria-label="Menu">
          <button type="button" class="hamburger" aria-label="Open menu">
            ${icons.menu}
          </button>
        </nav>
      </div>
      <dialog class="nav-menu">
        <form method="dialog" class="nav-menu-toolbar">
          <button type="submit" class="nav-menu-close" aria-label="Close menu">
            ${icons.close}
          </button>
        </form>
        <div class="nav-menu-content">
          <nav aria-label="Primary">
            ${groups.map(
              (group) => html`
                <div class="nav-group">
                  ${group.map(
                    (item) => html`
                      <a class="nav-link" href="${item.url}">
                        <span class="nav-link-icon" aria-hidden="true"
                          >${item.icon}</span
                        >
                        ${item.title}
                      </a>
                    `,
                  )}
                </div>
              `,
            )}
          </nav>
          <div class="paragraph">${themeSelect()}</div>
        </div>
      </dialog>
    </header>
    <hr />
  `;
}
