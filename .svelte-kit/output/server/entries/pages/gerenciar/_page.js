!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "19642fef-6b2a-4467-836f-8fe69ebb99e9", e._sentryDebugIdIdentifier = "sentry-dbid-19642fef-6b2a-4467-836f-8fe69ebb99e9");
  } catch (e2) {
  }
}();
const prerender = true;
const ssr = false;
const trailingSlash = "always";
export {
  prerender,
  ssr,
  trailingSlash
};
