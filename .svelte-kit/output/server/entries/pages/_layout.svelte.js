!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "440f30c3-99d2-4242-b6a6-c8037a24c86a", e._sentryDebugIdIdentifier = "sentry-dbid-440f30c3-99d2-4242-b6a6-c8037a24c86a");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, a as subscribe, b as add_attribute, e as each, d as escape, n as null_to_empty, v as validate_component } from "../../chunks/ssr.js";
import { b as base } from "../../chunks/paths.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index.js";
import { z } from "zod";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
const css$3 = {
  code: ".scroll-indicator.svelte-10qozhm.svelte-10qozhm{position:fixed;top:0;left:0;width:0%;height:4px;background:linear-gradient(90deg, var(--primary-color), var(--secondary-color));z-index:9999;transition:width 0.3s ease}.header.svelte-10qozhm.svelte-10qozhm{position:fixed;top:0;left:0;right:0;background:rgba(255, 255, 255, 0.95);backdrop-filter:blur(10px);border-bottom:1px solid var(--gray-200);z-index:1000;padding:var(--spacing-3) 0;transition:all 0.3s ease}.container.svelte-10qozhm.svelte-10qozhm{max-width:1200px;margin:0 auto;padding:0 var(--spacing-4)}.nav.svelte-10qozhm.svelte-10qozhm{display:flex;justify-content:space-between;align-items:center}.nav-brand.svelte-10qozhm.svelte-10qozhm{display:flex;align-items:center;gap:var(--spacing-3);font-size:var(--font-size-xl);font-weight:700;color:var(--secondary-color)}.brand-logo.svelte-10qozhm.svelte-10qozhm{width:40px;height:40px;object-fit:contain;border-radius:8px;transition:all 0.3s ease}.brand-logo-link.svelte-10qozhm.svelte-10qozhm{display:flex;align-items:center;gap:var(--spacing-3);transition:transform 0.3s ease;cursor:pointer;text-decoration:none;color:inherit}.brand-logo-link.svelte-10qozhm:hover .brand-logo.svelte-10qozhm{transform:scale(1.1);filter:brightness(1.1)}.brand-logo-link.svelte-10qozhm.svelte-10qozhm:hover{transform:translateY(-2px)}.brand-logo-link.svelte-10qozhm .brand-text.svelte-10qozhm{color:var(--secondary-color);transition:color 0.3s ease}.brand-logo-link.svelte-10qozhm:hover .brand-text.svelte-10qozhm{color:var(--primary-color)}.nav-links.svelte-10qozhm.svelte-10qozhm{display:flex;gap:var(--spacing-6);align-items:center}.nav-link.svelte-10qozhm.svelte-10qozhm{display:flex;align-items:center;gap:var(--spacing-2);text-decoration:none;color:var(--gray-700);font-weight:500;font-size:var(--font-size-sm);transition:all 0.3s ease;padding:var(--spacing-2) var(--spacing-3);border-radius:8px;white-space:nowrap;position:relative}.nav-link.svelte-10qozhm.svelte-10qozhm:hover{color:var(--secondary-color);background:var(--gray-50);transform:translateY(-1px)}.nav-link.active.svelte-10qozhm.svelte-10qozhm{color:var(--secondary-color);background:var(--primary-color);font-weight:600}.nav-link.active.svelte-10qozhm.svelte-10qozhm::after{content:'';position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);width:20px;height:2px;background:var(--secondary-color);border-radius:2px}.nav-link.svelte-10qozhm i.svelte-10qozhm{font-size:var(--font-size-base)}.nav-mobile-toggle.svelte-10qozhm.svelte-10qozhm{display:none;background:none;border:none;font-size:var(--font-size-xl);color:var(--gray-700);cursor:pointer;padding:var(--spacing-2);border-radius:8px;transition:all 0.3s ease}.nav-mobile-toggle.svelte-10qozhm.svelte-10qozhm:hover{background:var(--gray-50);color:var(--secondary-color)}@media(max-width: 768px){.nav-links.svelte-10qozhm.svelte-10qozhm{position:fixed;top:100%;left:0;right:0;background:var(--white);flex-direction:column;gap:0;padding:var(--spacing-4);border-top:1px solid var(--gray-200);box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1);transform:translateY(-100%);opacity:0;visibility:hidden;transition:all 0.3s ease}.nav-links.active.svelte-10qozhm.svelte-10qozhm{transform:translateY(0);opacity:1;visibility:visible}.nav-link.svelte-10qozhm.svelte-10qozhm{width:100%;padding:var(--spacing-3) var(--spacing-4);border-radius:0;border-bottom:1px solid var(--gray-100)}.nav-link.svelte-10qozhm.svelte-10qozhm:last-child{border-bottom:none}.nav-link.active.svelte-10qozhm.svelte-10qozhm::after{display:none}.nav-mobile-toggle.svelte-10qozhm.svelte-10qozhm{display:block}.header.svelte-10qozhm.svelte-10qozhm{padding:var(--spacing-2) 0}.nav-brand.svelte-10qozhm.svelte-10qozhm{font-size:var(--font-size-lg)}.brand-text.svelte-10qozhm.svelte-10qozhm{display:none}}:root{--primary-color:#ffedc5;--primary-hover:#ffd980;--secondary-color:#f59e0b;--accent-color:#10b981;--danger-color:#ef4444;--whatsapp-color:#25d366;--white:#ffffff;--gray-50:#f9fafb;--gray-100:#f3f4f6;--gray-200:#e5e7eb;--gray-300:#d1d5db;--gray-400:#9ca3af;--gray-500:#6b7280;--gray-600:#4b5563;--gray-700:#374151;--gray-800:#1f2937;--gray-900:#111827;--font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;--font-size-xs:0.75rem;--font-size-sm:0.875rem;--font-size-base:1rem;--font-size-lg:1.125rem;--font-size-xl:1.25rem;--font-size-2xl:1.5rem;--font-size-3xl:1.875rem;--font-size-4xl:2.25rem;--spacing-1:0.25rem;--spacing-2:0.5rem;--spacing-3:0.75rem;--spacing-4:1rem;--spacing-5:1.25rem;--spacing-6:1.5rem;--spacing-8:2rem;--spacing-10:2.5rem;--spacing-12:3rem}",
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\n    import { base } from '$app/paths';\\n    import { page } from '$app/stores';\\n\\n    /** @type {HTMLDivElement} */\\n    let scrollIndicator;\\n    let isMobileMenuOpen = false;\\n\\n    function updateScrollIndicator() {\\n        if (scrollIndicator) {\\n            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;\\n            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;\\n            const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;\\n            scrollIndicator.style.width = Math.min(scrollPercent, 100) + '%';\\n        }\\n    }\\n\\n    function toggleMobileMenu() {\\n        isMobileMenuOpen = !isMobileMenuOpen;\\n    }\\n\\n    function closeMobileMenu() {\\n        isMobileMenuOpen = false;\\n    }\\n\\n    // Adicionar event listener quando o componente for montado\\n    if (typeof window !== 'undefined') {\\n        window.addEventListener('scroll', updateScrollIndicator);\\n    }\\n\\n    const navItems = [\\n        { href: '/', icon: 'fas fa-home', label: 'Home' },\\n        { href: '/cardapio', icon: 'fas fa-utensils', label: 'Cardápio' },\\n        { href: '/sobre', icon: 'fas fa-info-circle', label: 'Sobre' },\\n        { href: '/contato', icon: 'fas fa-phone', label: 'Contato' }\\n    ];\\n\\n    $: currentPath = $page.url.pathname;\\n<\/script>\\n\\n<div class=\\"scroll-indicator\\" bind:this={scrollIndicator}></div>\\n\\n<header class=\\"header\\">\\n    <div class=\\"container\\">\\n        <nav class=\\"nav\\">\\n            <div class=\\"nav-brand\\">\\n                <a href=\\"/\\" class=\\"brand-logo-link\\">\\n                    <img\\n                        src=\\"{base}/logo-lanche-da-si.png\\"\\n                        alt=\\"Logo Lanche da Si\\"\\n                        class=\\"brand-logo\\"\\n                        on:error={(e) => {\\n                            if (e.target instanceof HTMLImageElement) {\\n                                e.target.src = \`\${base}/logo.svg\`;\\n                            }\\n                        }}\\n                    />\\n                    <span class=\\"brand-text\\">Lanche da Si</span>\\n                </a>\\n            </div>\\n\\n            <nav class=\\"nav-links\\" id=\\"nav-links\\" class:active={isMobileMenuOpen} aria-label=\\"Menu principal\\">\\n                {#each navItems as item}\\n                    <a \\n                        href={item.href} \\n                        class=\\"nav-link\\" \\n                        class:active={currentPath === item.href}\\n                        on:click={closeMobileMenu}\\n                        data-sveltekit-preload-data\\n                    >\\n                        <i class={item.icon} aria-hidden=\\"true\\"></i>\\n                        <span>{item.label}</span>\\n                    </a>\\n                {/each}\\n            </nav>\\n\\n            <button\\n                class=\\"nav-mobile-toggle\\"\\n                class:active={isMobileMenuOpen}\\n                on:click={toggleMobileMenu}\\n                aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}\\n                aria-expanded={isMobileMenuOpen}\\n                aria-controls=\\"nav-links\\"\\n            >\\n                <i class=\\"fas {isMobileMenuOpen ? 'fa-times' : 'fa-bars'}\\" aria-hidden=\\"true\\"></i>\\n            </button>\\n        </nav>\\n    </div>\\n</header>\\n\\n<style>\\n    .scroll-indicator {\\n        position: fixed;\\n        top: 0;\\n        left: 0;\\n        width: 0%;\\n        height: 4px;\\n        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));\\n        z-index: 9999;\\n        transition: width 0.3s ease;\\n    }\\n\\n    .header {\\n        position: fixed;\\n        top: 0;\\n        left: 0;\\n        right: 0;\\n        background: rgba(255, 255, 255, 0.95);\\n        backdrop-filter: blur(10px);\\n        border-bottom: 1px solid var(--gray-200);\\n        z-index: 1000;\\n        padding: var(--spacing-3) 0;\\n        transition: all 0.3s ease;\\n    }\\n\\n    .container {\\n        max-width: 1200px;\\n        margin: 0 auto;\\n        padding: 0 var(--spacing-4);\\n    }\\n\\n    .nav {\\n        display: flex;\\n        justify-content: space-between;\\n        align-items: center;\\n    }\\n\\n    .nav-brand {\\n        display: flex;\\n        align-items: center;\\n        gap: var(--spacing-3);\\n        font-size: var(--font-size-xl);\\n        font-weight: 700;\\n        color: var(--secondary-color);\\n    }\\n\\n    .brand-logo {\\n        width: 40px;\\n        height: 40px;\\n        object-fit: contain;\\n        border-radius: 8px;\\n        transition: all 0.3s ease;\\n    }\\n\\n    .brand-logo-link {\\n        display: flex;\\n        align-items: center;\\n        gap: var(--spacing-3);\\n        transition: transform 0.3s ease;\\n        cursor: pointer;\\n        text-decoration: none;\\n        color: inherit;\\n    }\\n\\n    .brand-logo-link:hover .brand-logo {\\n        transform: scale(1.1);\\n        filter: brightness(1.1);\\n    }\\n\\n    .brand-logo-link:hover {\\n        transform: translateY(-2px);\\n    }\\n\\n    .brand-logo-link .brand-text {\\n        color: var(--secondary-color);\\n        transition: color 0.3s ease;\\n    }\\n\\n    .brand-logo-link:hover .brand-text {\\n        color: var(--primary-color);\\n    }\\n\\n    .nav-links {\\n        display: flex;\\n        gap: var(--spacing-6);\\n        align-items: center;\\n    }\\n\\n    .nav-link {\\n        display: flex;\\n        align-items: center;\\n        gap: var(--spacing-2);\\n        text-decoration: none;\\n        color: var(--gray-700);\\n        font-weight: 500;\\n        font-size: var(--font-size-sm);\\n        transition: all 0.3s ease;\\n        padding: var(--spacing-2) var(--spacing-3);\\n        border-radius: 8px;\\n        white-space: nowrap;\\n        position: relative;\\n    }\\n\\n    .nav-link:hover {\\n        color: var(--secondary-color);\\n        background: var(--gray-50);\\n        transform: translateY(-1px);\\n    }\\n\\n    .nav-link.active {\\n        color: var(--secondary-color);\\n        background: var(--primary-color);\\n        font-weight: 600;\\n    }\\n\\n    .nav-link.active::after {\\n        content: '';\\n        position: absolute;\\n        bottom: -4px;\\n        left: 50%;\\n        transform: translateX(-50%);\\n        width: 20px;\\n        height: 2px;\\n        background: var(--secondary-color);\\n        border-radius: 2px;\\n    }\\n\\n    .nav-link i {\\n        font-size: var(--font-size-base);\\n    }\\n\\n    .nav-mobile-toggle {\\n        display: none;\\n        background: none;\\n        border: none;\\n        font-size: var(--font-size-xl);\\n        color: var(--gray-700);\\n        cursor: pointer;\\n        padding: var(--spacing-2);\\n        border-radius: 8px;\\n        transition: all 0.3s ease;\\n    }\\n\\n    .nav-mobile-toggle:hover {\\n        background: var(--gray-50);\\n        color: var(--secondary-color);\\n    }\\n\\n    @media (max-width: 768px) {\\n        .nav-links {\\n            position: fixed;\\n            top: 100%;\\n            left: 0;\\n            right: 0;\\n            background: var(--white);\\n            flex-direction: column;\\n            gap: 0;\\n            padding: var(--spacing-4);\\n            border-top: 1px solid var(--gray-200);\\n            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\\n            transform: translateY(-100%);\\n            opacity: 0;\\n            visibility: hidden;\\n            transition: all 0.3s ease;\\n        }\\n\\n        .nav-links.active {\\n            transform: translateY(0);\\n            opacity: 1;\\n            visibility: visible;\\n        }\\n\\n        .nav-link {\\n            width: 100%;\\n            padding: var(--spacing-3) var(--spacing-4);\\n            border-radius: 0;\\n            border-bottom: 1px solid var(--gray-100);\\n        }\\n\\n        .nav-link:last-child {\\n            border-bottom: none;\\n        }\\n\\n        .nav-link.active::after {\\n            display: none;\\n        }\\n\\n        .nav-mobile-toggle {\\n            display: block;\\n        }\\n\\n        .header {\\n            padding: var(--spacing-2) 0;\\n        }\\n\\n        .nav-brand {\\n            font-size: var(--font-size-lg);\\n        }\\n\\n        .brand-text {\\n            display: none;\\n        }\\n    }\\n\\n    :global(:root) {\\n        --primary-color: #ffedc5;\\n        --primary-hover: #ffd980;\\n        --secondary-color: #f59e0b;\\n        --accent-color: #10b981;\\n        --danger-color: #ef4444;\\n        --whatsapp-color: #25d366;\\n        --white: #ffffff;\\n        --gray-50: #f9fafb;\\n        --gray-100: #f3f4f6;\\n        --gray-200: #e5e7eb;\\n        --gray-300: #d1d5db;\\n        --gray-400: #9ca3af;\\n        --gray-500: #6b7280;\\n        --gray-600: #4b5563;\\n        --gray-700: #374151;\\n        --gray-800: #1f2937;\\n        --gray-900: #111827;\\n        --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\\n        --font-size-xs: 0.75rem;\\n        --font-size-sm: 0.875rem;\\n        --font-size-base: 1rem;\\n        --font-size-lg: 1.125rem;\\n        --font-size-xl: 1.25rem;\\n        --font-size-2xl: 1.5rem;\\n        --font-size-3xl: 1.875rem;\\n        --font-size-4xl: 2.25rem;\\n        --spacing-1: 0.25rem;\\n        --spacing-2: 0.5rem;\\n        --spacing-3: 0.75rem;\\n        --spacing-4: 1rem;\\n        --spacing-5: 1.25rem;\\n        --spacing-6: 1.5rem;\\n        --spacing-8: 2rem;\\n        --spacing-10: 2.5rem;\\n        --spacing-12: 3rem;\\n    }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentPath;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let scrollIndicator;
  let isMobileMenuOpen = false;
  function updateScrollIndicator() {
  }
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", updateScrollIndicator);
  }
  const navItems = [
    {
      href: "/",
      icon: "fas fa-home",
      label: "Home"
    },
    {
      href: "/cardapio",
      icon: "fas fa-utensils",
      label: "Cardápio"
    },
    {
      href: "/sobre",
      icon: "fas fa-info-circle",
      label: "Sobre"
    },
    {
      href: "/contato",
      icon: "fas fa-phone",
      label: "Contato"
    }
  ];
  $$result.css.add(css$3);
  currentPath = $page.url.pathname;
  $$unsubscribe_page();
  return `<div class="scroll-indicator svelte-10qozhm"${add_attribute("this", scrollIndicator, 0)}></div> <header class="header svelte-10qozhm"><div class="container svelte-10qozhm"><nav class="nav svelte-10qozhm"><div class="nav-brand svelte-10qozhm"><a href="/" class="brand-logo-link svelte-10qozhm"><img src="${escape(base, true) + "/logo-lanche-da-si.png"}" alt="Logo Lanche da Si" class="brand-logo svelte-10qozhm"> <span class="brand-text svelte-10qozhm" data-svelte-h="svelte-120636">Lanche da Si</span></a></div> <nav class="${["nav-links svelte-10qozhm", ""].join(" ").trim()}" id="nav-links" aria-label="Menu principal">${each(navItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${["nav-link svelte-10qozhm", currentPath === item.href ? "active" : ""].join(" ").trim()}" data-sveltekit-preload-data><i class="${escape(null_to_empty(item.icon), true) + " svelte-10qozhm"}" aria-hidden="true"></i> <span>${escape(item.label)}</span> </a>`;
  })}</nav> <button class="${["nav-mobile-toggle svelte-10qozhm", ""].join(" ").trim()}"${add_attribute(
    "aria-label",
    "Abrir menu de navegação",
    0
  )}${add_attribute("aria-expanded", isMobileMenuOpen, 0)} aria-controls="nav-links"><i class="${"fas " + escape("fa-bars", true)}" aria-hidden="true"></i></button></nav></div> </header>`;
});
const css$2 = {
  code: ".footer.svelte-x5piw8.svelte-x5piw8{background:var(--gray-900);color:var(--gray-200);padding:var(--spacing-12) 0 var(--spacing-6) 0;margin-top:auto}.container.svelte-x5piw8.svelte-x5piw8{max-width:1200px;margin:0 auto;padding:0 var(--spacing-4)}.bento-footer.svelte-x5piw8.svelte-x5piw8{display:grid;grid-template-columns:repeat(4, 1fr);grid-template-rows:auto auto;gap:var(--spacing-4);margin-bottom:var(--spacing-12)}.footer-card.svelte-x5piw8.svelte-x5piw8{background:var(--gray-800);border-radius:24px;padding:var(--spacing-6);border:1px solid var(--gray-700);display:flex;flex-direction:column;transition:transform 0.3s ease, border-color 0.3s ease}.footer-card.svelte-x5piw8.svelte-x5piw8:hover{border-color:var(--primary-color);transform:translateY(-4px)}.brand-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 2;grid-row:span 1;justify-content:center}.hours-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 1}.cta-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 1;grid-row:span 2;background:linear-gradient(135deg, var(--gray-800) 0%, #1e293b 100%);border:1px solid var(--secondary-color);justify-content:space-between}.nav-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 3;flex-direction:row;align-items:center;justify-content:space-between;padding:var(--spacing-4) var(--spacing-8)}.footer-title.svelte-x5piw8.svelte-x5piw8{font-size:2rem;font-weight:800;color:var(--primary-color);margin-bottom:var(--spacing-2)}.footer-description.svelte-x5piw8.svelte-x5piw8{color:var(--gray-400);max-width:400px}.card-title.svelte-x5piw8.svelte-x5piw8{font-size:var(--font-size-lg);font-weight:700;color:var(--white);margin-bottom:var(--spacing-4)}.card-icon.svelte-x5piw8.svelte-x5piw8{font-size:1.5rem;color:var(--primary-color);margin-bottom:var(--spacing-4)}.social-links.svelte-x5piw8.svelte-x5piw8{display:flex;gap:var(--spacing-3);margin-top:var(--spacing-6)}.social-link.svelte-x5piw8.svelte-x5piw8{width:44px;height:44px;border-radius:12px;background:var(--gray-700);display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem;transition:all 0.3s ease}.social-link.svelte-x5piw8.svelte-x5piw8:hover{background:var(--primary-color);color:var(--gray-900)}.hours-info.svelte-x5piw8 p.svelte-x5piw8{margin:0;line-height:1.4}.closed-badge.svelte-x5piw8.svelte-x5piw8{display:inline-block;margin-top:var(--spacing-4);padding:4px 12px;background:rgba(239, 68, 68, 0.1);color:#f87171;border-radius:20px;font-size:0.8rem;font-weight:600}.cta-button.svelte-x5piw8.svelte-x5piw8{display:block;width:100%;padding:var(--spacing-4);background:var(--secondary-color);color:white;text-align:center;text-decoration:none;border-radius:16px;font-weight:700;margin-top:var(--spacing-4);transition:all 0.3s ease}.cta-button.svelte-x5piw8.svelte-x5piw8:hover{background:#d97706;box-shadow:0 4px 15px rgba(245, 158, 11, 0.3)}.footer-nav.svelte-x5piw8.svelte-x5piw8{display:flex;gap:var(--spacing-8)}.footer-link.svelte-x5piw8.svelte-x5piw8{color:var(--gray-400);text-decoration:none;font-weight:600;transition:color 0.3s}.footer-link.svelte-x5piw8.svelte-x5piw8:hover{color:var(--primary-color)}.footer-bottom.svelte-x5piw8.svelte-x5piw8{border-top:1px solid var(--gray-800);padding-top:var(--spacing-8);display:flex;justify-content:space-between;align-items:center;color:var(--gray-500);font-size:var(--font-size-sm)}.heart.svelte-x5piw8.svelte-x5piw8{color:var(--danger-color);display:inline-block;animation:svelte-x5piw8-heartbeat 1.5s ease-in-out infinite}@keyframes svelte-x5piw8-heartbeat{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}@media(max-width: 1024px){.bento-footer.svelte-x5piw8.svelte-x5piw8{grid-template-columns:repeat(2, 1fr)}.nav-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 2}}@media(max-width: 640px){.bento-footer.svelte-x5piw8.svelte-x5piw8{grid-template-columns:1fr}.brand-card.svelte-x5piw8.svelte-x5piw8,.hours-card.svelte-x5piw8.svelte-x5piw8,.cta-card.svelte-x5piw8.svelte-x5piw8,.nav-card.svelte-x5piw8.svelte-x5piw8{grid-column:span 1;grid-row:span 1}.nav-card.svelte-x5piw8.svelte-x5piw8{flex-direction:column;gap:var(--spacing-4)}.footer-nav.svelte-x5piw8.svelte-x5piw8{flex-direction:column;gap:var(--spacing-2);align-items:center}.footer-bottom.svelte-x5piw8.svelte-x5piw8{flex-direction:column;gap:var(--spacing-4);text-align:center}}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<script>\\n    const whatsappNumber = '5511999999999'; // Número placeholder\\n    const whatsappLink = \`https://wa.me/\${whatsappNumber}\`;\\n    \\n    const currentYear = new Date().getFullYear();\\n\\n    const socialLinks = [\\n        { icon: 'fab fa-facebook', href: '#', label: 'Facebook' },\\n        { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },\\n        { icon: 'fab fa-whatsapp', href: whatsappLink, label: 'WhatsApp' }\\n    ];\\n\\n    const navLinks = [\\n        { href: '/', label: 'Home' },\\n        { href: '/cardapio', label: 'Cardápio' },\\n        { href: '/sobre', label: 'Sobre' },\\n        { href: '/contato', label: 'Contato' }\\n    ];\\n<\/script>\\n\\n<footer class=\\"footer\\">\\n    <div class=\\"container\\">\\n        <div class=\\"bento-footer\\">\\n            <!-- Card Principal: Marca -->\\n            <div class=\\"footer-card brand-card\\">\\n                <h3 class=\\"footer-title\\">Lanche da Si</h3>\\n                <p class=\\"footer-description\\">\\n                    Tradição e sabor em cada lanche. Preparamos com carinho para você e sua família.\\n                </p>\\n                <div class=\\"social-links\\">\\n                    {#each socialLinks as social}\\n                        <a \\n                            href={social.href} \\n                            class=\\"social-link\\" \\n                            target=\\"_blank\\" \\n                            rel=\\"noopener noreferrer\\"\\n                            aria-label={social.label}\\n                        >\\n                            <i class={social.icon}></i>\\n                        </a>\\n                    {/each}\\n                </div>\\n            </div>\\n\\n            <!-- Card: Horário -->\\n            <div class=\\"footer-card hours-card\\">\\n                <div class=\\"card-icon\\"><i class=\\"fas fa-clock\\"></i></div>\\n                <h4 class=\\"card-title\\">Horários</h4>\\n                <div class=\\"hours-info\\">\\n                    <p><strong>Quarta a Domingo</strong></p>\\n                    <p>18h às 23h</p>\\n                    <span class=\\"closed-badge\\">Segunda e terça fechado</span>\\n                </div>\\n            </div>\\n\\n            <!-- Card: CTA WhatsApp -->\\n            <div class=\\"footer-card cta-card\\">\\n                <div class=\\"card-icon\\"><i class=\\"fab fa-whatsapp\\"></i></div>\\n                <h4 class=\\"card-title\\">Peça Agora</h4>\\n                <p>Bateu a fome? Peça pelo WhatsApp e receba em casa.</p>\\n                <a href={whatsappLink} target=\\"_blank\\" rel=\\"noopener noreferrer\\" class=\\"cta-button\\">\\n                    Fazer Pedido\\n                </a>\\n            </div>\\n\\n            <!-- Card: Navegação -->\\n            <div class=\\"footer-card nav-card\\">\\n                <h4 class=\\"card-title\\">Explorar</h4>\\n                <nav class=\\"footer-nav\\">\\n                    {#each navLinks as link}\\n                        <a href={link.href} class=\\"footer-link\\" data-sveltekit-preload-data>\\n                            {link.label}\\n                        </a>\\n                    {/each}\\n                </nav>\\n            </div>\\n        </div>\\n\\n        <div class=\\"footer-bottom\\">\\n            <p>&copy; {currentYear} Lanche da Si. Todos os direitos reservados.</p>\\n            <p class=\\"made-with\\">\\n                Feito com <span class=\\"heart\\">❤️</span> para você\\n            </p>\\n        </div>\\n    </div>\\n</footer>\\n\\n<style>\\n    .footer {\\n        background: var(--gray-900);\\n        color: var(--gray-200);\\n        padding: var(--spacing-12) 0 var(--spacing-6) 0;\\n        margin-top: auto;\\n    }\\n\\n    .container {\\n        max-width: 1200px;\\n        margin: 0 auto;\\n        padding: 0 var(--spacing-4);\\n    }\\n\\n    .bento-footer {\\n        display: grid;\\n        grid-template-columns: repeat(4, 1fr);\\n        grid-template-rows: auto auto;\\n        gap: var(--spacing-4);\\n        margin-bottom: var(--spacing-12);\\n    }\\n\\n    .footer-card {\\n        background: var(--gray-800);\\n        border-radius: 24px;\\n        padding: var(--spacing-6);\\n        border: 1px solid var(--gray-700);\\n        display: flex;\\n        flex-direction: column;\\n        transition: transform 0.3s ease, border-color 0.3s ease;\\n    }\\n\\n    .footer-card:hover {\\n        border-color: var(--primary-color);\\n        transform: translateY(-4px);\\n    }\\n\\n    /* Layout do Grid */\\n    .brand-card {\\n        grid-column: span 2;\\n        grid-row: span 1;\\n        justify-content: center;\\n    }\\n\\n    .hours-card {\\n        grid-column: span 1;\\n    }\\n\\n    .cta-card {\\n        grid-column: span 1;\\n        grid-row: span 2;\\n        background: linear-gradient(135deg, var(--gray-800) 0%, #1e293b 100%);\\n        border: 1px solid var(--secondary-color);\\n        justify-content: space-between;\\n    }\\n\\n    .nav-card {\\n        grid-column: span 3;\\n        flex-direction: row;\\n        align-items: center;\\n        justify-content: space-between;\\n        padding: var(--spacing-4) var(--spacing-8);\\n    }\\n\\n    /* Elementos Internos */\\n    .footer-title {\\n        font-size: 2rem;\\n        font-weight: 800;\\n        color: var(--primary-color);\\n        margin-bottom: var(--spacing-2);\\n    }\\n\\n    .footer-description {\\n        color: var(--gray-400);\\n        max-width: 400px;\\n    }\\n\\n    .card-title {\\n        font-size: var(--font-size-lg);\\n        font-weight: 700;\\n        color: var(--white);\\n        margin-bottom: var(--spacing-4);\\n    }\\n\\n    .card-icon {\\n        font-size: 1.5rem;\\n        color: var(--primary-color);\\n        margin-bottom: var(--spacing-4);\\n    }\\n\\n    .social-links {\\n        display: flex;\\n        gap: var(--spacing-3);\\n        margin-top: var(--spacing-6);\\n    }\\n\\n    .social-link {\\n        width: 44px;\\n        height: 44px;\\n        border-radius: 12px;\\n        background: var(--gray-700);\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        color: white;\\n        font-size: 1.2rem;\\n        transition: all 0.3s ease;\\n    }\\n\\n    .social-link:hover {\\n        background: var(--primary-color);\\n        color: var(--gray-900);\\n    }\\n\\n    .hours-info p {\\n        margin: 0;\\n        line-height: 1.4;\\n    }\\n\\n    .closed-badge {\\n        display: inline-block;\\n        margin-top: var(--spacing-4);\\n        padding: 4px 12px;\\n        background: rgba(239, 68, 68, 0.1);\\n        color: #f87171;\\n        border-radius: 20px;\\n        font-size: 0.8rem;\\n        font-weight: 600;\\n    }\\n\\n    .cta-button {\\n        display: block;\\n        width: 100%;\\n        padding: var(--spacing-4);\\n        background: var(--secondary-color);\\n        color: white;\\n        text-align: center;\\n        text-decoration: none;\\n        border-radius: 16px;\\n        font-weight: 700;\\n        margin-top: var(--spacing-4);\\n        transition: all 0.3s ease;\\n    }\\n\\n    .cta-button:hover {\\n        background: #d97706;\\n        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);\\n    }\\n\\n    .footer-nav {\\n        display: flex;\\n        gap: var(--spacing-8);\\n    }\\n\\n    .footer-link {\\n        color: var(--gray-400);\\n        text-decoration: none;\\n        font-weight: 600;\\n        transition: color 0.3s;\\n    }\\n\\n    .footer-link:hover {\\n        color: var(--primary-color);\\n    }\\n\\n    .footer-bottom {\\n        border-top: 1px solid var(--gray-800);\\n        padding-top: var(--spacing-8);\\n        display: flex;\\n        justify-content: space-between;\\n        align-items: center;\\n        color: var(--gray-500);\\n        font-size: var(--font-size-sm);\\n    }\\n\\n    .heart {\\n        color: var(--danger-color);\\n        display: inline-block;\\n        animation: heartbeat 1.5s ease-in-out infinite;\\n    }\\n\\n    @keyframes heartbeat {\\n        0%, 100% { transform: scale(1); }\\n        50% { transform: scale(1.1); }\\n    }\\n\\n    /* Mobile First Adjustments */\\n    @media (max-width: 1024px) {\\n        .bento-footer {\\n            grid-template-columns: repeat(2, 1fr);\\n        }\\n        .nav-card {\\n            grid-column: span 2;\\n        }\\n    }\\n\\n    @media (max-width: 640px) {\\n        .bento-footer {\\n            grid-template-columns: 1fr;\\n        }\\n        .brand-card, .hours-card, .cta-card, .nav-card {\\n            grid-column: span 1;\\n            grid-row: span 1;\\n        }\\n        .nav-card {\\n            flex-direction: column;\\n            gap: var(--spacing-4);\\n        }\\n        .footer-nav {\\n            flex-direction: column;\\n            gap: var(--spacing-2);\\n            align-items: center;\\n        }\\n        .footer-bottom {\\n            flex-direction: column;\\n            gap: var(--spacing-4);\\n            text-align: center;\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const whatsappNumber = "5511999999999";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const socialLinks = [
    {
      icon: "fab fa-facebook",
      href: "#",
      label: "Facebook"
    },
    {
      icon: "fab fa-instagram",
      href: "#",
      label: "Instagram"
    },
    {
      icon: "fab fa-whatsapp",
      href: whatsappLink,
      label: "WhatsApp"
    }
  ];
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/cardapio", label: "Cardápio" },
    { href: "/sobre", label: "Sobre" },
    { href: "/contato", label: "Contato" }
  ];
  $$result.css.add(css$2);
  return `<footer class="footer svelte-x5piw8"><div class="container svelte-x5piw8"><div class="bento-footer svelte-x5piw8"> <div class="footer-card brand-card svelte-x5piw8"><h3 class="footer-title svelte-x5piw8" data-svelte-h="svelte-108t5m3">Lanche da Si</h3> <p class="footer-description svelte-x5piw8" data-svelte-h="svelte-1soxf4o">Tradição e sabor em cada lanche. Preparamos com carinho para você e sua família.</p> <div class="social-links svelte-x5piw8">${each(socialLinks, (social) => {
    return `<a${add_attribute("href", social.href, 0)} class="social-link svelte-x5piw8" target="_blank" rel="noopener noreferrer"${add_attribute("aria-label", social.label, 0)}><i class="${escape(null_to_empty(social.icon), true) + " svelte-x5piw8"}"></i> </a>`;
  })}</div></div>  <div class="footer-card hours-card svelte-x5piw8" data-svelte-h="svelte-fgvbiq"><div class="card-icon svelte-x5piw8"><i class="fas fa-clock"></i></div> <h4 class="card-title svelte-x5piw8">Horários</h4> <div class="hours-info svelte-x5piw8"><p class="svelte-x5piw8"><strong>Quarta a Domingo</strong></p> <p class="svelte-x5piw8">18h às 23h</p> <span class="closed-badge svelte-x5piw8">Segunda e terça fechado</span></div></div>  <div class="footer-card cta-card svelte-x5piw8"><div class="card-icon svelte-x5piw8" data-svelte-h="svelte-gbnkdy"><i class="fab fa-whatsapp"></i></div> <h4 class="card-title svelte-x5piw8" data-svelte-h="svelte-lhsbzj">Peça Agora</h4> <p data-svelte-h="svelte-ci3my8">Bateu a fome? Peça pelo WhatsApp e receba em casa.</p> <a${add_attribute("href", whatsappLink, 0)} target="_blank" rel="noopener noreferrer" class="cta-button svelte-x5piw8">Fazer Pedido</a></div>  <div class="footer-card nav-card svelte-x5piw8"><h4 class="card-title svelte-x5piw8" data-svelte-h="svelte-1ltl9bn">Explorar</h4> <nav class="footer-nav svelte-x5piw8">${each(navLinks, (link) => {
    return `<a${add_attribute("href", link.href, 0)} class="footer-link svelte-x5piw8" data-sveltekit-preload-data>${escape(link.label)} </a>`;
  })}</nav></div></div> <div class="footer-bottom svelte-x5piw8"><p>© ${escape(currentYear)} Lanche da Si. Todos os direitos reservados.</p> <p class="made-with" data-svelte-h="svelte-vi0o0u">Feito com <span class="heart svelte-x5piw8">❤️</span> para você</p></div></div> </footer>`;
});
const MIN_QTY = 1;
const MAX_QTY = 10;
function sanitizeQuantity(qty) {
  const num = Number(qty);
  if (isNaN(num)) return MIN_QTY;
  if (!isFinite(num)) return num > 0 ? MAX_QTY : MIN_QTY;
  return Math.max(MIN_QTY, Math.min(MAX_QTY, Math.floor(num)));
}
const CART_STORAGE_KEY = "lanchedasi_cart";
class CartRepository {
  /**
   * @returns {any[]}
   */
  static getCart() {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
      return [];
    }
  }
  /**
   * @param {any[]} items 
   */
  static saveCart(items) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }
  static clearCart() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}
class PriceService {
  /**
   * Calcula o valor total de uma lista de itens do carrinho.
   * @param {Array} cartItems - Lista de itens com preço e quantidade.
   * @returns {number} O valor total formatado numericamente.
   */
  static calculateTotal(cartItems) {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = sanitizeQuantity(item.quantity);
      return total + price * quantity;
    }, 0);
  }
  /**
   * Calcula a quantidade total de itens no carrinho.
   * @param {Array} cartItems - Lista de itens do carrinho.
   * @returns {number} A soma de todas as quantidades.
   */
  static calculateItemCount(cartItems) {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((count, item) => {
      const quantity = sanitizeQuantity(item.quantity);
      return count + quantity;
    }, 0);
  }
  /**
   * Formata um valor numérico para o padrão de moeda BRL (R$).
   * @param {number} value - O valor a ser formatado.
   * @returns {string} O valor formatado como moeda.
   */
  static formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  }
}
function createCart() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    set,
    update,
    init: () => {
      const initialCart = CartRepository.getCart();
      set(initialCart);
    },
    addItem: (item) => update((cart2) => {
      if (!item || !item.id || !item.name || item.price === void 0 || item.isAvailable === false) {
        console.warn("Item not available or invalid:", item);
        return cart2;
      }
      const existingItemIndex = cart2.findIndex((cartItem) => cartItem.id === item.id);
      let newCart;
      if (existingItemIndex !== -1) {
        newCart = [...cart2];
        const newQuantity = sanitizeQuantity(newCart[existingItemIndex].quantity + 1);
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newQuantity };
      } else {
        newCart = [...cart2, { ...item, quantity: 1 }];
      }
      CartRepository.saveCart(newCart);
      return newCart;
    }),
    removeItem: (id) => update((cart2) => {
      const newCart = cart2.filter((item) => item.id !== id);
      CartRepository.saveCart(newCart);
      return newCart;
    }),
    updateQuantity: (id, quantity) => update((cart2) => {
      let newCart;
      const num = Number(quantity);
      if (!isNaN(num) && isFinite(num) && num <= 0) {
        newCart = cart2.filter((item) => item.id !== id);
      } else {
        const safeQuantity = sanitizeQuantity(quantity);
        newCart = cart2.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: safeQuantity };
          }
          return item;
        });
      }
      CartRepository.saveCart(newCart);
      return newCart;
    }),
    clear: () => {
      CartRepository.clearCart();
      set([]);
    },
    getTotal: (cartItems) => PriceService.calculateTotal(cartItems),
    getItemCount: (cartItems) => PriceService.calculateItemCount(cartItems)
  };
}
const cart = createCart();
async function reverseGeocode(lat, lng) {
  try {
    const nominatimResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=pt-BR,pt,en`,
      { headers: { "User-Agent": "LancheDaSi/1.0" } }
    );
    if (nominatimResponse.ok) {
      const addr = (await nominatimResponse.json()).address;
      if (addr) {
        const parts = [
          addr.house_number && addr.road ? `${addr.road}, ${addr.house_number}` : addr.road || addr.street || addr.pedestrian,
          addr.neighbourhood || addr.suburb || addr.quarter || addr.district,
          addr.city || addr.town || addr.village || addr.municipality,
          addr.state
        ].filter(Boolean);
        if (parts.length >= 2) return parts.join(", ");
      }
    }
    const bdcResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=pt`);
    if (bdcResponse.ok) {
      const data = await bdcResponse.json();
      const parts = [];
      if (data.localityInfo?.administrative) {
        const admin = data.localityInfo.administrative.sort((a, b) => (b.adminLevel || 0) - (a.adminLevel || 0));
        const street = admin.find((i) => i.adminLevel >= 8);
        if (street) parts.push(street.name);
        const neighborhood = admin.find((i) => i.adminLevel >= 6 && i.adminLevel <= 7 && i.name !== street?.name);
        if (neighborhood) parts.push(neighborhood.name);
      }
      parts.push(data.city || data.locality, data.principalSubdivision);
      const filtered = parts.filter(Boolean);
      if (filtered.length >= 2) return filtered.join(", ");
    }
  } catch (e) {
    console.error("Geocoding error", e);
  }
  return `Localização: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}
