<script>
    import MenuCategory from './MenuCategory.svelte';
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

    function getPopularItems(data) {
        const allItems = Object.values(data).flat();
        return allItems.filter(item => item.popular);
    }

    function handleTabClick(categoryId) {
        activeTab = categoryId;
        const menuElement = document.getElementById('menu-content');
        if (menuElement) {
            const offset = 140; 
            const position = menuElement.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: position, behavior: 'smooth' });
        }
    }

    $: popularItems = menuData ? getPopularItems(menuData) : [];
    $: categoriesWithItems = menuData ? categories.map(cat => ({
        ...cat,
        items: menuData[cat.id] || []
    })).filter(cat => cat.items.length > 0) : [];
    
    $: visibleCategories = activeTab === 'all' 
        ? categoriesWithItems 
        : categoriesWithItems.filter(cat => cat.id === activeTab);
</script>

<section id="menu" class="menu-section" aria-label="Cardápio">
    <div class="container">
        <div class="section-header">
            <h2 class="gradient-text">Nosso Cardápio</h2>
            <p class="section-subtitle">Escolha seus pratos favoritos e monte seu pedido</p>
        </div>

        {#if loading}
            <div class="loading-state"><p>Carregando...</p></div>
        {:else if error}
            <div class="error-state"><p>Erro ao carregar cardápio.</p></div>
        {:else if menuData}
            {#if popularItems.length > 0 && activeTab === 'all'}
                <div class="popular-section">
                    <h2 class="section-title">⭐ Mais Pedidos</h2>
                    <MenuCategory items={popularItems} categoryId="populares" />
                </div>
            {/if}

            <CategoryBar {categories} {activeTab} onTabClick={handleTabClick} />

            <div class="menu-content" id="menu-content" role="tabpanel">
                {#each visibleCategories as category}
                    <MenuCategory
                        title={category.title}
                        items={category.items}
                        categoryId={category.id}
                        description={category.description}
                    />
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .menu-section { padding: var(--spacing-12) 0; background: var(--gray-50); }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 var(--spacing-4); }
    .section-header { text-align: center; margin-bottom: var(--spacing-12); }
    .gradient-text { font-size: var(--font-size-4xl); font-weight: 800; background: linear-gradient(135deg, var(--secondary-color), var(--accent-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: var(--spacing-4); }
    .section-subtitle { font-size: var(--font-size-lg); color: var(--gray-600); max-width: 600px; margin: 0 auto; line-height: 1.6; }
    .section-title { font-size: var(--font-size-3xl); font-weight: 800; color: var(--gray-900); margin-bottom: var(--spacing-8); text-align: center; }
    .popular-section { margin-bottom: var(--spacing-12); background: linear-gradient(135deg, var(--primary-color), var(--primary-hover)); border-radius: 24px; padding: var(--spacing-8); }
    .menu-content { padding-top: var(--spacing-8); min-height: 400px; }
    @media (max-width: 768px) {
        .gradient-text { font-size: var(--font-size-3xl); }
        .section-subtitle { font-size: var(--font-size-sm); }
    }
</style>
