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

    <!-- accessibility-fix: issue-20, issue-3 - Quantity buttons and remove button accessible names -->
    <div class="item-controls">
        <div class="quantity-controls" role="group" aria-label={`Quantidade de ${item.name}`}>
            <button 
                class="quantity-btn" 
                on:click={() => updateQuantity(item.quantity - 1)}
                aria-label={`Diminuir quantidade de ${item.name}`}
                disabled={item.quantity <= 1}
            >
                <span aria-hidden="true">-</span>
            </button>
            <span class="quantity" aria-live="polite" aria-atomic="true">
                <span class="sr-only">Quantidade:</span>
                {item.quantity}
            </span>
            <button 
                class="quantity-btn" 
                on:click={() => updateQuantity(item.quantity + 1)}
                aria-label={`Aumentar quantidade de ${item.name}`}
            >
                <span aria-hidden="true">+</span>
            </button>
        </div>

        <div class="item-total">
            {formatPrice(itemTotal)}
        </div>

        <button class="remove-btn" on:click={removeItem} aria-label={`Remover ${item.name} do carrinho`}>
            <i class="fas fa-trash" aria-hidden="true"></i>
        </button>
    </div>
    <!-- /accessibility-fix -->
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

    /* Screen reader only utility */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    .quantity-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .cart-item {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-3);
            padding: var(--spacing-4);
        }

        .item-controls {
            justify-content: space-between;
            align-items: center;
            gap: var(--spacing-3);
        }

        .quantity-btn {
            width: 44px;
            height: 44px;
            font-size: var(--font-size-lg);
        }

        .quantity {
            min-width: 50px;
            height: 44px;
            font-size: var(--font-size-lg);
        }

        .remove-btn {
            width: 44px;
            height: 44px;
        }
    }
</style>
