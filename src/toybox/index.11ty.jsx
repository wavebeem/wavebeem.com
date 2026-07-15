/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { markdownify } from "../../eleventy/filter.mjs";

export function render(data) {
  const posts = data.collections.toybox.toReversed();
  return (
    <>
      <p>
        A silly little collection of toys and jokes made specifically for
        the web.
      </p>

      <p>
        <a class="button" href="/subscribe/">
          Subscribe
        </a>
      </p>

      {posts.map((post) => (
        <a class="infobox" href={post.url} key={post.url}>
          <span class="heading">{post.data.title}</span>
          <span
            class="description"
            dangerouslySetInnerHTML={{
              __html: markdownify(post.data.description),
            }}
          />
        </a>
      ))}
    </>
  );
}
