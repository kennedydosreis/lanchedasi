export const prerender = true;

const SITE_URL = 'https://www.lanchedasi.com.br';

export async function GET() {
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;

    return new Response(robots, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
