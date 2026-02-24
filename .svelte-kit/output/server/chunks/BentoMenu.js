!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "b3daf8e9-60e7-4060-8627-f0b8a40400a7", e._sentryDebugIdIdentifier = "sentry-dbid-b3daf8e9-60e7-4060-8627-f0b8a40400a7");
  } catch (e2) {
  }
}();
import { f as noop, c as create_ssr_component, a as subscribe, b as add_attribute, g as add_styles, d as escape, e as each, v as validate_component } from "./ssr.js";
import { w as writable } from "./index.js";
import { B as BROWSER } from "./false.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const browser = BROWSER;
const CACHE_KEY = "lanchedasi_menu_cache";
function createMenuStore() {
  const { subscribe: subscribe2, set, update } = writable({
    data: [],
    loading: false,
    error: null,
    stale: false
  });
  async function fetchMenu() {
    update((s) => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch("/data/menu.json");
      if (!response.ok) throw new Error("Falha ao buscar menu");
      const rawData = await response.json();
      const allItems = [
        ...rawData.combos || [],
        ...rawData.sanduiches || [],
        ...rawData.kikao || [],
        ...rawData.porcoes || [],
        ...rawData.pratos || [],
        ...rawData.bebidas || []
      ];
      const data = allItems.filter((item) => item.popular).map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        image: item.image,
        available: item.isAvailable ?? true
      }));
      if (browser) ;
      set({
        data,
        loading: false,
        error: null,
        stale: false
      });
    } catch (err) {
      console.error("Fetch error:", err);
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      update((s) => ({
        ...s,
        loading: false,
        error: errorMessage,
        stale: s.data.length > 0
      }));
    }
  }
  function init() {
    return;
  }
  return {
    subscribe: subscribe2,
    init,
    refresh: fetchMenu
  };
}
const menuStore = createMenuStore();
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const ANIMATION_CONFIG = {
  SPRING_STIFF: 0.15,
  SPRING_DAMP: 0.8
};
function useVanguardMouse(initialX = 50, initialY = 50) {
  const x = spring(initialX, {
    stiffness: ANIMATION_CONFIG.SPRING_STIFF,
    damping: ANIMATION_CONFIG.SPRING_DAMP
  });
  const y = spring(initialY, {
    stiffness: ANIMATION_CONFIG.SPRING_STIFF,
    damping: ANIMATION_CONFIG.SPRING_DAMP
  });
  function update(e, element) {
    const rect = element.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width * 100;
    const py = (e.clientY - rect.top) / rect.height * 100;
    x.set(px);
    y.set(py);
  }
  return { x, y, update };
}
const css$1 = {
  code: ":root{--bento-h:220;--bento-s:15%;--bento-l:10%;--bento-bg:hsla(var(--bento-h), var(--bento-s), var(--bento-l), 1);--bento-border:hsla(var(--bento-h), var(--bento-s), 25%, 0.3);--bento-accent-h:280;--bento-radius:1.5rem}.vanguard-bento-cell.svelte-6tkmk5.svelte-6tkmk5{grid-column:span var(--col-span, 1);grid-row:span var(--row-span, 1);position:relative;background:var(--bento-bg);border:1px solid var(--bento-border);border-radius:var(--bento-radius);padding:2rem;overflow:hidden;transition:transform 400ms cubic-bezier(0.23, 1, 0.32, 1),\n      border-color 400ms ease,\n      box-shadow 400ms ease;outline:none;cursor:pointer}.vanguard-bento-cell.svelte-6tkmk5.svelte-6tkmk5:hover,.vanguard-bento-cell.svelte-6tkmk5.svelte-6tkmk5:focus-visible{transform:translateY(-4px);border-color:hsla(var(--bento-accent-h), 80%, 60%, 0.5);box-shadow:0 20px 40px rgba(0, 0, 0, 0.4)}.vanguard-bento-cell.svelte-6tkmk5.svelte-6tkmk5:focus-visible{box-shadow:0 0 0 3px hsla(var(--bento-accent-h), 80%, 60%, 0.6)}.content-wrapper.svelte-6tkmk5.svelte-6tkmk5{position:relative;z-index:2}.cell-title.svelte-6tkmk5.svelte-6tkmk5{font-family:'Inter', system-ui, sans-serif;font-size:1.25rem;font-weight:600;color:white;margin:0 0 0.5rem 0;letter-spacing:-0.02em}.cell-description.svelte-6tkmk5.svelte-6tkmk5{font-size:0.9375rem;color:hsla(0, 0%, 100%, 0.6);line-height:1.6;margin:0}.variant-accent.svelte-6tkmk5.svelte-6tkmk5{--bento-bg:hsla(var(--bento-accent-h), 40%, 15%, 1);--bento-border:hsla(var(--bento-accent-h), 60%, 40%, 0.3)}.variant-glass.svelte-6tkmk5.svelte-6tkmk5{background:hsla(var(--bento-h), var(--bento-s), 10%, 0.4);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}.glow-layer.svelte-6tkmk5.svelte-6tkmk5{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:0;background:radial-gradient(\n      800px circle at var(--mouse-x) var(--mouse-y),\n      hsla(var(--bento-accent-h), 80%, 60%, 0.15),\n      transparent 40%\n    );transition:opacity 500ms ease}.vanguard-bento-cell.svelte-6tkmk5:hover .glow-layer.svelte-6tkmk5,.vanguard-bento-cell.svelte-6tkmk5:focus-visible .glow-layer.svelte-6tkmk5{opacity:1}",
  map: `{"version":3,"file":"BentoCell.svelte","sources":["BentoCell.svelte"],"sourcesContent":["<script>\\n  import { useVanguardMouse } from '../../vanguard/animation-service';\\n\\n  export let title = '';\\n  export let description = '';\\n  export let variant = 'default';\\n  export let ariaLabel = undefined;\\n  export let colSpan = 1;\\n  export let rowSpan = 1;\\n\\n  const { x: mouseX, y: mouseY, update: updateMouse } = useVanguardMouse();\\n  let isHovered = false;\\n\\n  function handleMouseMove(e) {\\n    updateMouse(e, e.currentTarget);\\n  }\\n\\n  $: role = (variant === 'accent' || variant === 'glass') ? 'region' : 'article';\\n  $: computedAriaLabel = ariaLabel || \`\${title}: \${description}\`;\\n<\/script>\\n\\n<div\\n  class=\\"vanguard-bento-cell variant-{variant}\\"\\n  role={role}\\n  aria-label={computedAriaLabel}\\n  style:--col-span={colSpan}\\n  style:--row-span={rowSpan}\\n  style:--mouse-x=\\"{$mouseX}%\\"\\n  style:--mouse-y=\\"{$mouseY}%\\"\\n  on:mousemove={handleMouseMove}\\n  on:mouseenter={() => isHovered = true}\\n  on:mouseleave={() => isHovered = false}\\n  tabindex=\\"0\\"\\n>\\n  <div class=\\"content-wrapper\\">\\n    {#if title}\\n      <h3 class=\\"cell-title\\">{title}</h3>\\n    {/if}\\n    {#if description}\\n      <p class=\\"cell-description\\">{description}</p>\\n    {/if}\\n    <slot />\\n  </div>\\n\\n  <!-- Glow Effect (Artistic Element) -->\\n  <div class=\\"glow-layer\\" aria-hidden=\\"true\\"></div>\\n</div>\\n\\n<style>\\n  :root {\\n    --bento-h: 220;\\n    --bento-s: 15%;\\n    --bento-l: 10%;\\n    --bento-bg: hsla(var(--bento-h), var(--bento-s), var(--bento-l), 1);\\n    --bento-border: hsla(var(--bento-h), var(--bento-s), 25%, 0.3);\\n    --bento-accent-h: 280;\\n    --bento-radius: 1.5rem;\\n  }\\n\\n  .vanguard-bento-cell {\\n    grid-column: span var(--col-span, 1);\\n    grid-row: span var(--row-span, 1);\\n    position: relative;\\n    background: var(--bento-bg);\\n    border: 1px solid var(--bento-border);\\n    border-radius: var(--bento-radius);\\n    padding: 2rem;\\n    overflow: hidden;\\n    transition: \\n      transform 400ms cubic-bezier(0.23, 1, 0.32, 1),\\n      border-color 400ms ease,\\n      box-shadow 400ms ease;\\n    outline: none;\\n    cursor: pointer;\\n  }\\n\\n  .vanguard-bento-cell:hover, .vanguard-bento-cell:focus-visible {\\n    transform: translateY(-4px);\\n    border-color: hsla(var(--bento-accent-h), 80%, 60%, 0.5);\\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);\\n  }\\n\\n  .vanguard-bento-cell:focus-visible {\\n    box-shadow: 0 0 0 3px hsla(var(--bento-accent-h), 80%, 60%, 0.6);\\n  }\\n\\n  .content-wrapper {\\n    position: relative;\\n    z-index: 2;\\n  }\\n\\n  .cell-title {\\n    font-family: 'Inter', system-ui, sans-serif;\\n    font-size: 1.25rem;\\n    font-weight: 600;\\n    color: white;\\n    margin: 0 0 0.5rem 0;\\n    letter-spacing: -0.02em;\\n  }\\n\\n  .cell-description {\\n    font-size: 0.9375rem;\\n    color: hsla(0, 0%, 100%, 0.6);\\n    line-height: 1.6;\\n    margin: 0;\\n  }\\n\\n  /* Variant Styles */\\n  .variant-accent {\\n    --bento-bg: hsla(var(--bento-accent-h), 40%, 15%, 1);\\n    --bento-border: hsla(var(--bento-accent-h), 60%, 40%, 0.3);\\n  }\\n\\n  .variant-glass {\\n    background: hsla(var(--bento-h), var(--bento-s), 10%, 0.4);\\n    backdrop-filter: blur(12px);\\n    -webkit-backdrop-filter: blur(12px);\\n  }\\n\\n  /* Glow Layer (The \\"Art\\" aspect) */\\n  .glow-layer {\\n    position: absolute;\\n    top: 0;\\n    left: 0;\\n    width: 100%;\\n    height: 100%;\\n    pointer-events: none;\\n    z-index: 1;\\n    opacity: 0;\\n    background: radial-gradient(\\n      800px circle at var(--mouse-x) var(--mouse-y),\\n      hsla(var(--bento-accent-h), 80%, 60%, 0.15),\\n      transparent 40%\\n    );\\n    transition: opacity 500ms ease;\\n  }\\n\\n  .vanguard-bento-cell:hover .glow-layer,\\n  .vanguard-bento-cell:focus-visible .glow-layer {\\n    opacity: 1;\\n  }\\n</style>\\n"],"names":[],"mappings":"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"}`
};
const BentoCell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let role;
  let computedAriaLabel;
  let $mouseX, $$unsubscribe_mouseX;
  let $mouseY, $$unsubscribe_mouseY;
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { variant = "default" } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { colSpan = 1 } = $$props;
  let { rowSpan = 1 } = $$props;
  const { x: mouseX, y: mouseY } = useVanguardMouse();
  $$unsubscribe_mouseX = subscribe(mouseX, (value) => $mouseX = value);
  $$unsubscribe_mouseY = subscribe(mouseY, (value) => $mouseY = value);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0) $$bindings.variant(variant);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0) $$bindings.ariaLabel(ariaLabel);
  if ($$props.colSpan === void 0 && $$bindings.colSpan && colSpan !== void 0) $$bindings.colSpan(colSpan);
  if ($$props.rowSpan === void 0 && $$bindings.rowSpan && rowSpan !== void 0) $$bindings.rowSpan(rowSpan);
  $$result.css.add(css$1);
  role = variant === "accent" || variant === "glass" ? "region" : "article";
  computedAriaLabel = ariaLabel || `${title}: ${description}`;
  $$unsubscribe_mouseX();
  $$unsubscribe_mouseY();
  return `<div class="${"vanguard-bento-cell variant-" + escape(variant, true) + " svelte-6tkmk5"}"${add_attribute("role", role, 0)}${add_attribute("aria-label", computedAriaLabel, 0)} tabindex="0"${add_styles({
    "--col-span": colSpan,
    "--row-span": rowSpan,
    "--mouse-x": `${$mouseX}%`,
    "--mouse-y": `${$mouseY}%`
  })}><div class="content-wrapper svelte-6tkmk5">${title ? `<h3 class="cell-title svelte-6tkmk5">${escape(title)}</h3>` : ``} ${description ? `<p class="cell-description svelte-6tkmk5">${escape(description)}</p>` : ``} ${slots.default ? slots.default({}) : ``}</div>  <div class="glow-layer svelte-6tkmk5" aria-hidden="true"></div> </div>`;
});
const css = {
  code: ".bento-menu-vanguard.svelte-ccdyiq{padding:6rem 0;background:#020617}",
  map: `{"version":3,"file":"BentoMenu.svelte","sources":["BentoMenu.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte';\\n  import { menuStore } from '$lib/stores/menuStore';\\n  import BentoCell from '../atoms/BentoCell.svelte';\\n\\n  onMount(() => {\\n    menuStore.init();\\n  });\\n<\/script>\\n\\n<section class=\\"bento-menu-vanguard\\" aria-labelledby=\\"menu-title\\">\\n  <div class=\\"max-w-7xl mx-auto px-4\\">\\n    <header class=\\"mb-12 text-center\\">\\n        <h2 id=\\"menu-title\\" class=\\"text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter\\">\\n            Seleção <span class=\\"text-violet-500\\">Premium</span>\\n        </h2>\\n        <p class=\\"text-slate-400 max-w-lg mx-auto\\">\\n            Explora nossa curadoria de lanches artesanais montados com a precisão da vanguarda.\\n        </p>\\n    </header>\\n\\n    <div class=\\"grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]\\">\\n        {#if $menuStore.loading && $menuStore.data.length === 0}\\n            <div class=\\"col-span-1 md:col-span-2 row-span-2 vanguard-card animate-pulse bg-white/5\\"></div>\\n            <div class=\\"vanguard-card animate-pulse bg-white/5\\"></div>\\n            <div class=\\"vanguard-card animate-pulse bg-white/5\\"></div>\\n            <div class=\\"col-span-1 md:col-span-2 vanguard-card animate-pulse bg-white/5\\"></div>\\n        {:else}\\n            {#each $menuStore.data.slice(0, 6) as item, i}\\n                <BentoCell\\n                    title={item.name}\\n                    description={item.description}\\n                    colSpan={i === 0 ? 2 : 1}\\n                    rowSpan={i === 0 ? 2 : 1}\\n                    variant={i === 0 ? 'accent' : 'glass'}\\n                >\\n                    <div class=\\"flex items-center justify-between\\">\\n                        <span class=\\"text-2xl font-black text-white\\">R$ {item.price.toFixed(2)}</span>\\n                        <button class=\\"bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform\\">\\n                            Adicionar\\n                        </button>\\n                    </div>\\n                </BentoCell>\\n            {/each}\\n        {/if}\\n    </div>\\n  </div>\\n</section>\\n\\n<style>\\n  .bento-menu-vanguard {\\n    padding: 6rem 0;\\n    background: #020617;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAkDE,kCAAqB,CACnB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,UAAU,CAAE,OACd"}`
};
const BentoMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $menuStore, $$unsubscribe_menuStore;
  $$unsubscribe_menuStore = subscribe(menuStore, (value) => $menuStore = value);
  $$result.css.add(css);
  $$unsubscribe_menuStore();
  return `<section class="bento-menu-vanguard svelte-ccdyiq" aria-labelledby="menu-title"><div class="max-w-7xl mx-auto px-4"><header class="mb-12 text-center" data-svelte-h="svelte-9t3qin"><h2 id="menu-title" class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">Seleção <span class="text-violet-500">Premium</span></h2> <p class="text-slate-400 max-w-lg mx-auto">Explora nossa curadoria de lanches artesanais montados com a precisão da vanguarda.</p></header> <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">${$menuStore.loading && $menuStore.data.length === 0 ? `<div class="col-span-1 md:col-span-2 row-span-2 vanguard-card animate-pulse bg-white/5"></div> <div class="vanguard-card animate-pulse bg-white/5"></div> <div class="vanguard-card animate-pulse bg-white/5"></div> <div class="col-span-1 md:col-span-2 vanguard-card animate-pulse bg-white/5"></div>` : `${each($menuStore.data.slice(0, 6), (item, i) => {
    return `${validate_component(BentoCell, "BentoCell").$$render(
      $$result,
      {
        title: item.name,
        description: item.description,
        colSpan: i === 0 ? 2 : 1,
        rowSpan: i === 0 ? 2 : 1,
        variant: i === 0 ? "accent" : "glass"
      },
      {},
      {
        default: () => {
          return `<div class="flex items-center justify-between"><span class="text-2xl font-black text-white">R$ ${escape(item.price.toFixed(2))}</span> <button class="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform" data-svelte-h="svelte-1hno37b">Adicionar
                        </button></div> `;
        }
      }
    )}`;
  })}`}</div></div> </section>`;
});
export {
  BentoMenu as B
};
