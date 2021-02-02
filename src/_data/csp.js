// Allow 'unsafe-inline' JS sources for now, since Eleventy injects an inline
// script tag that loads Browsersync, rather than injecting a regular script
// tag.
module.exports = `
  default-src 'self' https://plausible.io;
  img-src 'self' https://plausible.io;
  script-src 'self' https://plausible.io ${
    process.env.CI ? "" : "'unsafe-inline'"
  };
  style-src 'self' 'unsafe-inline';
`;
