/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";

export function render(data) {
  const posts = [...data.collections.draft].reverse();
  return (
    <>
      <p>These posts aren't finished yet! Please don't share them.</p>

      {posts.map((post) => (
        <a class="infobox" href={post.url} key={post.url}>
          {post.fileSlug}
        </a>
      ))}
    </>
  );
}
