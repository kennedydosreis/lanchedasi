<script>
    export let categories = [];
    export let activeTab = 'all';
    export let onTabClick = () => {};

    const icons = {
        'all': 'fas fa-th-large',
        'combos': 'fas fa-star',
        'sanduiches': 'fas fa-hamburger',
        'kikao': 'fas fa-hotdog',
        'porcoes': 'fas fa-drumstick-bite',
        'pratos': 'fas fa-utensils',
        'bebidas': 'fas fa-wine-glass'
    };
</script>

<div class="category-bar-wrapper">
    <div class="category-bar" role="tablist">
        <button
            class="category-item"
            class:active={activeTab === 'all'}
            on:click={() => onTabClick('all')}
            role="tab"
            aria-selected={activeTab === 'all'}
        >
            <div class="icon-circle">
                <i class={icons['all']}></i>
            </div>
            <span>Todos</span>
        </button>

        {#each categories as category}
            <button
                class="category-item"
                class:active={activeTab === category.id}
                on:click={() => onTabClick(category.id)}
                role="tab"
                aria-selected={activeTab === category.id}
            >
                <div class="icon-circle">
                    <i class={icons[category.id] || 'fas fa-utensils'}></i>
                </div>
                <span>{category.tabLabel}</span>
            </button>
        {/each}
    </div>
</div>

<style>
    .category-bar-wrapper {
        position: sticky;
        top: 60px;
        z-index: 100;
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--gray-200);
        margin: 0 calc(-1 * var(--spacing-4));
        padding: var(--spacing-4) 0;
        transition: all 0.3s ease;
    }

    .category-bar {
        display: flex;
        gap: var(--spacing-6);
        overflow-x: auto;
        padding: 0 var(--spacing-6);
        scrollbar-width: none;
    }

    .category-bar::-webkit-scrollbar {
        display: none;
    }

    .category-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        background: none;
        border: none;
        cursor: pointer;
        flex-shrink: 0;
        transition: transform 0.2s;
        padding: 0;
    }

    .category-item:active {
        transform: scale(0.95);
    }

    .icon-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: var(--white);
        border: 2px solid var(--gray-200);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: var(--gray-600);
        transition: all 0.3s ease;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .category-item span {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--gray-500);
        transition: color 0.3s;
    }

    .category-item.active .icon-circle {
        border-color: var(--secondary-color);
        background: var(--secondary-color);
        color: white;
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }

    .category-item.active span {
        color: var(--secondary-color);
    }

    @media (max-width: 768px) {
        .category-bar-wrapper {
            top: 56px;
            padding: var(--spacing-3) 0;
        }
        .icon-circle {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }
        .category-bar {
            gap: var(--spacing-4);
        }
    }
</style>
