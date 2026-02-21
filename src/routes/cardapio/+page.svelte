<script>
    import MetaTags from '$lib/components/MetaTags.svelte';
    import MenuSection from '$lib/components/Menu/MenuSection.svelte';

    export let data;
</script>

<MetaTags 
    title="Cardápio - Lanche da Si"
    description="Confira nosso cardápio completo com combos, sanduíches, kikões, porções, pratos e bebidas."
/>

<div class="page-header">
    <div class="container">
        <h1 class="gradient-text">Nosso Cardápio Completo</h1>
        <p class="subtitle">Explore todas as delícias que preparamos para você</p>
    </div>
</div>

<MenuSection menuData={data.menuData} />

<style>
    .page-header {
        padding: calc(var(--spacing-12) + 60px) 0 var(--spacing-8) 0;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        text-align: center;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .gradient-text {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-4);
    }

    .subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-700);
        max-width: 600px;
        margin: 0 auto;
    }

    @media (max-width: 768px) {
        .page-header {
            padding: calc(var(--spacing-8) + 56px) 0 var(--spacing-6) 0;
        }

        .gradient-text {
            font-size: var(--font-size-3xl);
        }

        .subtitle {
            font-size: var(--font-size-base);
        }
    }
</style>
