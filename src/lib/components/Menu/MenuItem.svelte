<script>
    import { cart } from '$lib/stores/cart.js';

    export let item;

    function addToCart() {
        cart.addItem(item);
    }

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function getCategoryIcon(category) {
        const icons = {
            'combos': 'fas fa-star',
            'sanduiches': 'fas fa-hamburger',
            'kikao': 'fas fa-hotdog',
            'bebidas': 'fas fa-wine-glass',
            'porcoes': 'fas fa-drumstick-bite',
            'pratos': 'fas fa-utensils'
        };
        return icons[category] || 'fas fa-utensils';
    }
</script>

<div class="menu-item" class:popular={item.popular}>
    <!-- accessibility-fix: issue-19, issue-10 - Decorative icons aria-hidden -->
    <div class="item-image">
        <div class="image-placeholder" aria-hidden="true">
            <i class={getCategoryIcon(item.category)}></i>
        </div>
        {#if item.popular}
            <div class="popular-badge">
                <i class="fas fa-fire" aria-hidden="true"></i>
                Popular
            </div>
        {/if}
    </div>
    <!-- /accessibility-fix -->
    <div class="item-content">
        <h3 class="item-name">{item.name}</h3>
        <p class="item-description">{item.description}</p>
        <div class="item-footer">
            <span class="item-price">{formatPrice(item.price)}</span>
            <button class="add-button" on:click={addToCart} aria-label="Adicionar {item.name} ao carrinho">
                <i class="fas fa-plus" aria-hidden="true"></i>
                Adicionar
            </button>
        </div>
    </div>
</div>

<style>
    .menu-item {
        background: var(--white);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .menu-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .menu-item.popular {
        border: 2px solid var(--secondary-color);
        box-shadow: 0 6px 25px rgba(245, 158, 11, 0.2);
    }

    .item-image {
        position: relative;
        width: 100%;
        height: 200px;
        overflow: hidden;
    }

    .image-placeholder {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--gray-100), var(--gray-200));
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gray-500);
        font-size: 3rem;
        transition: all 0.3s ease;
    }

    .menu-item:hover .image-placeholder {
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        color: var(--gray-700);
        transform: scale(1.05);
    }

    .popular-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: linear-gradient(45deg, var(--secondary-color), #f97316);
        color: var(--white);
        padding: var(--spacing-1) var(--spacing-3);
        border-radius: 20px;
        font-size: var(--font-size-xs);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        animation: pulse 2s infinite;
    }

    .item-content {
        padding: var(--spacing-6);
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .item-name {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--gray-900);
        margin: 0;
        line-height: 1.2;
    }

    .item-description {
        color: var(--gray-600);
        line-height: 1.5;
        flex: 1;
        margin: 0;
        font-size: var(--font-size-sm);
    }

    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        gap: var(--spacing-4);
        padding-top: var(--spacing-4);
        border-top: 1px solid var(--gray-100);
    }

    .item-price {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--secondary-color);
    }

    .add-button {
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3) var(--spacing-5);
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        font-size: var(--font-size-sm);
    }

    .add-button:hover {
        background: #d97706;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }

    .add-button i {
        font-size: var(--font-size-xs);
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.9;
        }
    }

    @media (max-width: 768px) {
        .item-footer {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-3);
        }

        .add-button {
            justify-content: center;
        }

        .item-image {
            height: 160px;
        }

        .image-placeholder {
            font-size: 2.5rem;
        }
    }
</style>
