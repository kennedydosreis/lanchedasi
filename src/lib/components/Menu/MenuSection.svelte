<script>
    import { onMount } from 'svelte';
    import BentoMenu from '../organisms/BentoMenu.svelte';
    import CategoryBar from '../molecules/CategoryBar.svelte';

    export let menuData = null;

    let loading = false;
    let error = null;
    let activeTab = 'all';

    const categories = [
        { id: 'combos', title: '🍟 Combos Especiais', description: 'Economize com nossos combos promocionais!', tabLabel: 'Combos' },
        { id: 'sanduiches', title: '🍔 Sanduíches', description: 'Sanduíches saborosos e bem preparados na hora', tabLabel: 'Sanduíches' },
        { id: 'kikao', title: '🌭 Kikões', description: 'Os famosos kikões da casa!', tabLabel: 'Kikões' },
        { id: 'porcoes', title: '🍟 Porções & Salgados', description: 'Perfeitas para compartilhar', tabLabel: 'Porções' },
        { id: 'pratos', title: '🍽️ Pratos Principais', description: 'Pratos completos e saborosos', tabLabel: 'Pratos' },
        { id: 'bebidas', title: '🥤 Bebidas', description: 'Refrescantes e geladas', tabLabel: 'Bebidas' }
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

    $: categoriesWithItems = menuData ? categories.map(cat => ({
        ...cat,
        items: menuData[cat.id] || []
    })).filter(cat => cat.items.length > 0) : [];
    
    $: visibleItems = activeTab === 'all' 
        ? Object.values(menuData || {}).flat()
        : (menuData ? menuData[activeTab] || [] : []);
</script>

<section id="menu" class="menu-section" aria-label="Cardápio">
    <div class="container">
        <div class="section-header">
            <h2 class="vanguard-title">Bento Revolution</h2>
            <p class="section-subtitle">A nova era do sabor chegou. Navegue pela grade dinâmica.</p>
        </div>

        {#if loading}
            <div class="loading-state"><p>Carregando...</p></div>
        {:else if error}
            <div class="error-state"><p>Erro ao carregar cardápio.</p></div>
        {:else if menuData}
            <CategoryBar {categories} {activeTab} onTabClick={handleTabClick} />

            <div class="menu-content" id="menu-content" role="tabpanel">
                <BentoMenu items={visibleItems} categoryId={activeTab} />
            </div>
        {/if}
    </div>
</section>

<style>
    .menu-section { padding: var(--spacing-12) 0; background: #fafafa; min-height: 100vh; }
    .container { max-width: 1400px; margin: 0 auto; padding: 0 var(--spacing-4); }
    .section-header { text-align: left; margin-bottom: var(--spacing-12); }
    
    .vanguard-title { 
        font-size: clamp(3rem, 10vw, 6rem); 
        font-weight: 900; 
        letter-spacing: -0.05em;
        line-height: 0.9;
        text-transform: uppercase;
        background: linear-gradient(to right, var(--gray-900), var(--gray-400));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: var(--spacing-4);
    }

    .section-subtitle { 
        font-size: var(--font-size-xl); 
        color: var(--gray-600); 
        max-width: 500px; 
        line-height: 1.4;
        font-weight: 500;
    }

    .menu-content { 
        padding-top: var(--spacing-8); 
        view-transition-name: bento-rearrange;
    }
    
    :global(::view-transition-group(bento-rearrange)) {
        animation-duration: 0.5s;
        animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @media (max-width: 768px) {
        .vanguard-title { font-size: 3rem; }
        .section-header { text-align: center; }
        .section-subtitle { margin: 0 auto; }
    }
</style>

