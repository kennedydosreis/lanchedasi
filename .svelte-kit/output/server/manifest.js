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
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
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
			}
		],
		prerendered_routes: new Set(["/","/data/menu.json","/cardapio","/contato","/robots.txt","/sitemap.xml","/sobre","/gerenciar/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
