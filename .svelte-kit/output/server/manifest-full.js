export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","404.html","data/menu.json","favicon.ico","icons/icon-192-maskable.png","icons/icon-192.png","icons/icon-512-maskable.png","icons/icon-512.png","logo-lanche-da-si.png","logo.svg","manifest.json","sw.js"]),
	mimeTypes: {".html":"text/html",".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".js":"text/javascript"},
	_: {
		client: {start:"_app/immutable/entry/start.CopS4xTZ.js",app:"_app/immutable/entry/app.DpnTbANT.js",imports:["_app/immutable/entry/start.CopS4xTZ.js","_app/immutable/chunks/DcY6sxlp.js","_app/immutable/chunks/JQPz_MRN.js","_app/immutable/entry/app.DpnTbANT.js","_app/immutable/chunks/BOFEw3tB.js","_app/immutable/chunks/DcY6sxlp.js","_app/immutable/chunks/JQPz_MRN.js","_app/immutable/chunks/D9vLkFHD.js","_app/immutable/chunks/DDWrEf_9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/log",
				pattern: /^\/api\/log\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/log/_server.js'))
			},
			{
				id: "/api/menu",
				pattern: /^\/api\/menu\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/menu/_server.ts.js'))
			},
			{
				id: "/api/order",
				pattern: /^\/api\/order\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/order/_server.js'))
			},
			{
				id: "/cardapio",
				pattern: /^\/cardapio\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/contato",
				pattern: /^\/contato\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/gerenciar",
				pattern: /^\/gerenciar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/robots.txt",
				pattern: /^\/robots\.txt\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/robots.txt/_server.js'))
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.js'))
			},
			{
				id: "/sobre",
				pattern: /^\/sobre\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
