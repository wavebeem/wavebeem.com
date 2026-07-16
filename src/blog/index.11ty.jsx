/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { groupByYear, markdownify } from "../../eleventy/helpers.mjs";

export function render(data) {
  const postsByYear = groupByYear(data.collections.posts);
  return (
    <>
      <p>
        I typically write about web development, video games, or my own
        life.
      </p>

      <p>
        <a class="button" href="/subscribe/">
          Subscribe
        </a>
      </p>

      {postsByYear.map(([year, postList]) => (
        <Fragment key={year}>
          <h2>{year}</h2>
          {postList.map((post) => (
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
        </Fragment>
      ))}
    </>
  );
}
