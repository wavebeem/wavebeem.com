// Vite/Astro internal request paths, e.g. /@vite/client, /@fs/...,
// /__vite_ping.
const internalPath = /^\/(@|__)/;

// Last path segment has a "." (e.g. /robots.txt, /favicon.ico) -> a file, not a
// directory-style route, so it's never redirected.
const hasFileExtension = /\/[^/]+\.[^/]+$/;

function needsTrailingSlash(pathname) {
  return (
    pathname !== "/" &&
    !pathname.endsWith("/") &&
    !internalPath.test(pathname) &&
    !hasFileExtension.test(pathname)
  );
}

// Mirrors Netlify's pretty-URL redirect (foo -> foo/), which the dev server
// doesn't otherwise reproduce: astro's own trailingSlash config only 404s a
// mismatch in dev instead of redirecting.
export default function trailingSlashRedirect() {
  return {
    name: "trailing-slash-redirect",
    hooks: {
      "astro:server:setup"({ server }) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url, "http://localhost");
          if (!needsTrailingSlash(url.pathname)) {
            return next();
          }
          res.writeHead(301, {
            Location: `${url.pathname}/${url.search}`,
          });
          res.end();
        });
      },
    },
  };
}
