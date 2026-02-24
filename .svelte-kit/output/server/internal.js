!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "88a22bf4-683f-43af-8ddc-d8cb0bf2dc53", e._sentryDebugIdIdentifier = "sentry-dbid-88a22bf4-683f-43af-8ddc-d8cb0bf2dc53");
  } catch (e2) {
  }
}();
import { g, o, c, s, a, b } from "./chunks/internal.js";
import { s as s2, a as a2 } from "./chunks/environment.js";
import { s as s3 } from "./chunks/paths.js";
export {
  g as get_hooks,
  o as options,
  s3 as set_assets,
  s2 as set_building,
  c as set_manifest,
  a2 as set_prerendering,
  s as set_private_env,
  a as set_public_env,
  b as set_read_implementation
};
