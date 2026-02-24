<script>
  import { onMount } from 'svelte';
  import { menuStore } from '$lib/stores/menuStore';
  import BentoCell from '../atoms/BentoCell.svelte';

  onMount(() => {
    menuStore.init();
  });
</script>

<section class="bento-menu-vanguard" aria-labelledby="menu-title">
  <div class="max-w-7xl mx-auto px-4">
    <header class="mb-12 text-center">
        <h2 id="menu-title" class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            Seleção <span class="text-violet-500">Premium</span>
        </h2>
        <p class="text-slate-400 max-w-lg mx-auto">
            Explora nossa curadoria de lanches artesanais montados com a precisão da vanguarda.
        </p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
        {#if $menuStore.loading && $menuStore.data.length === 0}
            <div class="col-span-1 md:col-span-2 row-span-2 vanguard-card animate-pulse bg-white/5"></div>
            <div class="vanguard-card animate-pulse bg-white/5"></div>
            <div class="vanguard-card animate-pulse bg-white/5"></div>
            <div class="col-span-1 md:col-span-2 vanguard-card animate-pulse bg-white/5"></div>
        {:else}
            {#each $menuStore.data.slice(0, 6) as item, i}
                <BentoCell
                    title={item.name}
                    description={item.description}
                    colSpan={i === 0 ? 2 : 1}
                    rowSpan={i === 0 ? 2 : 1}
                    variant={i === 0 ? 'accent' : 'glass'}
                >
                    <div class="flex items-center justify-between">
                        <span class="text-2xl font-black text-white">R$ {item.price.toFixed(2)}</span>
                        <button class="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform">
                            Adicionar
                        </button>
                    </div>
                </BentoCell>
            {/each}
        {/if}
    </div>
  </div>
</section>

<style>
  .bento-menu-vanguard {
    padding: 6rem 0;
    background: #020617;
  }
</style>
