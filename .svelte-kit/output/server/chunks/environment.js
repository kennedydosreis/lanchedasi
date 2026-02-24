!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "7000fd1d-2068-4e24-8f32-ee3292935f99", e._sentryDebugIdIdentifier = "sentry-dbid-7000fd1d-2068-4e24-8f32-ee3292935f99");
  } catch (e2) {
  }
}();
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
export {
  set_prerendering as a,
  prerendering as p,
  set_building as s
};
