import { json } from '@sveltejs/kit';

export const config = {
    runtime: 'edge'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Geração de ID resiliente (NanoID alternativo simples)
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 8);
        const orderId = `ORD-${timestamp}-${randomStr}`.toUpperCase();

        // Simulação de log de intenção (Em Edge Runtime real, poderíamos usar KV ou Upstash)
        console.info(`[HYBRID-VANGUARD] Intenção de compra capturada: ${orderId}`, {
            items: data.items?.length,
            total: data.total,
            userAgent: request.headers.get('user-agent')
        });

        return json({
            success: true,
            orderId,
            message: 'Pedido processado pela Edge Network',
            vanguard: true
        });
    } catch (error) {
        console.error('[HYBRID-VANGUARD] Falha no processamento:', error);
        return json({ success: false, error: 'Internal Edge Error' }, { status: 500 });
    }
}
