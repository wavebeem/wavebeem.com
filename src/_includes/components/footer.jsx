/** @jsx h */
import { h } from "preact";
import { formatDate } from "#eleventy/helpers.mjs";

export function Footer({ buildDate, menu }) {
  return (
    <footer class="footer" id="footer">
      <div class="footer-menu">
        {menu.groups.map((group, i) => (
          <ul key={i}>
            {group.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div>
        <small>
          &copy; 2012&ndash;{formatDate(buildDate.object, "year")} wavebeem
        </small>
      </div>
      <div>
        <a href="#" class="button" data-variant="secondary" data-size="small">
          Top &uarr;
        </a>
      </div>
    </footer>
  );
}
