!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "890c9f06-a4d6-4287-8ba3-446d8a689cc9", e._sentryDebugIdIdentifier = "sentry-dbid-890c9f06-a4d6-4287-8ba3-446d8a689cc9");
  } catch (e2) {
  }
}();
const BROWSER = false;
export {
  BROWSER as B
};
