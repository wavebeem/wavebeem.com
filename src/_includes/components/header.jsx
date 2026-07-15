/** @jsx h */
import { h } from "preact";
import { Logo } from "./logo.jsx";
import { IconMenu } from "./icon-menu.jsx";
import { IconClose } from "./icon-close.jsx";

export function Header({ page }) {
  const isMenuPage = page.url === "/menu/";
  return (
    <header class="header">
      <div class="header-content">
        <span class="logo">
          <a href="/" role="presentation">
            <Logo />
          </a>
        </span>
        <nav class="nav">
          {isMenuPage ? (
            <a href="/" class="hamburger" data-action="back">
              <IconClose />
            </a>
          ) : (
            <a href="/menu/" class="hamburger" data-action="">
              <IconMenu />
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
