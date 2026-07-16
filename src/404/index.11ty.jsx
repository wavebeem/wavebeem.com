/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { compare } from "#eleventy/helpers.mjs";

export function render(data) {
  const sortedPosts = data.collections.all.toSorted((a, b) =>
    compare(a.url, b.url),
  );
  return (
    <>
      <p>
        Sorry, it looks like I broke something on my website. Please{" "}
        <a href="/contact/">send me</a> the URL in your address bar and tell
        me where you found it.
      </p>

      <a class="button" href="/">
        &larr; Take me home
      </a>

      <p>If you're feeling brave, you can try to find it yourself:</p>

      <details>
        <summary>Show all pages...</summary>
        <dl>
          {sortedPosts
            .filter((post) => !post.data.draft)
            .map((post) => (
              <Fragment key={post.url}>
                <dt>{post.data.title || post.url}</dt>
                <dd>
                  <a href={post.url}>{post.url}</a>
                </dd>
              </Fragment>
            ))}
        </dl>
      </details>
    </>
  );
}
