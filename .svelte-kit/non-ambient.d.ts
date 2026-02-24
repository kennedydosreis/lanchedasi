
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/api" | "/api/log" | "/api/menu" | "/api/order" | "/cardapio" | "/contato" | "/gerenciar" | "/robots.txt" | "/sitemap.xml" | "/sobre";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/api": Record<string, never>;
			"/api/log": Record<string, never>;
			"/api/menu": Record<string, never>;
			"/api/order": Record<string, never>;
			"/cardapio": Record<string, never>;
			"/contato": Record<string, never>;
			"/gerenciar": Record<string, never>;
			"/robots.txt": Record<string, never>;
			"/sitemap.xml": Record<string, never>;
			"/sobre": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/log" | "/api/log/" | "/api/menu" | "/api/menu/" | "/api/order" | "/api/order/" | "/cardapio" | "/cardapio/" | "/contato" | "/contato/" | "/gerenciar" | "/gerenciar/" | "/robots.txt" | "/robots.txt/" | "/sitemap.xml" | "/sitemap.xml/" | "/sobre" | "/sobre/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/.nojekyll" | "/404.html" | "/data/menu.json" | "/favicon.ico" | "/icons/icon-192-maskable.png" | "/icons/icon-192.png" | "/icons/icon-512-maskable.png" | "/icons/icon-512.png" | "/logo-lanche-da-si.png" | "/logo.svg" | "/manifest.json" | "/sw.js" | string & {};
	}
}