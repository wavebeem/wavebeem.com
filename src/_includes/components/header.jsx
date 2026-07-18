/** @jsx h */
import { h } from "preact";
import { Logo } from "./logo.jsx";
import { IconMenu } from "./icon-menu.jsx";
import { IconClose } from "./icon-close.jsx";
import { IconTheme } from "./icon-theme.jsx";
import { MenuLinks } from "./menu-links.jsx";

export function Header({ page, menu }) {
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
          <wavebeem-theme-select class="theme-select">
            <IconTheme />
            <select aria-label="Theme">
              <option value="auto">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </wavebeem-theme-select>
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
      <dialog class="nav-menu">
        <form method="dialog" class="nav-menu-toolbar">
          <button type="submit" class="nav-menu-close" aria-label="Close menu">
            <IconClose />
          </button>
        </form>
        <div class="nav-menu-content">
          <MenuLinks groups={menu.groups} />
        </div>
      </dialog>
    </header>
  );
}
