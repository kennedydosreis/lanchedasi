<script>
    import MetaTags from '$lib/components/MetaTags.svelte';
    import Hero from '$lib/components/Hero.svelte';
    import BentoMenu from '$lib/components/organisms/BentoMenu.svelte';
    import Contact from '$lib/components/Contact.svelte';

    export let data;

    function getPopularItems(menuData) {
        if (!menuData) return [];
        
        const allItems = [
            ...(menuData.combos || []),
            ...(menuData.sanduiches || []),
            ...(menuData.kikao || []),
            ...(menuData.porcoes || []),
            ...(menuData.pratos || []),
            ...(menuData.bebidas || [])
        ];
        return allItems.filter(item => item.popular);
    }

    $: popularItems = getPopularItems(data.menuData);
</script>

<MetaTags />
<Hero />

{#if popularItems.length > 0}
    <section id="populares" class="popular-section">
        <div class="container">
            <h2 class="section-title">⭐ Mais Pedidos</h2>
            <BentoMenu
                items={popularItems}
            />
            
            <div class="cta-container">
                <a href="/cardapio" class="cta-button">
                    <span>Ver Cardápio Completo</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    </section>
{/if}

<Contact />

<style>
    .popular-section {
        padding: var(--spacing-12) 0;
        background: var(--gray-50);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .section-title {
        font-size: var(--font-size-3xl);
        font-weight: 800;
        color: var(--gray-900);
        margin-bottom: var(--spacing-8);
        text-align: center;
    }

    .cta-container {
        display: flex;
        justify-content: center;
        margin-top: var(--spacing-10);
    }

    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-3);
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
        color: white;
        padding: var(--spacing-5) var(--spacing-8);
        border-radius: 16px;
        text-decoration: none;
        font-weight: 700;
        font-size: var(--font-size-xl);
        transition: all 0.3s ease;
        box-shadow: 0 8px 16px rgba(245, 158, 11, 0.3);
    }

    .cta-button:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(245, 158, 11, 0.4);
    }

    .cta-button i {
        transition: transform 0.3s ease;
    }

    .cta-button:hover i {
        transform: translateX(4px);
    }

    @media (max-width: 768px) {
        .popular-section {
            padding: var(--spacing-8) 0;
        }

        .cta-button {
            font-size: var(--font-size-lg);
            padding: var(--spacing-4) var(--spacing-6);
        }
    }
</style>
