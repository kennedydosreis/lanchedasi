!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "6e1397b0-39c4-4afd-8031-492ae5bd01bc", e._sentryDebugIdIdentifier = "sentry-dbid-6e1397b0-39c4-4afd-8031-492ae5bd01bc");
  } catch (e2) {
  }
}();
import { json } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";
import pkg from "@logtail/js";
const { Logtail } = pkg;
const logtail = pkg && pkg.Logtail ? new pkg.Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "fake-token") : { info: () => {
}, error: () => {
} };
const config = {
  runtime: "edge"
};
async function POST({ request }) {
  try {
    const logEntry = await request.json();
    const metadata = {
      context: logEntry.context,
      ts: logEntry.timestamp,
      vanguard: true
    };
    console.log(`[VANGUARD-EDGE-LOG] [${logEntry.level}] ${logEntry.message}`, metadata);
    if (logEntry.level === "error") {
      logtail.error(logEntry.message, metadata);
      Sentry.captureMessage(logEntry.message, { level: "error", extra: metadata });
    } else {
      logtail.info(logEntry.message, metadata);
    }
    return json({ success: true });
  } catch (e) {
    Sentry.captureException(e);
    return json({ success: false }, { status: 400 });
  }
}
export {
  POST,
  config
};
