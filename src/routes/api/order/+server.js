import { json } from '@sveltejs/kit';
import * as Sentry from "@sentry/sveltekit";
import pkg from "@logtail/js";
const { Logtail } = pkg;

const logtail = pkg.Logtail ? new pkg.Logtail(process.env.LOGTAIL_SOURCE_TOKEN || "fake-token") : { info: () => {}, error: () => {} };

export const config = {
    runtime: 'edge'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Geração de ID resiliente
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        const orderId = `ORD-${timestamp}-${randomStr}`.toUpperCase();

        const logData = {
            orderId,
            itemsCount: data.items?.length,
            total: data.total,
            userAgent: request.headers.get('user-agent'),
            vanguard: true
        };

        console.info(`[HYBRID-VANGUARD] Intenção de compra capturada: ${orderId}`, logData);
        logtail.info(`Order captured: ${orderId}`, logData);

        return json({
            success: true,
            orderId,
            message: 'Pedido processado pela Edge Network',
            vanguard: true
        });
    } catch (error) {
        console.error('[HYBRID-VANGUARD] Falha no processamento:', error);
        Sentry.captureException(error);
        logtail.error(`Edge Processing Failure`, { error: error.message });
        return json({ success: false, error: 'Internal Edge Error' }, { status: 500 });
    }
}
