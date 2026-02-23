<script>
    import MenuCategory from './MenuCategory.svelte';

    export let menuData = null;

    let loading = false;
    let error = null;
    let activeTab = 'all'; // 'all' or category id

    const categories = [
        {
            id: 'combos',
            title: '🍟 Combos Especiais',
            description: 'Economize com nossos combos promocionais!',
            tabLabel: 'Combos'
        },
        {
            id: 'sanduiches',
            title: '🍔 Sanduíches',
            description: 'Sanduíches saborosos e bem preparados na hora',
            tabLabel: 'Sanduíches'
        },
        {
            id: 'kikao',
            title: '🌭 Kikões',
            description: 'Os famosos kikões da casa!',
            tabLabel: 'Kikões'
        },
        {
            id: 'porcoes',
            title: '🍟 Porções & Salgados',
            description: 'Perfeitas para compartilhar',
            tabLabel: 'Porções'
        },
        {
            id: 'pratos',
            title: '🍽️ Pratos Principais',
            description: 'Pratos completos e saborosos',
            tabLabel: 'Pratos'
        },
        {
            id: 'bebidas',
            title: '🥤 Bebidas',
            description: 'Refrescantes e geladas',
            tabLabel: 'Bebidas'
        }
    ];

    function getPopularItems(data) {
        const allItems = [
            ...(data.combos || []),
            ...(data.sanduiches || []),
            ...(data.kikao || []),
            ...(data.porcoes || []),
            ...(data.pratos || []),
            ...(data.bebidas || [])
        ];
        return allItems.filter(item => item.popular);
    }

    function scrollToTabs() {
        const tabsElement = document.querySelector('.category-tabs');
        if (tabsElement) {
            const offset = 80; // Account for fixed header
            const elementPosition = tabsElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    function handleTabClick(categoryId) {
        activeTab = categoryId;
        
        // Small delay to allow tab state to update
        setTimeout(scrollToTabs, 100);
    }

    // Menu data is now passed as prop from +page.js load function

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
            <div class="loading-state">
                <p>Carregando cardápio...</p>
            </div>
        {:else if error}
            <div class="error-state">
                <p>Erro ao carregar o cardápio. Por favor, tente novamente.</p>
            </div>
        {:else if menuData}
            {#if popularItems.length > 0}
                <div class="popular-section">
                    <h2 class="section-title">⭐ Mais Pedidos</h2>
                    <MenuCategory
                        items={popularItems}
                        categoryId="populares"
                    />
                </div>
            {/if}

            <!-- Category Tabs -->
            {#if categoriesWithItems.length > 0}
                <div class="category-tabs-wrapper">
                    <div class="category-tabs" role="tablist" aria-label="Filtro de categorias">
                        <button
                            class="tab"
                            class:active={activeTab === 'all'}
                            on:click={() => handleTabClick('all')}
                            role="tab"
                            aria-selected={activeTab === 'all'}
                            aria-controls="menu-content"
                        >
                            Todos
                        </button>
                        {#each categoriesWithItems as category}
                            <button
                                class="tab"
                                class:active={activeTab === category.id}
                                on:click={() => handleTabClick(category.id)}
                                role="tab"
                                aria-selected={activeTab === category.id}
                                aria-controls="menu-content"
                            >
                                {category.tabLabel}
                            </button>
                        {/each}
                    </div>
                </div>
            {/if}

            <div class="menu-content" id="menu-content" role="tabpanel">
                {#each visibleCategories as category}
                    {#if category.items.length > 0}
                        <MenuCategory
                            title={category.title}
                            items={category.items}
                            categoryId={category.id}
                            description={category.description}
                        />
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .menu-section {
        padding: var(--spacing-12) 0;
        background: var(--gray-50);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--spacing-12);
    }

    .gradient-text {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: var(--spacing-4);
    }

    .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-600);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.6;
    }

    .section-title {
        font-size: var(--font-size-3xl);
        font-weight: 800;
        color: var(--gray-900);
        margin-bottom: var(--spacing-8);
        text-align: center;
    }

    .popular-section {
        margin-bottom: var(--spacing-12);
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        border-radius: 24px;
        padding: var(--spacing-8);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    /* Category Tabs */
    .category-tabs-wrapper {
        position: sticky;
        top: 60px; /* Below fixed header */
        z-index: 10;
        background: var(--gray-50);
        padding: var(--spacing-4) 0;
        margin: 0 calc(-1 * var(--spacing-4));
        margin-bottom: var(--spacing-8);
    }

    .category-tabs {
        display: flex;
        gap: var(--spacing-2);
        overflow-x: auto;
        padding: 0 var(--spacing-4);
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE/Edge */
    }

    .category-tabs::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    .tab {
        flex-shrink: 0;
        padding: var(--spacing-3) var(--spacing-6);
        border: 2px solid var(--gray-300);
        border-radius: 24px;
        background: white;
        color: var(--gray-700);
        font-size: var(--font-size-sm);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        white-space: nowrap;
        user-select: none;
    }

    .tab:hover {
        border-color: var(--primary-color);
        background: var(--gray-100);
        transform: translateY(-1px);
    }

    .tab:active {
        transform: translateY(0);
    }

    .tab.active {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
        box-shadow: 0 2px 8px rgba(237, 137, 54, 0.3);
    }

    .menu-content {
        padding-top: var(--spacing-4);
        min-height: 400px; /* Prevent layout shift */
    }

    .loading-state,
    .error-state {
        text-align: center;
        padding: var(--spacing-12);
        font-size: var(--font-size-lg);
        color: var(--gray-600);
    }

    .error-state {
        color: var(--error-color);
    }

    @media (max-width: 768px) {
        .menu-section {
            padding: var(--spacing-8) 0;
        }

        .gradient-text {
            font-size: var(--font-size-3xl);
        }

        .section-subtitle {
            font-size: var(--font-size-base);
        }

        .popular-section {
            padding: var(--spacing-6);
            margin-bottom: var(--spacing-8);
        }

        .category-tabs-wrapper {
            top: 56px; /* Mobile header height */
            padding: var(--spacing-3) 0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .tab {
            padding: var(--spacing-2) var(--spacing-4);
            font-size: var(--font-size-xs);
        }
    }

    /* Tablet and larger screens */
    @media (min-width: 768px) {
        .category-tabs {
            justify-content: center;
            overflow-x: visible;
        }
    }
</style>
