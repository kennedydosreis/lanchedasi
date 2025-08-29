<script>
    import { cart } from '$lib/stores/cart.js';

    export let item;

    function updateQuantity(newQuantity) {
        cart.updateQuantity(item.id, parseInt(newQuantity));
    }

    function removeItem() {
        cart.removeItem(item.id);
    }

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    $: itemTotal = item.price * item.quantity;
</script>

<div class="cart-item">
    <div class="item-info">
        <h4 class="item-name">{item.name}</h4>
        <p class="item-price">{formatPrice(item.price)}</p>
    </div>

    <div class="item-controls">
        <div class="quantity-controls">
            <button class="quantity-btn" on:click={() => updateQuantity(item.quantity - 1)}>-</button>
            <span class="quantity">{item.quantity}</span>
            <button class="quantity-btn" on:click={() => updateQuantity(item.quantity + 1)}>+</button>
        </div>

        <div class="item-total">
            {formatPrice(itemTotal)}
        </div>

        <button class="remove-btn" on:click={removeItem}>
            <i class="fas fa-trash"></i>
        </button>
    </div>
</div>

<style>
    .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-4);
        border-bottom: 1px solid var(--gray-200);
        gap: var(--spacing-4);
    }

    .item-info {
        flex: 1;
    }

    .item-name {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--gray-900);
        margin: 0 0 var(--spacing-1) 0;
    }

    .item-price {
        font-size: var(--font-size-sm);
        color: var(--gray-600);
        margin: 0;
    }

    .item-controls {
        display: flex;
        align-items: center;
        gap: var(--spacing-4);
    }

    .quantity-controls {
        display: flex;
        align-items: center;
        background: var(--gray-100);
        border-radius: 8px;
        overflow: hidden;
    }

    .quantity-btn {
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .quantity-btn:hover {
        background: #d97706;
    }

    .quantity {
        background: var(--white);
        padding: 0 var(--spacing-3);
        min-width: 40px;
        text-align: center;
        font-weight: 600;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item-total {
        font-weight: 700;
        color: var(--secondary-color);
        min-width: 80px;
        text-align: right;
    }

    .remove-btn {
        background: var(--danger-color);
        color: var(--white);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .remove-btn:hover {
        background: #dc2626;
    }

    @media (max-width: 768px) {
        .cart-item {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-3);
            padding: var(--spacing-4) var(--spacing-2);
        }

        .item-info {
            text-align: left;
        }

        .item-name {
            font-size: var(--font-size-lg);
            line-height: 1.3;
        }

        .item-price {
            font-size: var(--font-size-base);
            margin-top: var(--spacing-1);
        }

        .item-controls {
            justify-content: space-between;
            align-items: center;
            gap: var(--spacing-3);
        }

        .quantity-controls {
            flex: 0 0 auto;
            border-radius: 8px;
        }

        .quantity-btn {
            width: 40px;
            height: 40px;
            font-size: var(--font-size-lg);
            font-weight: bold;
            border-radius: 8px;
            touch-action: manipulation;
        }

        .quantity {
            min-width: 50px;
            height: 40px;
            font-size: var(--font-size-lg);
            font-weight: 700;
        }

        .item-total {
            font-size: var(--font-size-lg);
            font-weight: 700;
            color: var(--secondary-color);
            min-width: auto;
            text-align: left;
            flex: 1;
        }

        .remove-btn {
            width: 40px;
            height: 40px;
            font-size: var(--font-size-base);
            border-radius: 8px;
            flex-shrink: 0;
            touch-action: manipulation;
        }
    }

    @media (max-width: 480px) {
        .cart-item {
            padding: var(--spacing-3) 0;
            border-bottom: 2px solid var(--gray-100);
        }

        .item-name {
            font-size: var(--font-size-base);
            font-weight: 700;
        }

        .item-price {
            font-size: var(--font-size-sm);
            color: var(--gray-600);
        }

        .item-controls {
            margin-top: var(--spacing-2);
            background: var(--gray-50);
            padding: var(--spacing-3);
            border-radius: 12px;
            gap: var(--spacing-4);
        }

        .quantity-controls {
            background: var(--white);
            border: 2px solid var(--gray-200);
            border-radius: 12px;
            overflow: hidden;
        }

        .quantity-btn {
            width: 44px;
            height: 44px;
            font-size: var(--font-size-xl);
            background: var(--secondary-color);
        }

        .quantity-btn:first-child {
            border-radius: 10px 0 0 10px;
        }

        .quantity-btn:last-child {
            border-radius: 0 10px 10px 0;
        }

        .quantity {
            min-width: 60px;
            height: 44px;
            font-size: var(--font-size-xl);
            font-weight: 700;
            background: var(--white);
            border: none;
        }

        .item-total {
            font-size: var(--font-size-xl);
            font-weight: 800;
            text-align: center;
        }

        .remove-btn {
            width: 44px;
            height: 44px;
            font-size: var(--font-size-lg);
            border-radius: 12px;
            background: var(--danger-color);
        }

        .remove-btn:hover {
            background: #dc2626;
        }
    }
</style>
