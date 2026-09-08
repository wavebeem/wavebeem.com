import { html } from "./lib/html.js";
import { layoutBase } from "./templates/layoutBase.js";

export const data = {
  layout: false,
  eleventyExcludeFromCollections: true,
};

export function render(data) {
  const posts = data.collections.posts.slice(0, 3).map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    url: entry.url,
  }));

  return layoutBase(
    {
      title: "wavebeem",
      description:
        "The website of Sage! Web developer, video game lover, and official representative of the color green.",
    },
    html`
      <article class="page">
        <header>
          <picture class="avatar-wrapper">
            <img
              class="avatar"
              alt=""
              src="/photo.webp"
              width="350"
              height="350"
            />
          </picture>

          <h1>Hello!</h1>

          <p>
            I'm <a href="/bio/">Sage</a> (they/them), aka <q>wavebeem</q>. I'm a
            video game obsessed web developer and an official representative of
            the color green.
          </p>

          <div class="clearfix"></div>
        </header>

        <section class="page-body">
          <h2>Recent posts</h2>

          ${posts.map(
            (post) => html`
              <a class="infobox" href="${post.url}">
                <div class="heading">${post.title}</div>
                <div class="description">${post.description}</div>
              </a>
            `,
          )}

          <p>
            <a class="button" href="/blog/">More blog posts &rarr;</a>
          </p>

          <h2>Projects</h2>

          <figure>
            <img
              loading="eager"
              src="/projects/assets/pkmn.webp"
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
                A Pokémon web app with thousands of monthly
                users&mdash;developed by me since 2013.
              </div>
            </figcaption>
          </figure>

          <p>
            <a class="button" href="/projects/">More projects &rarr;</a>
          </p>

          <h2>Featured art</h2>

          <div class="photo-grid paragraph">
            <figure>
              <img
                src="/art/assets/2025-04-13-dedenne.webp"
                alt="Dedenne"
                width="2048"
                height="2048"
              />
            </figure>
            <figure>
              <img
                src="/art/assets/2020-06-14-teeny-sanguini.webp"
                alt="Teeny Sanguini"
                width="1280"
                height="1280"
              />
            </figure>
            <figure>
              <img
                src="/art/assets/2024-04-02-orc-awooga.webp"
                alt="Orc Awooga"
                width="1280"
                height="1280"
              />
            </figure>
            <figure>
              <img
                src="/art/assets/2024-06-28-elephant.webp"
                alt="Elephant"
                width="800"
                height="800"
              />
            </figure>
          </div>

          <p>
            <a class="button" href="/art/">More art &rarr;</a>
          </p>
        </section>
      </article>
    `,
  ).html;
}
