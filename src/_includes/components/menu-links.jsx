/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";

export function MenuLinks({ groups }) {
  return (
    <>
      {groups.map((group, i) => (
        <section class="menu paragraph" key={i}>
          {group.map((item) => (
            <a href={item.url} key={item.url}>
              {item.title}
            </a>
          ))}
        </section>
      ))}
    </>
  );
}
