import { html } from "../lib/html.js";
import { groups } from "../_data/menu.js";
import { site } from "../_data/site.js";

export function footer() {
  return html`
    <footer class="footer" id="footer">
      <div class="divider-wavy"></div>
      <nav class="footer-menu" aria-label="Footer">
        ${groups.map(
          (group) => html`
            <ul>
              ${group.map(
                (item) => html`
                  <li>
                    <a href="${item.url}">${item.title}</a>
                  </li>
                `,
              )}
            </ul>
          `,
        )}
      </nav>
      <div>
        <small>
          &copy; ${site.foundedYear}&ndash;${new Date().getFullYear()}
          ${site.name}
        </small>
      </div>
    </footer>
  `;
}
