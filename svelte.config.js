import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/lanchedasi' : ''
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
