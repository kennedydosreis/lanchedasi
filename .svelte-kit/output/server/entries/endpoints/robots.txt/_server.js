!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "1e9b8c5e-cb18-448c-bf22-001068bdca65", e._sentryDebugIdIdentifier = "sentry-dbid-1e9b8c5e-cb18-448c-bf22-001068bdca65");
  } catch (e2) {
  }
}();
const prerender = true;
const SITE_URL = "https://www.lanchedasi.com.br";
async function GET() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}
export {
  GET,
  prerender
};
