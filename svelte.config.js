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
				if (path === '/sitemap.xml' || path === '/robots.txt') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
