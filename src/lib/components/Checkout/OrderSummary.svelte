<script>
    export let cartItems = [];
    export let subtotal = 0;

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }
</script>

<div class="order-summary">
    <h3>Resumo do Pedido</h3>
    <div class="summary-items">
        {#each cartItems as item}
            <div class="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
        {/each}
    </div>
    <div class="summary-total">
        <strong>Total:</strong>
        <strong>{formatPrice(subtotal)}</strong>
    </div>
</div>

<style>
    .order-summary {
        background: var(--gray-50);
        border-radius: 12px;
        padding: var(--spacing-4);
        margin-bottom: var(--spacing-6);
    }

    .order-summary h3 {
        margin: 0 0 var(--spacing-3) 0;
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--gray-900);
    }

    .summary-items {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-3);
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--font-size-sm);
        color: var(--gray-700);
    }

    .summary-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--spacing-3);
        border-top: 2px solid var(--gray-200);
        font-size: var(--font-size-lg);
        color: var(--gray-900);
    }
</style>
