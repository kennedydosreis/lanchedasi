import { json } from '@sveltejs/kit';
import * as Sentry from "@sentry/sveltekit";
import pkg from "@logtail/js";
const { Logtail } = pkg;

const logtail = (pkg && pkg.Logtail) ? new pkg.Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "fake-token") : { info: () => {}, error: () => {} };

export const config = {
    runtime: 'edge'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const logEntry = await request.json();
        
        const metadata = {
            context: logEntry.context,
            ts: logEntry.timestamp,
            vanguard: true
        };

        console.log(`[VANGUARD-EDGE-LOG] [${logEntry.level}] ${logEntry.message}`, metadata);
        
        if (logEntry.level === 'error') {
            logtail.error(logEntry.message, metadata);
            Sentry.captureMessage(logEntry.message, { level: 'error', extra: metadata });
        } else {
            logtail.info(logEntry.message, metadata);
        }

        return json({ success: true });
    } catch (e) {
        Sentry.captureException(e);
        return json({ success: false }, { status: 400 });
    }
}