async function geocodeAddress(address) {
  try {
    const query = encodeURIComponent(address + ", Manaus, Amazonas, Brasil");
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&countrycodes=br`, {
      headers: { "User-Agent": "LancheDaSi/1.0" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch (e) {
    console.error("GeocodeAddress error", e);
  }
  return null;
}
const STORE_LOCATION = {
  lat: -3.0796612,
  lng: -60.0481757
};
const DELIVERY_CONFIG = {
  freeDeliveryDistance: 3,
  pricePerKm: 2.5,
  maxDeliveryDistance: 15
};
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 100) / 100;
}
function calculateDeliveryFee(distance) {
  if (distance <= DELIVERY_CONFIG.freeDeliveryDistance) return 0;
  return Math.ceil(distance - DELIVERY_CONFIG.freeDeliveryDistance) * DELIVERY_CONFIG.pricePerKm;
}
function createOrderInfo() {
  const initialState = {
    observations: "",
    location: null,
    address: "",
    distance: null,
    deliveryFee: 0,
    canDeliver: true,
    isLoadingLocation: false
  };
  const { subscribe: subscribe2, set, update } = writable(initialState);
  return {
    subscribe: subscribe2,
    set,
    update,
    setObservations: (observations) => update((state) => ({ ...state, observations })),
    setAddress: (address) => update((state) => ({ ...state, address })),
    setManualAddress: (address) => {
      update((state) => ({ ...state, address, location: null, distance: null, deliveryFee: 0, canDeliver: true, isLoadingLocation: false }));
    },
    setAddressWithGeocode: async (address) => {
      update((state) => ({ ...state, isLoadingLocation: true }));
      const coords = await geocodeAddress(address);
      if (coords) {
        const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, coords.lat, coords.lng);
        const deliveryFee = calculateDeliveryFee(distance);
        const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
        update((state) => ({ ...state, address, location: { latitude: coords.lat, longitude: coords.lng, accuracy: null }, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
        return { success: true, distance, deliveryFee, canDeliver };
      }
      update((state) => ({ ...state, address, location: null, distance: null, deliveryFee: 0, canDeliver: true, isLoadingLocation: false }));
      return { success: true, distance: null, deliveryFee: 0, canDeliver: true };
    },
    setLocation: (location) => {
      const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
      const deliveryFee = calculateDeliveryFee(distance);
      const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
      update((state) => ({ ...state, location, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
    },
    setLoadingLocation: (isLoading) => update((state) => ({ ...state, isLoadingLocation: isLoading })),
    clear: () => set(initialState),
    getLocationAsync: async () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocalização não é suportada pelo navegador"));
          return;
        }
        update((state) => ({ ...state, isLoadingLocation: true }));
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const location = { latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy };
            const distance = calculateDistance(STORE_LOCATION.lat, STORE_LOCATION.lng, location.latitude, location.longitude);
            const deliveryFee = calculateDeliveryFee(distance);
            const canDeliver = distance <= DELIVERY_CONFIG.maxDeliveryDistance;
            try {
              const address = await reverseGeocode(location.latitude, location.longitude);
              update((state) => ({ ...state, location, address, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
              resolve({ location, address, distance, deliveryFee, canDeliver });
            } catch (error) {
              const fallbackAddress = `Localização: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;
              update((state) => ({ ...state, location, address: fallbackAddress, distance, deliveryFee, canDeliver, isLoadingLocation: false }));
              resolve({ location, address: fallbackAddress, distance, deliveryFee, canDeliver });
            }
          },
          (error) => {
            update((state) => ({ ...state, isLoadingLocation: false }));
            reject(new Error("Erro ao obter localização"));
          },
          { enableHighAccuracy: true, timeout: 15e3, maximumAge: 6e4 }
        );
      });
    }
  };
}
const orderInfo = createOrderInfo();
z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(10, "Informe um telefone válido (DDD + Número)"),
  address: z.string().min(5, "Informe o endereço completo"),
  paymentMethod: z.enum(["dinheiro", "pix", "cartao"]),
  change: z.string().optional()
});
const css$1 = {
  code: ".cart-container.svelte-dnveis.svelte-dnveis{position:fixed;bottom:var(--spacing-6);right:var(--spacing-6);z-index:1000}.cart-toggle.svelte-dnveis.svelte-dnveis{background:var(--secondary-color);color:var(--white);border:none;width:60px;height:60px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:var(--font-size-xl);box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:all 0.3s ease;position:relative}.cart-toggle.has-items.svelte-dnveis.svelte-dnveis{animation:svelte-dnveis-pulse 2s infinite}.cart-badge.svelte-dnveis.svelte-dnveis{position:absolute;top:-8px;right:-8px;background:var(--danger-color);color:var(--white);border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:var(--font-size-xs);font-weight:bold}.cart-overlay.svelte-dnveis.svelte-dnveis{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:998}.cart-panel.svelte-dnveis.svelte-dnveis{position:fixed;top:0;right:0;width:400px;height:100vh;background:var(--white);z-index:999;display:flex;flex-direction:column;box-shadow:-4px 0 20px rgba(0,0,0,0.1);overflow:hidden}.cart-header.svelte-dnveis.svelte-dnveis{display:flex;justify-content:space-between;align-items:center;padding:var(--spacing-6);border-bottom:1px solid var(--gray-200)}.cart-header.svelte-dnveis h3.svelte-dnveis{margin:0;font-size:var(--font-size-2xl);font-weight:700}.close-btn.svelte-dnveis.svelte-dnveis{background:none;border:none;font-size:var(--font-size-xl);color:var(--gray-500);cursor:pointer}.cart-content.svelte-dnveis.svelte-dnveis{flex:1;display:flex;flex-direction:column;overflow:hidden}.empty-cart.svelte-dnveis.svelte-dnveis{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--gray-500)}.empty-cart.svelte-dnveis i.svelte-dnveis{font-size:4rem}.cart-items.svelte-dnveis.svelte-dnveis{flex:1;overflow-y:auto;padding:var(--spacing-4)}.order-details.svelte-dnveis.svelte-dnveis{padding:var(--spacing-6);border-top:1px solid var(--gray-200);background:var(--gray-50);flex-shrink:0;max-height:300px;overflow-y:auto}.cart-footer.svelte-dnveis.svelte-dnveis{padding:var(--spacing-6);border-top:1px solid var(--gray-200);background:var(--gray-50);flex-shrink:0}.order-summary.svelte-dnveis.svelte-dnveis{background:var(--gray-50);border-radius:12px;padding:var(--spacing-4);margin-bottom:var(--spacing-4)}.summary-line.svelte-dnveis.svelte-dnveis{display:flex;justify-content:space-between;margin-bottom:8px;font-size:var(--font-size-sm)}.summary-line.total.svelte-dnveis.svelte-dnveis{border-top:1px solid var(--gray-200);padding-top:8px;font-size:var(--font-size-base)}.footer-buttons.svelte-dnveis.svelte-dnveis{display:flex;flex-direction:column;gap:8px}.order-btn.svelte-dnveis.svelte-dnveis{width:100%;padding:12px;border-radius:8px;border:none;font-weight:600;cursor:pointer}.checkout-btn.svelte-dnveis.svelte-dnveis{background:var(--secondary-color);color:white}.legacy-btn.svelte-dnveis.svelte-dnveis{background:var(--whatsapp-color);color:white}@keyframes svelte-dnveis-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}@media(max-width: 768px){.cart-panel.svelte-dnveis.svelte-dnveis{width:100%}}",
  map: `{"version":3,"file":"Cart.svelte","sources":["Cart.svelte"],"sourcesContent":["<script>\\n    import { cart } from '$lib/stores/cart';\\n    import { orderInfo } from '$lib/stores/orderInfo';\\n    import { PriceService } from '$lib/services/PriceService';\\n    import CartItem from './CartItem.svelte';\\n    import CheckoutModal from '../Checkout/CheckoutModal.svelte';\\n    import CheckoutForm from '../molecules/CheckoutForm.svelte';\\n    import DeliverySelector from '../molecules/DeliverySelector.svelte';\\n    import { tick } from 'svelte';\\n    import { browser } from '$app/environment';\\n\\n    let isOpen = false;\\n    let showCheckoutModal = false;\\n    let cartToggleButton;\\n    let cartPanel;\\n    let observations = '';\\n\\n    async function openCart() {\\n        isOpen = true;\\n        await tick();\\n        cartPanel?.querySelector('.close-btn')?.focus();\\n    }\\n\\n    function closeCart() {\\n        isOpen = false;\\n        cartToggleButton?.focus();\\n    }\\n\\n    function toggleCart() {\\n        isOpen ? closeCart() : openCart();\\n    }\\n\\n    function handleDialogKeydown(e) {\\n        if (e.key === 'Escape') {\\n            closeCart();\\n            return;\\n        }\\n        if (e.key === 'Tab' && cartPanel) {\\n            const focusable = cartPanel.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\\"-1\\"])');\\n            const first = focusable[0];\\n            const last = focusable[focusable.length - 1];\\n            if (e.shiftKey && document.activeElement === first) {\\n                last?.focus();\\n                e.preventDefault();\\n            } else if (!e.shiftKey && document.activeElement === last) {\\n                first?.focus();\\n                e.preventDefault();\\n            }\\n        }\\n    }\\n\\n    function generateWhatsAppMessage(cartItems, total, orderData) {\\n        let message = \\"🍔 *Pedido - Lanche da Si*\\\\n\\\\n\\";\\n        cartItems.forEach(item => {\\n            message += \`• \${item.quantity}x \${item.name}\\\\n  \${PriceService.formatCurrency(item.price * item.quantity)}\\\\n\\\\n\`;\\n        });\\n        message += \`💰 *Subtotal: \${PriceService.formatCurrency(total)}*\\\\n\`;\\n        if (orderData.location && orderData.distance !== null) {\\n            message += \`🚚 *Entrega (\${orderData.distance}km): \${PriceService.formatCurrency(orderData.deliveryFee)}*\\\\n\`;\\n            message += \`💰 *Total: \${PriceService.formatCurrency(total + orderData.deliveryFee)}*\\\\n\\\\n\`;\\n        } else {\\n            message += \`💰 *Total: \${PriceService.formatCurrency(total)}*\\\\n\\\\n\`;\\n        }\\n        if (orderData.observations.trim()) message += \`📝 *Observações:*\\\\n\${orderData.observations}\\\\n\\\\n\`;\\n        if (orderData.address) {\\n            message += \`📍 *Endereço:*\\\\n\${orderData.address}\\\\n\`;\\n        } else {\\n            message += \\"📍 *Endereço:*\\\\n(Favor informar endereço completo)\\\\n\\\\n\\";\\n        }\\n        message += \\"Obrigado pela preferência! 😊\\";\\n        return encodeURIComponent(message);\\n    }\\n\\n    function sendOrder() {\\n        if ($cart.length === 0) return;\\n        orderInfo.setObservations(observations);\\n        const total = cart.getTotal($cart);\\n        const message = generateWhatsAppMessage($cart, total, $orderInfo);\\n        window.open(\`https://wa.me/5592993525884?text=\${message}\`, '_blank');\\n    }\\n\\n    $: itemCount = cart.getItemCount($cart);\\n    $: total = cart.getTotal($cart);\\n    $: finalTotal = total + ($orderInfo.deliveryFee || 0);\\n<\/script>\\n\\n<div class=\\"cart-container\\">\\n    <button \\n        bind:this={cartToggleButton}\\n        class=\\"cart-toggle\\" \\n        on:click={toggleCart} \\n        class:has-items={itemCount > 0}\\n        aria-label=\\"Abrir carrinho\\"\\n        aria-expanded={isOpen}\\n    >\\n        <i class=\\"fas fa-shopping-cart\\" aria-hidden=\\"true\\"></i>\\n        {#if itemCount > 0}\\n            <span class=\\"cart-badge\\">{itemCount}</span>\\n        {/if}\\n    </button>\\n\\n    {#if isOpen}\\n        <div class=\\"cart-overlay\\" on:click={closeCart} aria-hidden=\\"true\\"></div>\\n        <div \\n            bind:this={cartPanel}\\n            class=\\"cart-panel\\"\\n            role=\\"dialog\\"\\n            aria-modal=\\"true\\"\\n            aria-labelledby=\\"cart-title\\"\\n            on:keydown={handleDialogKeydown}\\n        >\\n            <div class=\\"cart-header\\">\\n                <h3 id=\\"cart-title\\">Seu Pedido</h3>\\n                <button class=\\"close-btn\\" on:click={closeCart} aria-label=\\"Fechar\\">\\n                    <i class=\\"fas fa-times\\" aria-hidden=\\"true\\"></i>\\n                </button>\\n            </div>\\n\\n            <div class=\\"cart-content\\">\\n                {#if $cart.length === 0}\\n                    <div class=\\"empty-cart\\">\\n                        <i class=\\"fas fa-shopping-cart\\"></i>\\n                        <p>Seu carrinho está vazio</p>\\n                    </div>\\n                {:else}\\n                    <div class=\\"cart-items\\" aria-live=\\"polite\\">\\n                        {#each $cart as item}\\n                            <CartItem {item} />\\n                        {/each}\\n                    </div>\\n\\n                    {#if browser}\\n                        <div class=\\"order-details\\">\\n                            <CheckoutForm bind:observations />\\n                            <DeliverySelector />\\n                        </div>\\n\\n                        <div class=\\"cart-footer\\">\\n                            <div class=\\"order-summary\\">\\n                                <div class=\\"summary-line\\"><span>Subtotal:</span><span>{PriceService.formatCurrency(total)}</span></div>\\n                                {#if $orderInfo.deliveryFee > 0}\\n                                    <div class=\\"summary-line\\"><span>Entrega:</span><span>{PriceService.formatCurrency($orderInfo.deliveryFee)}</span></div>\\n                                {:else if $orderInfo.deliveryFee === 0 && $orderInfo.distance !== null}\\n                                    <div class=\\"summary-line free-delivery\\"><span>Entrega:</span><span>Grátis! 🎉</span></div>\\n                                {/if}\\n                                <div class=\\"summary-line total\\"><strong>Total: {PriceService.formatCurrency(finalTotal)}</strong></div>\\n                            </div>\\n                            <div class=\\"footer-buttons\\">\\n                                <button class=\\"order-btn checkout-btn\\" on:click={() => showCheckoutModal = true}>Finalizar Pedido</button>\\n                                <button class=\\"order-btn legacy-btn\\" on:click={sendOrder} disabled={!$orderInfo.canDeliver && $orderInfo.location}>Pedido Rápido (WhatsApp)</button>\\n                            </div>\\n                        </div>\\n                    {/if}\\n                {/if}\\n            </div>\\n        </div>\\n    {/if}\\n\\n    {#if showCheckoutModal}\\n        <CheckoutModal cartItems={$cart} onClose={() => showCheckoutModal = false} onConfirm={() => { cart.clear(); showCheckoutModal = false; closeCart(); }} />\\n    {/if}\\n</div>\\n\\n<style>\\n    .cart-container { position: fixed; bottom: var(--spacing-6); right: var(--spacing-6); z-index: 1000; }\\n    .cart-toggle { background: var(--secondary-color); color: var(--white); border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl); box-shadow: 0 4px 20px rgba(0,0,0,0.15); transition: all 0.3s ease; position: relative; }\\n    .cart-toggle.has-items { animation: pulse 2s infinite; }\\n    .cart-badge { position: absolute; top: -8px; right: -8px; background: var(--danger-color); color: var(--white); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xs); font-weight: bold; }\\n    .cart-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 998; }\\n    .cart-panel { position: fixed; top: 0; right: 0; width: 400px; height: 100vh; background: var(--white); z-index: 999; display: flex; flex-direction: column; box-shadow: -4px 0 20px rgba(0,0,0,0.1); overflow: hidden; }\\n    .cart-header { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-6); border-bottom: 1px solid var(--gray-200); }\\n    .cart-header h3 { margin: 0; font-size: var(--font-size-2xl); font-weight: 700; }\\n    .close-btn { background: none; border: none; font-size: var(--font-size-xl); color: var(--gray-500); cursor: pointer; }\\n    .cart-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }\\n    .empty-cart { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--gray-500); }\\n    .empty-cart i { font-size: 4rem; }\\n    .cart-items { flex: 1; overflow-y: auto; padding: var(--spacing-4); }\\n    .order-details { padding: var(--spacing-6); border-top: 1px solid var(--gray-200); background: var(--gray-50); flex-shrink: 0; max-height: 300px; overflow-y: auto; }\\n    .cart-footer { padding: var(--spacing-6); border-top: 1px solid var(--gray-200); background: var(--gray-50); flex-shrink: 0; }\\n    .order-summary { background: var(--gray-50); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4); }\\n    .summary-line { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: var(--font-size-sm); }\\n    .summary-line.total { border-top: 1px solid var(--gray-200); padding-top: 8px; font-size: var(--font-size-base); }\\n    .footer-buttons { display: flex; flex-direction: column; gap: 8px; }\\n    .order-btn { width: 100%; padding: 12px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }\\n    .checkout-btn { background: var(--secondary-color); color: white; }\\n    .legacy-btn { background: var(--whatsapp-color); color: white; }\\n    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }\\n    @media (max-width: 768px) { .cart-panel { width: 100%; } }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const Cart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let itemCount;
  let total;
  let $orderInfo, $$unsubscribe_orderInfo;
  let $cart, $$unsubscribe_cart;
  $$unsubscribe_orderInfo = subscribe(orderInfo, (value) => $orderInfo = value);
  $$unsubscribe_cart = subscribe(cart, (value) => $cart = value);
  let isOpen = false;
  let cartToggleButton;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    itemCount = cart.getItemCount($cart);
    total = cart.getTotal($cart);
    total + ($orderInfo.deliveryFee || 0);
    $$rendered = `<div class="cart-container svelte-dnveis"><button class="${["cart-toggle svelte-dnveis", itemCount > 0 ? "has-items" : ""].join(" ").trim()}" aria-label="Abrir carrinho"${add_attribute("aria-expanded", isOpen, 0)}${add_attribute("this", cartToggleButton, 0)}><i class="fas fa-shopping-cart" aria-hidden="true"></i> ${itemCount > 0 ? `<span class="cart-badge svelte-dnveis">${escape(itemCount)}</span>` : ``}</button> ${``} ${``} </div>`;
  } while (!$$settled);
  $$unsubscribe_orderInfo();
  $$unsubscribe_cart();
  return $$rendered;
});
const css = {
  code: ".whatsapp-float.svelte-cjc6fl{position:fixed;bottom:24px;right:24px;width:60px;height:60px;background:#25d366;color:white;border:none;border-radius:50%;font-size:2rem;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 20px rgba(37, 211, 102, 0.5);z-index:999;transition:all 0.3s ease;animation:svelte-cjc6fl-slideUp 0.4s ease}.whatsapp-float.svelte-cjc6fl:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(37, 211, 102, 0.6)}.whatsapp-float.pulse.svelte-cjc6fl{animation:svelte-cjc6fl-slideUp 0.4s ease, svelte-cjc6fl-pulseGlow 2s ease-in-out infinite 0.5s}@keyframes svelte-cjc6fl-slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes svelte-cjc6fl-pulseGlow{0%,100%{box-shadow:0 4px 20px rgba(37, 211, 102, 0.5)}50%{box-shadow:0 4px 30px rgba(37, 211, 102, 0.8), 0 0 0 12px rgba(37, 211, 102, 0.15)}}@media(max-width: 768px){.whatsapp-float.svelte-cjc6fl{bottom:16px;right:16px;width:56px;height:56px;font-size:1.8rem}}",
  map: `{"version":3,"file":"WhatsAppFloat.svelte","sources":["WhatsAppFloat.svelte"],"sourcesContent":["<script>\\n    import { onMount } from 'svelte';\\n\\n    let visible = false;\\n    let pulse = true;\\n\\n    const whatsappNumber = '5592993525884';\\n\\n    onMount(() => {\\n        // Show after scrolling past hero\\n        const observer = new IntersectionObserver(\\n            ([entry]) => {\\n                visible = !entry.isIntersecting;\\n            },\\n            { threshold: 0.3 }\\n        );\\n\\n        const hero = document.getElementById('inicio');\\n        if (hero) observer.observe(hero);\\n\\n        // Stop pulsing after 5 seconds\\n        setTimeout(() => { pulse = false; }, 5000);\\n\\n        return () => observer.disconnect();\\n    });\\n\\n    function openWhatsApp() {\\n        const message = encodeURIComponent('Olá! Gostaria de fazer um pedido no Lanche da Si. 🍔');\\n        window.open(\`https://wa.me/\${whatsappNumber}?text=\${message}\`, '_blank');\\n    }\\n<\/script>\\n\\n{#if visible}\\n    <button\\n        class=\\"whatsapp-float\\"\\n        class:pulse\\n        on:click={openWhatsApp}\\n        aria-label=\\"Pedir pelo WhatsApp\\"\\n        title=\\"Pedir pelo WhatsApp\\"\\n    >\\n        <i class=\\"fab fa-whatsapp\\"></i>\\n    </button>\\n{/if}\\n\\n<style>\\n    .whatsapp-float {\\n        position: fixed;\\n        bottom: 24px;\\n        right: 24px;\\n        width: 60px;\\n        height: 60px;\\n        background: #25d366;\\n        color: white;\\n        border: none;\\n        border-radius: 50%;\\n        font-size: 2rem;\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        cursor: pointer;\\n        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);\\n        z-index: 999;\\n        transition: all 0.3s ease;\\n        animation: slideUp 0.4s ease;\\n    }\\n\\n    .whatsapp-float:hover {\\n        transform: scale(1.1);\\n        box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);\\n    }\\n\\n    .whatsapp-float.pulse {\\n        animation: slideUp 0.4s ease, pulseGlow 2s ease-in-out infinite 0.5s;\\n    }\\n\\n    @keyframes slideUp {\\n        from {\\n            opacity: 0;\\n            transform: translateY(20px);\\n        }\\n        to {\\n            opacity: 1;\\n            transform: translateY(0);\\n        }\\n    }\\n\\n    @keyframes pulseGlow {\\n        0%, 100% {\\n            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);\\n        }\\n        50% {\\n            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8), 0 0 0 12px rgba(37, 211, 102, 0.15);\\n        }\\n    }\\n\\n    @media (max-width: 768px) {\\n        .whatsapp-float {\\n            bottom: 16px;\\n            right: 16px;\\n            width: 56px;\\n            height: 56px;\\n            font-size: 1.8rem;\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"AA6CI,6BAAgB,CACZ,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,OAAO,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAC9C,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACzB,SAAS,CAAE,qBAAO,CAAC,IAAI,CAAC,IAC5B,CAEA,6BAAe,MAAO,CAClB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACjD,CAEA,eAAe,oBAAO,CAClB,SAAS,CAAE,qBAAO,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,uBAAS,CAAC,EAAE,CAAC,WAAW,CAAC,QAAQ,CAAC,IACpE,CAEA,WAAW,qBAAQ,CACf,IAAK,CACD,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,IAAI,CAC9B,CACA,EAAG,CACC,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,CAAC,CAC3B,CACJ,CAEA,WAAW,uBAAU,CACjB,EAAE,CAAE,IAAK,CACL,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CACjD,CACA,GAAI,CACA,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,IAAI,CACtF,CACJ,CAEA,MAAO,YAAY,KAAK,CAAE,CACtB,6BAAgB,CACZ,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,MACf,CACJ"}`
};
const WhatsAppFloat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${``}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let structuredData;
  structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Lanche da Si",
    "image": "https://www.lanchedasi.com.br/assets/logo.png",
    "@id": "https://www.lanchedasi.com.br",
    "url": "https://www.lanchedasi.com.br",
    "telephone": "+5592984570146",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Rua das Lanchonetes, 123",
      "addressLocality": "Manaus",
      "addressRegion": "AM",
      "postalCode": "69000-000",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -3.1190275,
      "longitude": -60.0217314
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "18:00",
      "closes": "23:59"
    },
    "servesCuisine": "Fast Food, Brazilian",
    "priceRange": "$$"
  };
  return `${$$result.head += `<!-- HEAD_svelte-1h14hrt_START --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="preconnect" href="https://cdnjs.cloudflare.com"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'"><noscript data-svelte-h="svelte-1t7zxp0"><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"></noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"><!-- HTML_TAG_START -->${`<script type="application/ld+json">${JSON.stringify(structuredData)}<\/script>`}<!-- HTML_TAG_END --><!-- HEAD_svelte-1h14hrt_END -->`, ""} <a href="#conteudo-principal" class="skip-link" data-svelte-h="svelte-10ip379">Pular para o conteúdo principal</a> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} <main id="conteudo-principal" aria-label="Conteúdo principal">${slots.default ? slots.default({}) : ``}</main> ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})} ${validate_component(Cart, "Cart").$$render($$result, {}, {}, {})} ${validate_component(WhatsAppFloat, "WhatsAppFloat").$$render($$result, {}, {}, {})}`;
});
export {
  Layout as default
};
