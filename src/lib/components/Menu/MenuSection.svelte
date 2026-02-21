<script>
    import MenuCategory from './MenuCategory.svelte';

    export let menuData = null;

    let loading = false;
    let error = null;

    const categories = [
        {
            id: 'combos',
            title: '🍟 Combos Especiais',
            description: 'Economize com nossos combos promocionais!'
        },
        {
            id: 'sanduiches',
            title: '🍔 Sanduíches',
            description: 'Sanduíches saborosos e bem preparados na hora'
        },
        {
            id: 'kikao',
            title: '🌭 Kikões',
            description: 'Os famosos kikões da casa!'
        },
        {
            id: 'porcoes',
            title: '🍟 Porções & Salgados',
            description: 'Perfeitas para compartilhar'
        },
        {
            id: 'pratos',
            title: '🍽️ Pratos Principais',
            description: 'Pratos completos e saborosos'
        },
        {
            id: 'bebidas',
            title: '🥤 Bebidas',
            description: 'Refrescantes e geladas'
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

    $: popularItems = menuData ? getPopularItems(menuData) : [];
    $: categoriesWithItems = menuData ? categories.map(cat => ({
        ...cat,
        items: menuData[cat.id] || []
    })) : [];
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
                    <MenuCategory
                        title="⭐ Mais Pedidos"
                        items={popularItems}
                        categoryId="populares"
                    />
                </div>
            {/if}

            <div class="menu-content">
                {#each categoriesWithItems as category}
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

    .popular-section {
        margin-bottom: var(--spacing-12);
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        border-radius: 24px;
        padding: var(--spacing-8);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .menu-content {
        padding-top: var(--spacing-8);
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
    }
</style>
