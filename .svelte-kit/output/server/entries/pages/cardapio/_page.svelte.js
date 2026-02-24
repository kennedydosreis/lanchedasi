!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "f8df85e6-8841-4554-90d3-6a8ceab8c06a", e._sentryDebugIdIdentifier = "sentry-dbid-f8df85e6-8841-4554-90d3-6a8ceab8c06a");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, b as add_attribute, e as each, d as escape, n as null_to_empty, v as validate_component } from "../../../chunks/ssr.js";
import { M as MetaTags } from "../../../chunks/MetaTags.js";
import { B as BentoMenu } from "../../../chunks/BentoMenu.js";
const css$2 = {
  code: ".category-bar-wrapper.svelte-eoris5.svelte-eoris5{position:sticky;top:60px;z-index:100;background:rgba(255, 255, 255, 0.9);backdrop-filter:blur(10px);border-bottom:1px solid var(--gray-200);margin:0 calc(-1 * var(--spacing-4));padding:var(--spacing-4) 0;transition:all 0.3s ease}.category-bar.svelte-eoris5.svelte-eoris5{display:flex;gap:var(--spacing-6);overflow-x:auto;padding:0 var(--spacing-6);scrollbar-width:none}.category-bar.svelte-eoris5.svelte-eoris5::-webkit-scrollbar{display:none}.category-item.svelte-eoris5.svelte-eoris5{display:flex;flex-direction:column;align-items:center;gap:8px;background:none;border:none;cursor:pointer;flex-shrink:0;transition:transform 0.2s;padding:0}.category-item.svelte-eoris5.svelte-eoris5:active{transform:scale(0.95)}.icon-circle.svelte-eoris5.svelte-eoris5{width:60px;height:60px;border-radius:50%;background:var(--white);border:2px solid var(--gray-200);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:var(--gray-600);transition:all 0.3s ease;box-shadow:0 4px 10px rgba(0,0,0,0.05)}.category-item.svelte-eoris5 span.svelte-eoris5{font-size:0.75rem;font-weight:600;color:var(--gray-500);transition:color 0.3s}.category-item.active.svelte-eoris5 .icon-circle.svelte-eoris5{border-color:var(--secondary-color);background:var(--secondary-color);color:white;box-shadow:0 4px 15px rgba(245, 158, 11, 0.3);view-transition-name:active-category}::view-transition-group(active-category){animation-duration:250ms;animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}.category-item.active.svelte-eoris5 span.svelte-eoris5{color:var(--secondary-color)}@media(max-width: 768px){.category-bar-wrapper.svelte-eoris5.svelte-eoris5{top:56px;padding:var(--spacing-3) 0}.icon-circle.svelte-eoris5.svelte-eoris5{width:50px;height:50px;font-size:1.2rem}.category-bar.svelte-eoris5.svelte-eoris5{gap:var(--spacing-4)}}",
  map: `{"version":3,"file":"CategoryBar.svelte","sources":["CategoryBar.svelte"],"sourcesContent":["<script>\\n    export let categories = [];\\n    export let activeTab = 'all';\\n    export let onTabClick = () => {};\\n\\n    const icons = {\\n        'all': 'fas fa-th-large',\\n        'combos': 'fas fa-star',\\n        'sanduiches': 'fas fa-hamburger',\\n        'kikao': 'fas fa-hotdog',\\n        'porcoes': 'fas fa-drumstick-bite',\\n        'pratos': 'fas fa-utensils',\\n        'bebidas': 'fas fa-wine-glass'\\n    };\\n<\/script>\\n\\n<div class=\\"category-bar-wrapper\\">\\n    <div class=\\"category-bar\\" role=\\"tablist\\">\\n        <button\\n            class=\\"category-item\\"\\n            class:active={activeTab === 'all'}\\n            on:click={() => onTabClick('all')}\\n            role=\\"tab\\"\\n            aria-selected={activeTab === 'all'}\\n        >\\n            <div class=\\"icon-circle\\">\\n                <i class={icons['all']}></i>\\n            </div>\\n            <span>Todos</span>\\n        </button>\\n\\n        {#each categories as category}\\n            <button\\n                class=\\"category-item\\"\\n                class:active={activeTab === category.id}\\n                on:click={() => onTabClick(category.id)}\\n                role=\\"tab\\"\\n                aria-selected={activeTab === category.id}\\n            >\\n                <div class=\\"icon-circle\\">\\n                    <i class={icons[category.id] || 'fas fa-utensils'}></i>\\n                </div>\\n                <span>{category.tabLabel}</span>\\n            </button>\\n        {/each}\\n    </div>\\n</div>\\n\\n<style>\\n    .category-bar-wrapper {\\n        position: sticky;\\n        top: 60px;\\n        z-index: 100;\\n        background: rgba(255, 255, 255, 0.9);\\n        backdrop-filter: blur(10px);\\n        border-bottom: 1px solid var(--gray-200);\\n        margin: 0 calc(-1 * var(--spacing-4));\\n        padding: var(--spacing-4) 0;\\n        transition: all 0.3s ease;\\n    }\\n\\n    .category-bar {\\n        display: flex;\\n        gap: var(--spacing-6);\\n        overflow-x: auto;\\n        padding: 0 var(--spacing-6);\\n        scrollbar-width: none;\\n    }\\n\\n    .category-bar::-webkit-scrollbar {\\n        display: none;\\n    }\\n\\n    .category-item {\\n        display: flex;\\n        flex-direction: column;\\n        align-items: center;\\n        gap: 8px;\\n        background: none;\\n        border: none;\\n        cursor: pointer;\\n        flex-shrink: 0;\\n        transition: transform 0.2s;\\n        padding: 0;\\n    }\\n\\n    .category-item:active {\\n        transform: scale(0.95);\\n    }\\n\\n    .icon-circle {\\n        width: 60px;\\n        height: 60px;\\n        border-radius: 50%;\\n        background: var(--white);\\n        border: 2px solid var(--gray-200);\\n        display: flex;\\n        align-items: center;\\n        justify-content: center;\\n        font-size: 1.5rem;\\n        color: var(--gray-600);\\n        transition: all 0.3s ease;\\n        box-shadow: 0 4px 10px rgba(0,0,0,0.05);\\n    }\\n\\n    .category-item span {\\n        font-size: 0.75rem;\\n        font-weight: 600;\\n        color: var(--gray-500);\\n        transition: color 0.3s;\\n    }\\n\\n    .category-item.active .icon-circle {\\n        border-color: var(--secondary-color);\\n        background: var(--secondary-color);\\n        color: white;\\n        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);\\n        view-transition-name: active-category;\\n    }\\n\\n    :global(::view-transition-group(active-category)) {\\n        animation-duration: 250ms;\\n        animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\\n    }\\n\\n    .category-item.active span {\\n        color: var(--secondary-color);\\n    }\\n\\n    @media (max-width: 768px) {\\n        .category-bar-wrapper {\\n            top: 56px;\\n            padding: var(--spacing-3) 0;\\n        }\\n        .icon-circle {\\n            width: 50px;\\n            height: 50px;\\n            font-size: 1.2rem;\\n        }\\n        .category-bar {\\n            gap: var(--spacing-4);\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const CategoryBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { categories = [] } = $$props;
  let { activeTab = "all" } = $$props;
  let { onTabClick = () => {
  } } = $$props;
  const icons = {
    "all": "fas fa-th-large",
    "combos": "fas fa-star",
    "sanduiches": "fas fa-hamburger",
    "kikao": "fas fa-hotdog",
    "porcoes": "fas fa-drumstick-bite",
    "pratos": "fas fa-utensils",
    "bebidas": "fas fa-wine-glass"
  };
  if ($$props.categories === void 0 && $$bindings.categories && categories !== void 0) $$bindings.categories(categories);
  if ($$props.activeTab === void 0 && $$bindings.activeTab && activeTab !== void 0) $$bindings.activeTab(activeTab);
  if ($$props.onTabClick === void 0 && $$bindings.onTabClick && onTabClick !== void 0) $$bindings.onTabClick(onTabClick);
  $$result.css.add(css$2);
  return `<div class="category-bar-wrapper svelte-eoris5"><div class="category-bar svelte-eoris5" role="tablist"><button class="${["category-item svelte-eoris5", activeTab === "all" ? "active" : ""].join(" ").trim()}" role="tab"${add_attribute("aria-selected", activeTab === "all", 0)}><div class="icon-circle svelte-eoris5"><i class="${escape(null_to_empty(icons["all"]), true) + " svelte-eoris5"}"></i></div> <span class="svelte-eoris5" data-svelte-h="svelte-1217vlt">Todos</span></button> ${each(categories, (category) => {
    return `<button class="${["category-item svelte-eoris5", activeTab === category.id ? "active" : ""].join(" ").trim()}" role="tab"${add_attribute("aria-selected", activeTab === category.id, 0)}><div class="icon-circle svelte-eoris5"><i class="${escape(null_to_empty(icons[category.id] || "fas fa-utensils"), true) + " svelte-eoris5"}"></i></div> <span class="svelte-eoris5">${escape(category.tabLabel)}</span> </button>`;
  })}</div> </div>`;
});
const css$1 = {
  code: ".menu-section.svelte-172nj6h{padding:var(--spacing-12) 0;background:#fafafa;min-height:100vh}.container.svelte-172nj6h{max-width:1400px;margin:0 auto;padding:0 var(--spacing-4)}.section-header.svelte-172nj6h{text-align:left;margin-bottom:var(--spacing-12)}.vanguard-title.svelte-172nj6h{font-size:clamp(3rem, 10vw, 6rem);font-weight:900;letter-spacing:-0.05em;line-height:0.9;text-transform:uppercase;background:linear-gradient(to right, var(--gray-900), var(--gray-400));-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:var(--spacing-4)}.section-subtitle.svelte-172nj6h{font-size:var(--font-size-xl);color:var(--gray-600);max-width:500px;line-height:1.4;font-weight:500}.menu-content.svelte-172nj6h{padding-top:var(--spacing-8);view-transition-name:bento-rearrange}::view-transition-group(bento-rearrange){animation-duration:0.5s;animation-timing-function:cubic-bezier(0.34, 1.56, 0.64, 1)}@media(max-width: 768px){.vanguard-title.svelte-172nj6h{font-size:3rem}.section-header.svelte-172nj6h{text-align:center}.section-subtitle.svelte-172nj6h{margin:0 auto}}",
  map: `{"version":3,"file":"MenuSection.svelte","sources":["MenuSection.svelte"],"sourcesContent":["<script>\\n    import { onMount } from 'svelte';\\n    import BentoMenu from '../organisms/BentoMenu.svelte';\\n    import CategoryBar from '../molecules/CategoryBar.svelte';\\n\\n    export let menuData = null;\\n\\n    let loading = false;\\n    let error = null;\\n    let activeTab = 'all';\\n\\n    const categories = [\\n        { id: 'combos', title: '🍟 Combos Especiais', description: 'Economize com nossos combos promocionais!', tabLabel: 'Combos' },\\n        { id: 'sanduiches', title: '🍔 Sanduíches', description: 'Sanduíches saborosos e bem preparados na hora', tabLabel: 'Sanduíches' },\\n        { id: 'kikao', title: '🌭 Kikões', description: 'Os famosos kikões da casa!', tabLabel: 'Kikões' },\\n        { id: 'porcoes', title: '🍟 Porções & Salgados', description: 'Perfeitas para compartilhar', tabLabel: 'Porções' },\\n        { id: 'pratos', title: '🍽️ Pratos Principais', description: 'Pratos completos e saborosos', tabLabel: 'Pratos' },\\n        { id: 'bebidas', title: '🥤 Bebidas', description: 'Refrescantes e geladas', tabLabel: 'Bebidas' }\\n    ];\\n\\n    function handleTabClick(categoryId) {\\n        if (!document.startViewTransition) {\\n            activeTab = categoryId;\\n            return;\\n        }\\n\\n        document.startViewTransition(() => {\\n            activeTab = categoryId;\\n        });\\n    }\\n\\n    $: categoriesWithItems = menuData ? categories.map(cat => ({\\n        ...cat,\\n        items: menuData[cat.id] || []\\n    })).filter(cat => cat.items.length > 0) : [];\\n    \\n    $: visibleItems = activeTab === 'all' \\n        ? Object.values(menuData || {}).flat()\\n        : (menuData ? menuData[activeTab] || [] : []);\\n<\/script>\\n\\n<section id=\\"menu\\" class=\\"menu-section\\" aria-label=\\"Cardápio\\">\\n    <div class=\\"container\\">\\n        <div class=\\"section-header\\">\\n            <h2 class=\\"vanguard-title\\">Bento Revolution</h2>\\n            <p class=\\"section-subtitle\\">A nova era do sabor chegou. Navegue pela grade dinâmica.</p>\\n        </div>\\n\\n        {#if loading}\\n            <div class=\\"loading-state\\"><p>Carregando...</p></div>\\n        {:else if error}\\n            <div class=\\"error-state\\"><p>Erro ao carregar cardápio.</p></div>\\n        {:else if menuData}\\n            <CategoryBar {categories} {activeTab} onTabClick={handleTabClick} />\\n\\n            <div class=\\"menu-content\\" id=\\"menu-content\\" role=\\"tabpanel\\">\\n                <BentoMenu items={visibleItems} categoryId={activeTab} />\\n            </div>\\n        {/if}\\n    </div>\\n</section>\\n\\n<style>\\n    .menu-section { padding: var(--spacing-12) 0; background: #fafafa; min-height: 100vh; }\\n    .container { max-width: 1400px; margin: 0 auto; padding: 0 var(--spacing-4); }\\n    .section-header { text-align: left; margin-bottom: var(--spacing-12); }\\n    \\n    .vanguard-title { \\n        font-size: clamp(3rem, 10vw, 6rem); \\n        font-weight: 900; \\n        letter-spacing: -0.05em;\\n        line-height: 0.9;\\n        text-transform: uppercase;\\n        background: linear-gradient(to right, var(--gray-900), var(--gray-400));\\n        -webkit-background-clip: text;\\n        -webkit-text-fill-color: transparent;\\n        margin-bottom: var(--spacing-4);\\n    }\\n\\n    .section-subtitle { \\n        font-size: var(--font-size-xl); \\n        color: var(--gray-600); \\n        max-width: 500px; \\n        line-height: 1.4;\\n        font-weight: 500;\\n    }\\n\\n    .menu-content { \\n        padding-top: var(--spacing-8); \\n        view-transition-name: bento-rearrange;\\n    }\\n    \\n    :global(::view-transition-group(bento-rearrange)) {\\n        animation-duration: 0.5s;\\n        animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);\\n    }\\n\\n    @media (max-width: 768px) {\\n        .vanguard-title { font-size: 3rem; }\\n        .section-header { text-align: center; }\\n        .section-subtitle { margin: 0 auto; }\\n    }\\n</style>\\n\\n"],"names":[],"mappings":"AA+DI,4BAAc,CAAE,OAAO,CAAE,IAAI,YAAY,CAAC,CAAC,CAAC,CAAE,UAAU,CAAE,OAAO,CAAE,UAAU,CAAE,KAAO,CACtF,yBAAW,CAAE,SAAS,CAAE,MAAM,CAAE,MAAM,CAAE,CAAC,CAAC,IAAI,CAAE,OAAO,CAAE,CAAC,CAAC,IAAI,WAAW,CAAG,CAC7E,8BAAgB,CAAE,UAAU,CAAE,IAAI,CAAE,aAAa,CAAE,IAAI,YAAY,CAAG,CAEtE,8BAAgB,CACZ,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAClC,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,OAAO,CACvB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,UAAU,CAAE,gBAAgB,EAAE,CAAC,KAAK,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,CAAC,IAAI,UAAU,CAAC,CAAC,CACvE,uBAAuB,CAAE,IAAI,CAC7B,uBAAuB,CAAE,WAAW,CACpC,aAAa,CAAE,IAAI,WAAW,CAClC,CAEA,gCAAkB,CACd,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,GAAG,CAChB,WAAW,CAAE,GACjB,CAEA,4BAAc,CACV,WAAW,CAAE,IAAI,WAAW,CAAC,CAC7B,oBAAoB,CAAE,eAC1B,CAEQ,wCAA0C,CAC9C,kBAAkB,CAAE,IAAI,CACxB,yBAAyB,CAAE,aAAa,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAC/D,CAEA,MAAO,YAAY,KAAK,CAAE,CACtB,8BAAgB,CAAE,SAAS,CAAE,IAAM,CACnC,8BAAgB,CAAE,UAAU,CAAE,MAAQ,CACtC,gCAAkB,CAAE,MAAM,CAAE,CAAC,CAAC,IAAM,CACxC"}`
};
const MenuSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visibleItems;
  let { menuData = null } = $$props;
  let activeTab = "all";
  const categories = [
    {
      id: "combos",
      title: "🍟 Combos Especiais",
      description: "Economize com nossos combos promocionais!",
      tabLabel: "Combos"
    },
    {
      id: "sanduiches",
      title: "🍔 Sanduíches",
      description: "Sanduíches saborosos e bem preparados na hora",
      tabLabel: "Sanduíches"
    },
    {
      id: "kikao",
      title: "🌭 Kikões",
      description: "Os famosos kikões da casa!",
      tabLabel: "Kikões"
    },
    {
      id: "porcoes",
      title: "🍟 Porções & Salgados",
      description: "Perfeitas para compartilhar",
      tabLabel: "Porções"
    },
    {
      id: "pratos",
      title: "🍽️ Pratos Principais",
      description: "Pratos completos e saborosos",
      tabLabel: "Pratos"
    },
    {
      id: "bebidas",
      title: "🥤 Bebidas",
      description: "Refrescantes e geladas",
      tabLabel: "Bebidas"
    }
  ];
  function handleTabClick(categoryId) {
    if (!document.startViewTransition) {
      activeTab = categoryId;
      return;
    }
    document.startViewTransition(() => {
      activeTab = categoryId;
    });
  }
  if ($$props.menuData === void 0 && $$bindings.menuData && menuData !== void 0) $$bindings.menuData(menuData);
  $$result.css.add(css$1);
  menuData ? categories.map((cat) => ({ ...cat, items: menuData[cat.id] || [] })).filter((cat) => cat.items.length > 0) : [];
  visibleItems = activeTab === "all" ? Object.values(menuData || {}).flat() : menuData ? menuData[activeTab] || [] : [];
  return `<section id="menu" class="menu-section svelte-172nj6h" aria-label="Cardápio"><div class="container svelte-172nj6h"><div class="section-header svelte-172nj6h" data-svelte-h="svelte-uyerit"><h2 class="vanguard-title svelte-172nj6h">Bento Revolution</h2> <p class="section-subtitle svelte-172nj6h">A nova era do sabor chegou. Navegue pela grade dinâmica.</p></div> ${`${`${menuData ? `${validate_component(CategoryBar, "CategoryBar").$$render(
    $$result,
    {
      categories,
      activeTab,
      onTabClick: handleTabClick
    },
    {},
    {}
  )} <div class="menu-content svelte-172nj6h" id="menu-content" role="tabpanel">${validate_component(BentoMenu, "BentoMenu").$$render(
    $$result,
    {
      items: visibleItems,
      categoryId: activeTab
    },
    {},
    {}
  )}</div>` : ``}`}`}</div> </section>`;
});
const css = {
  code: ".page-header.svelte-17eo3oh{padding:calc(var(--spacing-12) + 60px) 0 var(--spacing-8) 0;background:linear-gradient(135deg, var(--primary-color), var(--primary-hover));text-align:center}.container.svelte-17eo3oh{max-width:1200px;margin:0 auto;padding:0 var(--spacing-4)}.gradient-text.svelte-17eo3oh{font-size:var(--font-size-4xl);font-weight:800;color:var(--secondary-color);margin-bottom:var(--spacing-4)}.subtitle.svelte-17eo3oh{font-size:var(--font-size-lg);color:var(--gray-700);max-width:600px;margin:0 auto}@media(max-width: 768px){.page-header.svelte-17eo3oh{padding:calc(var(--spacing-8) + 56px) 0 var(--spacing-6) 0}.gradient-text.svelte-17eo3oh{font-size:var(--font-size-3xl)}.subtitle.svelte-17eo3oh{font-size:var(--font-size-base)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n    import MetaTags from '$lib/components/MetaTags.svelte';\\n    import MenuSection from '$lib/components/Menu/MenuSection.svelte';\\n\\n    export let data;\\n<\/script>\\n\\n<MetaTags \\n    title=\\"Cardápio - Lanche da Si\\"\\n    description=\\"Confira nosso cardápio completo com combos, sanduíches, kikões, porções, pratos e bebidas.\\"\\n/>\\n\\n<div class=\\"page-header\\">\\n    <div class=\\"container\\">\\n        <h1 class=\\"gradient-text\\">Nosso Cardápio Completo</h1>\\n        <p class=\\"subtitle\\">Explore todas as delícias que preparamos para você</p>\\n    </div>\\n</div>\\n\\n<MenuSection menuData={data.menuData} />\\n\\n<style>\\n    .page-header {\\n        padding: calc(var(--spacing-12) + 60px) 0 var(--spacing-8) 0;\\n        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));\\n        text-align: center;\\n    }\\n\\n    .container {\\n        max-width: 1200px;\\n        margin: 0 auto;\\n        padding: 0 var(--spacing-4);\\n    }\\n\\n    .gradient-text {\\n        font-size: var(--font-size-4xl);\\n        font-weight: 800;\\n        color: var(--secondary-color);\\n        margin-bottom: var(--spacing-4);\\n    }\\n\\n    .subtitle {\\n        font-size: var(--font-size-lg);\\n        color: var(--gray-700);\\n        max-width: 600px;\\n        margin: 0 auto;\\n    }\\n\\n    @media (max-width: 768px) {\\n        .page-header {\\n            padding: calc(var(--spacing-8) + 56px) 0 var(--spacing-6) 0;\\n        }\\n\\n        .gradient-text {\\n            font-size: var(--font-size-3xl);\\n        }\\n\\n        .subtitle {\\n            font-size: var(--font-size-base);\\n        }\\n    }\\n</style>\\n"],"names":[],"mappings":"AAsBI,2BAAa,CACT,OAAO,CAAE,KAAK,IAAI,YAAY,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CAAC,CAC5D,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAAC,IAAI,eAAe,CAAC,CAAC,CAC/E,UAAU,CAAE,MAChB,CAEA,yBAAW,CACP,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,CAAC,CAAC,IAAI,WAAW,CAC9B,CAEA,6BAAe,CACX,SAAS,CAAE,IAAI,eAAe,CAAC,CAC/B,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,iBAAiB,CAAC,CAC7B,aAAa,CAAE,IAAI,WAAW,CAClC,CAEA,wBAAU,CACN,SAAS,CAAE,IAAI,cAAc,CAAC,CAC9B,KAAK,CAAE,IAAI,UAAU,CAAC,CACtB,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IACd,CAEA,MAAO,YAAY,KAAK,CAAE,CACtB,2BAAa,CACT,OAAO,CAAE,KAAK,IAAI,WAAW,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CAC9D,CAEA,6BAAe,CACX,SAAS,CAAE,IAAI,eAAe,CAClC,CAEA,wBAAU,CACN,SAAS,CAAE,IAAI,gBAAgB,CACnC,CACJ"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  return `${validate_component(MetaTags, "MetaTags").$$render(
    $$result,
    {
      title: "Cardápio - Lanche da Si",
      description: "Confira nosso cardápio completo com combos, sanduíches, kikões, porções, pratos e bebidas."
    },
    {},
    {}
  )} <div class="page-header svelte-17eo3oh" data-svelte-h="svelte-1bnr1ie"><div class="container svelte-17eo3oh"><h1 class="gradient-text svelte-17eo3oh">Nosso Cardápio Completo</h1> <p class="subtitle svelte-17eo3oh">Explore todas as delícias que preparamos para você</p></div></div> ${validate_component(MenuSection, "MenuSection").$$render($$result, { menuData: data.menuData }, {}, {})}`;
});
export {
  Page as default
};
