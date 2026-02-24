import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "https://public@sentry.io/1",
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
});
