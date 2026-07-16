/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";

export function render() {
  return (
    <>
      <section class="menu paragraph">
        <a href="/">Home</a>
        <a href="/blog/">Blog</a>
        <a href="/art/">Art</a>
      </section>

      <section class="menu paragraph">
        <a href="/about/">About</a>
        <a href="/projects/">Projects</a>
        <a href="/resume/">Resume</a>
        <a href="/contact/">Contact</a>
      </section>

      <section class="menu paragraph">
        <a href="/toybox/">Toybox</a>
        <a href="/shrines/">Shrines</a>
        <a href="/uses/">Things I use</a>
        <a href="/past-designs/">Past designs</a>
        <a href="/credits/">Credits</a>
        <a href="/links/">Links</a>
      </section>
    </>
  );
}
