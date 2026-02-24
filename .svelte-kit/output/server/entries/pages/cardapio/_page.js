!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "a0cdc0e9-a54d-49ac-a888-17d97bccae2b", e._sentryDebugIdIdentifier = "sentry-dbid-a0cdc0e9-a54d-49ac-a888-17d97bccae2b");
  } catch (e2) {
  }
}();
import { wrapLoadWithSentry } from "@sentry/sveltekit";
const prerender = true;
async function load$1({ fetch }) {
  try {
    const response = await fetch("/data/menu.json");
    const menuData = await response.json();
    return { menuData };
  } catch {
    return { menuData: null };
  }
}
const load = load$1 ? wrapLoadWithSentry(load$1) : void 0;
export {
  load,
  prerender
};
