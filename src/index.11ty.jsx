/** @jsx h */
import { h } from "preact";
import { markdownify } from "../eleventy/helpers.mjs";

export function render(data) {
  const top3 = data.collections.posts.toReversed().slice(0, 3);
  return (
    <article class="page">
      <header>
        <picture class="avatar-wrapper">
          <img
            class="avatar"
            alt=""
            src="photo.webp"
            width="350"
            height="350"
          />
        </picture>

        <h1>Hello!</h1>

        <p>
          I'm <a href="/about/">Sage</a> (they/them), aka <q>wavebeem</q>.
          I'm a video game obsessed web developer and an official
          representative of the color green.
        </p>

        <div hidden class="clearfix"></div>
      </header>

      <section class="page-body">
        <h2>Recent posts</h2>

        {top3.map((post) => (
          <a class="infobox" href={post.url} key={post.url}>
            <div class="heading">{post.data.title}</div>
            <div
              class="description"
              dangerouslySetInnerHTML={{
                __html: markdownify(post.data.description),
              }}
            />
          </a>
        ))}

        <p>
          <a class="button" href="/blog/">
            More blog posts &rarr;
          </a>
        </p>

        <h2>Projects</h2>

        <figure>
          <img
            loading="eager"
            src="./projects/img/pkmn.webp"
            alt=""
            width="2560"
            height="1440"
          />
          <figcaption>
            <div>
              <strong>
                <a href="https://www.pkmn.help">
                  PKMN.help &ndash; Pokémon Type Calculator
                </a>
              </strong>
            </div>
            <div>
              A Pokémon web app with thousands of monthly users&mdash;developed by
              me since 2013.
            </div>
          </figcaption>
        </figure>

        <p>
          <a class="button" href="/projects/">
            More projects &rarr;
          </a>
        </p>

        <h2>Featured art</h2>

        <div class="photo-grid paragraph">
          <figure>
            <img
              src="./art/img/2025-04-13-dedenne.webp"
              alt="Dedenne"
              width="2048"
              height="2048"
            />
          </figure>
          <figure>
            <img
              src="./art/img/2020-06-14-teeny-sanguini.webp"
              alt="Teeny Sanguini"
              width="1280"
              height="1280"
            />
          </figure>
          <figure>
            <img
              src="./art/img/2024-04-02-orc-awooga.webp"
              alt="Orc Awooga"
              width="1280"
              height="1280"
            />
          </figure>
          <figure>
            <img
              src="./art/img/2024-06-28-elephant.webp"
              alt="Elephant"
              width="800"
              height="800"
            />
          </figure>
        </div>

        <p>
          <a class="button" href="/art/">
            More art &rarr;
          </a>
        </p>
      </section>
    </article>
  );
}
