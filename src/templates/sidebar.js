import { html } from "../lib/html.js";
import { logo } from "./logo.js";
import { themeSelect } from "./themeSelect.js";
import { groups } from "../_data/menu.js";

export function sidebar() {
  return html`
    <aside class="sidebar">
      <div class="sidebar-inner">
        <a href="/" role="presentation" class="sidebar-top">${logo()}</a>
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
        ${themeSelect()}
      </div>
      <div
        class="divider-wavy-vertical sidebar-divider"
        aria-hidden="true"
      ></div>
    </aside>
  `;
}
