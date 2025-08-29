import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
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
