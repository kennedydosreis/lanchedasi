<script>
    import MenuCategory from './MenuCategory.svelte';
    import { menuData } from '$lib/data/menu.js';

    const categories = [
        {
            id: 'combos',
            title: '🍟 Combos Especiais',
            items: menuData.combos,
            description: 'Economize com nossos combos promocionais!'
        },
        {
            id: 'sanduiches',
            title: '🍔 Sanduíches',
            items: menuData.sanduiches,
            description: 'Sanduíches saborosos e bem preparados na hora'
        },
        {
            id: 'kikao',
            title: '🌭 Kikões',
            items: menuData.kikao,
            description: 'Os famosos kikões da casa!'
        },
        {
            id: 'porcoes',
            title: '🍟 Porções & Salgados',
            items: menuData.porcoes,
            description: 'Perfeitas para compartilhar'
        },
        {
            id: 'pratos',
            title: '🍽️ Pratos Principais',
            items: menuData.pratos,
            description: 'Pratos completos e saborosos'
        },
        {
            id: 'bebidas',
            title: '🥤 Bebidas',
            items: menuData.bebidas,
            description: 'Refrescantes e geladas'
        }
    ];

    function getPopularItems() {
        const allItems = [
            ...menuData.combos,
            ...menuData.sanduiches,
            ...menuData.kikao,
            ...menuData.porcoes,
            ...menuData.pratos,
            ...menuData.bebidas
        ];
        return allItems.filter(item => item.popular);
    }

    const popularItems = getPopularItems();
</script>

<section id="menu" class="menu-section">
    <div class="container">
        <div class="section-header">
            <h2 class="gradient-text">Nosso Cardápio</h2>
            <p class="section-subtitle">Escolha seus pratos favoritos e monte seu pedido</p>
        </div>

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
            {#each categories as category}
                <MenuCategory
                    title={category.title}
                    items={category.items}
                    categoryId={category.id}
                    description={category.description}
                />
            {/each}
        </div>
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

        .menu-content {
            padding-top: var(--spacing-8);
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
        }
    }
</style>
