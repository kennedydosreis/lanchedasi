<script>
    import MenuItem from './MenuItem.svelte';

    export let title;
    export let items;
    export let categoryId;
    export let description = '';
</script>

<section class="menu-category" id={categoryId} aria-label={title}>
    <div class="category-header">
        <h3 class="category-title">{title}</h3>
        {#if description}
            <p class="category-description">{description}</p>
        {/if}
    </div>
    <div class="menu-grid">
        {#each items as item}
            <MenuItem {item} />
        {/each}
    </div>
</section>

<style>
    .menu-category {
        margin-bottom: var(--spacing-12);
    }

    .category-header {
        text-align: center;
        margin-bottom: var(--spacing-8);
    }

    .category-title {
        font-size: var(--font-size-3xl);
        font-weight: 700;
        color: var(--gray-900);
        margin-bottom: var(--spacing-3);
        position: relative;
    }

    .category-title::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background: var(--secondary-color);
        border-radius: 2px;
    }

    .category-description {
        font-size: var(--font-size-lg);
        color: var(--gray-600);
        font-style: italic;
        margin: 0;
    }

    .menu-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: var(--spacing-6);
    }

    @media (max-width: 768px) {
        .menu-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-4);
        }

        .category-title {
            font-size: var(--font-size-2xl);
        }

        .category-description {
            font-size: var(--font-size-base);
        }
    }
</style>
