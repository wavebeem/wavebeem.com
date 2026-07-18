/** @jsx h */
import { h } from "preact";
import { MenuLinks } from "../_includes/components/menu-links.jsx";

export function render(data) {
  return <MenuLinks groups={data.menu.groups} />;
}
