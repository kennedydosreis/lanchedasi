<script>
    import { cart } from '$lib/stores/cart.js';
    import { orderInfo } from '$lib/stores/orderInfo.js';
    import { PriceService } from '$lib/services/PriceService';
    import CartItem from './CartItem.svelte';
    import CheckoutModal from '../Checkout/CheckoutModal.svelte';
    import CheckoutForm from '../molecules/CheckoutForm.svelte';
    import DeliverySelector from '../molecules/DeliverySelector.svelte';
    import { tick } from 'svelte';
    import { browser } from '$app/environment';

    let isOpen = false;
    let showCheckoutModal = false;
    let cartToggleButton;
    let cartPanel;
    let observations = '';

    async function openCart() {
        isOpen = true;
        await tick();
        cartPanel?.querySelector('.close-btn')?.focus();
    }

    function closeCart() {
        isOpen = false;
        cartToggleButton?.focus();
    }

    function toggleCart() {
        isOpen ? closeCart() : openCart();
    }

    function handleDialogKeydown(e) {
        if (e.key === 'Escape') {
            closeCart();
            return;
        }
        if (e.key === 'Tab' && cartPanel) {
            const focusable = cartPanel.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                last?.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first?.focus();
                e.preventDefault();
            }
        }
    }

    function generateWhatsAppMessage(cartItems, total, orderData) {
        let message = "🍔 *Pedido - Lanche da Si*\n\n";
        cartItems.forEach(item => {
            message += `• ${item.quantity}x ${item.name}\n  ${PriceService.formatCurrency(item.price * item.quantity)}\n\n`;
        });
        message += `💰 *Subtotal: ${PriceService.formatCurrency(total)}*\n`;
        if (orderData.location && orderData.distance !== null) {
            message += `🚚 *Entrega (${orderData.distance}km): ${PriceService.formatCurrency(orderData.deliveryFee)}*\n`;
            message += `💰 *Total: ${PriceService.formatCurrency(total + orderData.deliveryFee)}*\n\n`;
        } else {
            message += `💰 *Total: ${PriceService.formatCurrency(total)}*\n\n`;
        }
        if (orderData.observations.trim()) message += `📝 *Observações:*\n${orderData.observations}\n\n`;
        if (orderData.address) {
            message += `📍 *Endereço:*\n${orderData.address}\n`;
        } else {
            message += "📍 *Endereço:*\n(Favor informar endereço completo)\n\n";
        }
        message += "Obrigado pela preferência! 😊";
        return encodeURIComponent(message);
    }

    function sendOrder() {
        if ($cart.length === 0) return;
        orderInfo.setObservations(observations);
        const total = cart.getTotal($cart);
        const message = generateWhatsAppMessage($cart, total, $orderInfo);
        window.open(`https://wa.me/5592993525884?text=${message}`, '_blank');
    }

    $: itemCount = cart.getItemCount($cart);
    $: total = cart.getTotal($cart);
    $: finalTotal = total + ($orderInfo.deliveryFee || 0);
</script>

