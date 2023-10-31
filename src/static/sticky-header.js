const header = document.querySelector("header");
const root = document.documentElement;

// Previous scroll position
let y0 = root.scrollTop;
// Previous scroll delta
let dy0 = 0;

// Hide sticky header after two consecutive scroll events going down. This is to
// help prevent any flicker of the header during an accidental scroll.
addEventListener(
  "scroll",
  () => {
    const y1 = root.scrollTop;
    const dy1 = y0 - y1;
    y0 = y1;
    header.dataset.sticky = String(dy0 >= 0 && dy1 >= 0);
    dy0 = dy1;
  },
  { passive: true }
);
