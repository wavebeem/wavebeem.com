/** @jsx h */
/** @jsxFrag Fragment */
import { h, Fragment } from "preact";
import { FormattedDate } from "../_includes/components/date.jsx";

export function render(data) {
  const images = [...data.art.images].reverse();
  return (
    <>
      <p>
        I've been drawing pixel art ever since I learned you could zoom in
        with Microsoft Paint. I don't practice much, but I love working with
        pixels.
      </p>

      <div class="photo-grid">
        {images.map((image) => (
          <figure key={image.path}>
            <img
              src={image.path}
              loading="lazy"
              alt=""
              width="600"
              height="600"
            />
            <figcaption>
              <a href={image.path}>
                <strong>{image.title}</strong>
              </a>
              <br />
              <FormattedDate date={image.date} />
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
