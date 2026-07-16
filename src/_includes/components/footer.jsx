/** @jsx h */
import { h } from "preact";
import { formatDate } from "../../../eleventy/helpers.mjs";

export function Footer({ buildDate }) {
  return (
    <footer class="footer" id="footer">
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
