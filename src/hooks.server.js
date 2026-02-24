import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://public@sentry.io/1",
  tracesSampleRate: 1.0,
});
