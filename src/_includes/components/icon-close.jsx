/** @jsx h */
import { h } from "preact";

export function IconClose() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
    >
      <title>Close</title>
      <path
        d="
          M 1 1
          L 23 23
          M 23 1
          L 1 23
        "
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
}
