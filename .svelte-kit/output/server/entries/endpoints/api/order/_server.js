!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "06b82638-8dd5-4f1f-a7df-dd9d2af0aed1", e._sentryDebugIdIdentifier = "sentry-dbid-06b82638-8dd5-4f1f-a7df-dd9d2af0aed1");
  } catch (e2) {
  }
}();
import { json } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";
import pkg from "@logtail/js";
const { Logtail } = pkg;
const logtail = pkg.Logtail ? new pkg.Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "fake-token") : { info: () => {
}, error: () => {
} };
const config = {
  runtime: "edge"
};
async function POST({ request }) {
  try {
    const data = await request.json();
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    const orderId = `ORD-${timestamp}-${randomStr}`.toUpperCase();
    const logData = {
      orderId,
      itemsCount: data.items?.length,
      total: data.total,
      userAgent: request.headers.get("user-agent"),
      vanguard: true
    };
    console.info(`[HYBRID-VANGUARD] Intenção de compra capturada: ${orderId}`, logData);
    logtail.info(`Order captured: ${orderId}`, logData);
    return json({
      success: true,
      orderId,
      message: "Pedido processado pela Edge Network",
      vanguard: true
    });
  } catch (error) {
    console.error("[HYBRID-VANGUARD] Falha no processamento:", error);
    Sentry.captureException(error);
    logtail.error(`Edge Processing Failure`, { error: error.message });
    return json({ success: false, error: "Internal Edge Error" }, { status: 500 });
  }
}
export {
  POST,
  config
};
