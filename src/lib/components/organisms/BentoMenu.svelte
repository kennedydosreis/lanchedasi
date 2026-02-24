<script>
  import { onMount } from 'svelte';
  import { menuStore } from '$lib/stores/menuStore';
  import BentoCell from '../../vanguard/atoms/BentoCell.svelte';

  onMount(() => {
    menuStore.init();
  });

  const skeletons = [
    { colSpan: 2, rowSpan: 2 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 }
  ];
</script>

<section class="bento-menu" aria-labelledby="menu-title">
  <h2 id="menu-title" class="sr-only">Menu Lanchedasi</h2>

  <div class="grid-container">
    {#if $menuStore.loading && $menuStore.data.length === 0}
      {#each skeletons as skeleton}
        <div 
          class="skeleton-cell shimmer"
          style="grid-column: span {skeleton.colSpan}; grid-row: span {skeleton.rowSpan}"
        ></div>
      {/each}
    {:else if $menuStore.error && $menuStore.data.length === 0}
      <div class="error-container">
        <div class="error-state">
          <p>Erro ao carregar o menu: {$menuStore.error}</p>
          <button on:click={() => menuStore.refresh()}>Tentar novamente</button>
        </div>
      </div>
    {:else}
      {#each $menuStore.data as item, i}
        <BentoCell
          title={item.name}
          description={item.description}
          colSpan={i === 0 ? 2 : 1}
          rowSpan={i === 0 ? 2 : 1}
          variant={i === 0 ? 'accent' : 'glass'}
        >
          <div class="price">R$ {item.price.toFixed(2)}</div>
        </BentoCell>
      {/each}
    {/if}
  </div>

  {#if $menuStore.stale && !$menuStore.loading && $menuStore.data.length > 0}
    <div class="stale-warning">
      Exibindo dados offline. Algumas informações podem estar desatualizadas.
    </div>
  {/if}

  {#if $menuStore.error && $menuStore.data.length === 0}
    <div class="error-state">
      <p>Erro ao carregar o menu: {$menuStore.error}</p>
      <button on:click={() => menuStore.refresh()}>Tentar novamente</button>
    </div>
  {/if}
</section>

<style>
  .bento-menu {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(180px, auto);
    gap: 1.5rem;
  }

  .skeleton-cell {
    background: #e0e0e0;
    border-radius: 12px;
    min-height: 180px;
  }

  .shimmer {
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  .price {
    font-weight: bold;
    margin-top: 0.5rem;
  }

  .stale-warning {
    margin-top: 1rem;
    padding: 0.5rem;
    background: #fff3cd;
    color: #856404;
    border-radius: 4px;
    text-align: center;
    font-size: 0.875rem;
  }

  .error-container {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
  }

  .error-state {
    text-align: center;
    padding: 2rem;
    background: var(--gray-100, #f7fafc);
    border-radius: 16px;
    border: 1px solid var(--gray-200, #edf2f7);
    width: 100%;
  }

  .error-state p {
    color: var(--gray-600, #718096);
    margin-bottom: 1rem;
  }

  .error-state button {
    background: var(--primary-color, #ff4757);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .error-state button:hover {
    transform: scale(1.05);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: 1fr;
    }
    
    .skeleton-cell {
      grid-column: span 1 !important;
      grid-row: span 1 !important;
    }
  }
</style>