<div class="cart-container">
    <button 
        bind:this={cartToggleButton}
        class="cart-toggle" 
        on:click={toggleCart} 
        class:has-items={itemCount > 0}
        aria-label="Abrir carrinho"
        aria-expanded={isOpen}
    >
        <i class="fas fa-shopping-cart" aria-hidden="true"></i>
        {#if itemCount > 0}
            <span class="cart-badge">{itemCount}</span>
        {/if}
    </button>

    {#if isOpen}
        <div class="cart-overlay" on:click={closeCart} aria-hidden="true"></div>
        <div 
            bind:this={cartPanel}
            class="cart-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            on:keydown={handleDialogKeydown}
        >
            <div class="cart-header">
                <h3 id="cart-title">Seu Pedido</h3>
                <button class="close-btn" on:click={closeCart} aria-label="Fechar">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>

            <div class="cart-content">
                {#if $cart.length === 0}
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Seu carrinho está vazio</p>
                    </div>
                {:else}
                    <div class="cart-items" aria-live="polite">
                        {#each $cart as item}
                            <CartItem {item} />
                        {/each}
                    </div>

                    {#if browser}
                        <div class="order-details">
                            <CheckoutForm bind:observations />
                            <DeliverySelector />
                        </div>

                        <div class="cart-footer">
                            <div class="order-summary">
                                <div class="summary-line"><span>Subtotal:</span><span>{PriceService.formatCurrency(total)}</span></div>
                                {#if $orderInfo.deliveryFee > 0}
                                    <div class="summary-line"><span>Entrega:</span><span>{PriceService.formatCurrency($orderInfo.deliveryFee)}</span></div>
                                {:else if $orderInfo.deliveryFee === 0 && $orderInfo.distance !== null}
                                    <div class="summary-line free-delivery"><span>Entrega:</span><span>Grátis! 🎉</span></div>
                                {/if}
                                <div class="summary-line total"><strong>Total: {PriceService.formatCurrency(finalTotal)}</strong></div>
                            </div>
                            <div class="footer-buttons">
                                <button class="order-btn checkout-btn" on:click={() => showCheckoutModal = true}>Finalizar Pedido</button>
                                <button class="order-btn legacy-btn" on:click={sendOrder} disabled={!$orderInfo.canDeliver && $orderInfo.location}>Pedido Rápido (WhatsApp)</button>
                            </div>
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    {/if}

    {#if showCheckoutModal}
        <CheckoutModal cartItems={$cart} onClose={() => showCheckoutModal = false} onConfirm={() => { cart.clear(); showCheckoutModal = false; closeCart(); }} />
    {/if}
</div>

<style>
    .cart-container { position: fixed; bottom: var(--spacing-6); right: var(--spacing-6); z-index: 1000; }
    .cart-toggle { background: var(--secondary-color); color: var(--white); border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xl); box-shadow: 0 4px 20px rgba(0,0,0,0.15); transition: all 0.3s ease; position: relative; }
    .cart-toggle.has-items { animation: pulse 2s infinite; }
    .cart-badge { position: absolute; top: -8px; right: -8px; background: var(--danger-color); color: var(--white); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: var(--font-size-xs); font-weight: bold; }
    .cart-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 998; }
    .cart-panel { position: fixed; top: 0; right: 0; width: 400px; height: 100vh; background: var(--white); z-index: 999; display: flex; flex-direction: column; box-shadow: -4px 0 20px rgba(0,0,0,0.1); overflow: hidden; }
    .cart-header { display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-6); border-bottom: 1px solid var(--gray-200); }
    .cart-header h3 { margin: 0; font-size: var(--font-size-2xl); font-weight: 700; }
    .close-btn { background: none; border: none; font-size: var(--font-size-xl); color: var(--gray-500); cursor: pointer; }
    .cart-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .empty-cart { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--gray-500); }
    .empty-cart i { font-size: 4rem; }
    .cart-items { flex: 1; overflow-y: auto; padding: var(--spacing-4); }
    .order-details { padding: var(--spacing-6); border-top: 1px solid var(--gray-200); background: var(--gray-50); flex-shrink: 0; max-height: 300px; overflow-y: auto; }
    .cart-footer { padding: var(--spacing-6); border-top: 1px solid var(--gray-200); background: var(--gray-50); flex-shrink: 0; }
    .order-summary { background: var(--gray-50); border-radius: 12px; padding: var(--spacing-4); margin-bottom: var(--spacing-4); }
    .summary-line { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: var(--font-size-sm); }
    .summary-line.total { border-top: 1px solid var(--gray-200); padding-top: 8px; font-size: var(--font-size-base); }
    .footer-buttons { display: flex; flex-direction: column; gap: 8px; }
    .order-btn { width: 100%; padding: 12px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; }
    .checkout-btn { background: var(--secondary-color); color: white; }
    .legacy-btn { background: var(--whatsapp-color); color: white; }
    @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @media (max-width: 768px) { .cart-panel { width: 100%; } }
</style>
