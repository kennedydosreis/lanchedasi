import { json } from '@sveltejs/kit';

export const config = {
    runtime: 'edge'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const logEntry = await request.json();
        
        // Em produção, isso iria para um log aggregator (Datadog, Axiom, Logtail)
        // Aqui, garantimos visibilidade no log de runtime da Vercel
        console.log(`[VANGUARD-EDGE-LOG] [${logEntry.level}] ${logEntry.message}`, {
            context: logEntry.context,
            ts: logEntry.timestamp
        });

        return json({ success: true });
    } catch (e) {
        return json({ success: false }, { status: 400 });
    }
}
