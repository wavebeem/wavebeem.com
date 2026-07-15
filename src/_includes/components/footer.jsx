/** @jsx h */
import { h } from "preact";
import { formatDate } from "../../../eleventy/filter.mjs";

export function Footer({ buildDate }) {
  return (
    <footer class="footer" id="footer">
      <div>
        <small>
          © 2012–{formatDate(buildDate.object, "year")} wavebeem
        </small>
      </div>
      <div>
        <a href="#" class="button" data-variant="secondary" data-size="small">
          Top ↑
        </a>
      </div>
    </footer>
  );
}
