!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "3d917bab-3a8b-42c2-861e-2838585a7b67", e._sentryDebugIdIdentifier = "sentry-dbid-3d917bab-3a8b-42c2-861e-2838585a7b67");
  } catch (e2) {
  }
}();
import * as Sentry from "@sentry/sveltekit";
globalThis["__sentry_sveltekit_output_dir"] = ".svelte-kit/output";
Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://public@sentry.io/1",
  tracesSampleRate: 1
});
