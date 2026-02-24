!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "53e4a03d-bad5-4d01-9352-aac5380b5e1d", e._sentryDebugIdIdentifier = "sentry-dbid-53e4a03d-bad5-4d01-9352-aac5380b5e1d");
  } catch (e2) {
  }
}();
function onMount() {
}
function afterUpdate() {
}
export {
  afterUpdate as a,
  onMount as o
};
