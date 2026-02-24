import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

const adapter = process.env.VERCEL ? adapterAuto() : adapterStatic({
    pages: 'build',
    assets: 'build',
    fallback: '404.html',
    precompress: false,
    strict: false
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter,
		paths: {
			base: process.env.PUBLIC_BASE_PATH || ''
		},
		prerender: {
			entries: ['*'],
			handleHttpError: ({ path, referrer, message }) => {
				// Ignorar erros para arquivos específicos
				if (path === '/sitemap.xml' || path === '/robots.txt' || path.includes('/logo-lanche-da-si.png')) {
					return;
				}
				console.warn(`Prerender warning: ${message} for ${path}`);
			}
		}
	}
};

export default config;
