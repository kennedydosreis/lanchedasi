<script>
    import { cart } from '$lib/stores/cart.js';
    import { orderInfo } from '$lib/stores/orderInfo.js';
    import CartItem from './CartItem.svelte';
    import CheckoutModal from '../Checkout/CheckoutModal.svelte';
    import { onMount, tick } from 'svelte';

    let isOpen = false;
    let showCheckoutModal = false;
    /** @type {HTMLButtonElement} */
    let cartToggleButton;
    /** @type {HTMLDivElement} */
    let cartPanel;
    let observations = '';
    let showLocationError = false;
    let locationErrorMessage = '';
    let showManualAddress = false;
    let manualAddress = '';
    let recalculateDistance = false;

    async function openCart() {
        isOpen = true;
        await tick();
        // Move focus to close button (first focusable element in dialog)
        const closeBtn = cartPanel?.querySelector('.close-btn');
        closeBtn?.focus();
    }

    function closeCart() {
        isOpen = false;
        // Return focus to trigger button
        cartToggleButton?.focus();
    }

    function toggleCart() {
        if (isOpen) {
            closeCart();
        } else {
            openCart();
        }
    }

    /**
     * Handle keyboard events for focus trap and escape
     * @param {KeyboardEvent} e
     */
    function handleDialogKeydown(e) {
        if (e.key === 'Escape') {
            closeCart();
            return;
        }

        // Focus trap logic
        if (e.key === 'Tab' && cartPanel) {
            const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
            const focusableElements = cartPanel.querySelectorAll(focusableSelector);
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement?.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement?.focus();
                e.preventDefault();
            }
        }
    }

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    async function getLocation() {
        try {
            showLocationError = false;
            showManualAddress = false;
            const result = await orderInfo.getLocationAsync();
            import.meta.env.DEV && console.log('Localização obtida:', result);

            // Mostra informação sobre a precisão se disponível
            if (result.location && result.location.accuracy) {
                const accuracy = Math.round(result.location.accuracy);
                import.meta.env.DEV && console.log(`Precisão da localização: ${accuracy} metros`);

                if (accuracy > 200) {
                    showLocationError = true;
                    locationErrorMessage = `⚠️ Localização muito imprecisa (±${accuracy}m). O endereço pode estar incorreto. Recomendamos usar "Digitar endereço" para garantir a entrega correta.`;
                    setTimeout(() => {
                        showLocationError = false;
                    }, 10000);
                } else if (accuracy > 100) {
                    showLocationError = true;
                    locationErrorMessage = `⚠️ Localização pouco precisa (±${accuracy}m). Verifique se o endereço está correto ou use "Digitar endereço".`;
                    setTimeout(() => {
                        showLocationError = false;
                    }, 8000);
                }
            }
        } catch (error) {
            showLocationError = true;
            locationErrorMessage = error.message;
            setTimeout(() => {
                showLocationError = false;
            }, 5000);
        }
    }

    function toggleManualAddress() {
        import.meta.env.DEV && console.log('toggleManualAddress chamado', { showManualAddress, currentAddress: $orderInfo.address });
        showManualAddress = !showManualAddress;
        showLocationError = false;
        if (!showManualAddress) {
            manualAddress = '';
            recalculateDistance = false;
        } else {
            // Se há um endereço atual, usa como base para edição
            manualAddress = $orderInfo.address || '';
            recalculateDistance = false;
            import.meta.env.DEV && console.log('Endereço carregado para edição:', manualAddress);
        }
    }

    async function saveManualAddress() {
        import.meta.env.DEV && console.log('saveManualAddress chamado', {
            manualAddress: manualAddress.trim(),
            hasLocation: !!$orderInfo.location,
            recalculateDistance
        });

        if (manualAddress.trim()) {
            try {
                orderInfo.setLoadingLocation(true);

                // Se temos coordenadas GPS mas usuário quer recalcular OU se não temos coordenadas
                if (!$orderInfo.location || recalculateDistance) {
                    import.meta.env.DEV && console.log('Fazendo geocoding para recalcular distância');
                    const result = await orderInfo.setAddressWithGeocode(manualAddress.trim());

                    if (result.distance !== null) {
                        import.meta.env.DEV && console.log('Geocoding bem-sucedido, nova distância:', result.distance, 'km');
                        import.meta.env.DEV && console.log('Nova taxa de entrega:', result.deliveryFee);
                    } else {
                        import.meta.env.DEV && console.log('Geocoding falhou, endereço salvo sem cálculo de distância');
                    }
                } else {
                    // Apenas atualiza o texto do endereço, mantendo coordenadas originais
                    import.meta.env.DEV && console.log('Atualizando apenas o texto do endereço, mantendo coordenadas GPS');
                    orderInfo.setAddress(manualAddress.trim());
                }

                showManualAddress = false;
                manualAddress = '';
                recalculateDistance = false;
                import.meta.env.DEV && console.log('Endereço salvo com sucesso');

            } catch (error) {
                import.meta.env.DEV && console.error('Erro ao salvar endereço:', error);
                showLocationError = true;
                locationErrorMessage = 'Erro ao processar endereço. Tente novamente.';
                setTimeout(() => {
                    showLocationError = false;
                }, 5000);
            }
        }
    }

    function generateWhatsAppMessage(cartItems, total, orderData) {
        let message = "🍔 *Pedido - Lanche da Si*\n\n";

        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            message += `• ${item.quantity}x ${item.name}\n`;
            message += `  ${formatPrice(itemTotal)}\n\n`;
        });

        message += `💰 *Subtotal: ${formatPrice(total)}*\n`;

        if (orderData.location && orderData.distance !== null) {
            message += `🚚 *Entrega (${orderData.distance}km): ${formatPrice(orderData.deliveryFee)}*\n`;
            message += `💰 *Total: ${formatPrice(total + orderData.deliveryFee)}*\n\n`;
        } else {
            message += `💰 *Total: ${formatPrice(total)}*\n\n`;
        }

        if (orderData.observations.trim()) {
            message += `📝 *Observações:*\n${orderData.observations}\n\n`;
        }

        if (orderData.address) {
            message += `📍 *Endereço de entrega:*\n${orderData.address}\n`;
            if (orderData.distance !== null) {
                message += `📏 *Distância: ${orderData.distance}km*\n`;
                if (orderData.deliveryFee === 0) {
                    message += `🎉 *Entrega grátis!*\n`;
                }
            } else {
                message += `ℹ️ *Taxa de entrega será calculada pelo estabelecimento*\n`;
            }
            message += "\n";
        } else {
            message += "📍 *Endereço de entrega:*\n";
            message += "(Por favor, informe seu endereço completo)\n\n";
        }

        message += "Obrigado pela preferência! 😊";

        return encodeURIComponent(message);
    }

    function openCheckoutModal() {
        if ($cart.length === 0) return;
        showCheckoutModal = true;
    }

    function closeCheckoutModal() {
        showCheckoutModal = false;
    }

    function handleCheckoutConfirm() {
        // Clear cart after successful checkout
        cart.clear();
        showCheckoutModal = false;
        closeCart();
    }

    function sendOrder() {
        if ($cart.length === 0) return;

        orderInfo.setObservations(observations);

        const total = cart.getTotal($cart);
        const message = generateWhatsAppMessage($cart, total, $orderInfo);
        const whatsappUrl = `https://wa.me/5592993525884?text=${message}`;

        window.open(whatsappUrl, '_blank');
    }

    $: itemCount = cart.getItemCount($cart);
    $: total = cart.getTotal($cart);
    $: finalTotal = total + ($orderInfo.deliveryFee || 0);
</script>

<!-- accessibility-fix: issue-3, issue-5, issue-18 - Cart toggle, dialog and overlay accessibility -->
<div class="cart-container">
    <button 
        bind:this={cartToggleButton}
        class="cart-toggle" 
        on:click={toggleCart} 
        class:has-items={itemCount > 0}
        aria-label={`Abrir carrinho. ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
        aria-expanded={isOpen}
    >
        <i class="fas fa-shopping-cart" aria-hidden="true"></i>
        {#if itemCount > 0}
            <span class="cart-badge" aria-hidden="true">{itemCount}</span>
        {/if}
    </button>

    {#if isOpen}
        <div
            class="cart-overlay"
            on:click={closeCart}
            aria-hidden="true"
        ></div>
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
                <button class="close-btn" on:click={closeCart} aria-label="Fechar carrinho">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>

            <div class="cart-content">
                {#if $cart.length === 0}
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                        <p>Seu carrinho está vazio</p>
                    </div>
                {:else}
                    <!-- accessibility-fix: issue-8 - Live region for cart updates -->
                    <div class="cart-items" aria-live="polite" aria-atomic="false">
                        {#each $cart as item}
                            <CartItem {item} />
                        {/each}
                    </div>
                    <!-- /accessibility-fix -->

                    <div class="order-details">
                        <div class="form-group">
                            <label for="observations">Observações (opcional):</label>
                            <textarea
                                id="observations"
                                bind:value={observations}
                                placeholder="Ex: Sem cebola, bem passado, etc..."
                                rows="3"
                            ></textarea>
                        </div>

                        <div class="form-group">
                            <label for="delivery-address">Endereço para entrega:</label>
                            <div class="location-section" id="delivery-address">
                                {#if showManualAddress}
                                    <div class="manual-address-form">
                                        <label for="manual-address">
                                            {#if $orderInfo.address}
                                                Corrigir endereço:
                                            {:else}
                                                Digite seu endereço completo:
                                            {/if}
                                        </label>
                                        <textarea
                                            id="manual-address"
                                            bind:value={manualAddress}
                                            placeholder="Ex: Rua Itororo, 22, Alvorada, Manaus - AM"
                                            rows="3"
                                        ></textarea>

                                        {#if $orderInfo.location}
                                            <label class="checkbox-label">
                                                <input
                                                    type="checkbox"
                                                    bind:checked={recalculateDistance}
                                                />
                                                <span>Recalcular distância e frete para este endereço</span>
                                            </label>
                                        {/if}
                                        <div class="manual-address-buttons">
                                            <button
                                                class="save-address-btn"
                                                on:click={saveManualAddress}
                                                disabled={!manualAddress.trim()}
                                            >
                                                <i class="fas fa-check" aria-hidden="true"></i>
                                                {#if $orderInfo.address}
                                                    Atualizar Endereço
                                                {:else}
                                                    Salvar Endereço
                                                {/if}
                                            </button>
                                            <button class="cancel-address-btn" on:click={toggleManualAddress}>
                                                <i class="fas fa-times" aria-hidden="true"></i>
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                {:else if $orderInfo.address}
                                    <div class="location-display">
                                        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                        <div class="location-info">
                                            <span class="address">{$orderInfo.address}</span>
                                            {#if $orderInfo.distance !== null}
                                                <div class="delivery-info">
                                                    <span class="distance">📏 {$orderInfo.distance}km do restaurante</span>
                                                    {#if $orderInfo.location && $orderInfo.location.accuracy}
                                                        {@const accuracy = Math.round($orderInfo.location.accuracy)}
                                                        <span class="accuracy" class:low-accuracy={accuracy > 200} class:medium-accuracy={accuracy > 100 && accuracy <= 200}>
                                                            🎯 Precisão: ±{accuracy}m
                                                            {#if accuracy > 200}
                                                                ⚠️ Muito imprecisa
                                                            {:else if accuracy > 100}
                                                                ⚠️ Pouco precisa
                                                            {:else}
                                                                ✅ Boa precisão
                                                            {/if}
                                                        </span>
                                                    {/if}
                                                    {#if !$orderInfo.canDeliver}
                                                        <span class="error">❌ Fora da área de entrega (máx. 15km)</span>
                                                    {:else if $orderInfo.deliveryFee === 0}
                                                        <span class="free">🎉 Entrega grátis!</span>
                                                    {:else}
                                                        <span class="fee">🚚 Taxa de entrega: {formatPrice($orderInfo.deliveryFee)}</span>
                                                    {/if}
                                                </div>
                                            {/if}
                                        </div>
                                        <div class="location-actions">
                                            <button class="location-clear" on:click={() => orderInfo.clear()} aria-label="Limpar localização">
                                                <i class="fas fa-times" aria-hidden="true"></i>
                                            </button>
                                            {#if $orderInfo.location && $orderInfo.location.accuracy && $orderInfo.location.accuracy > 100}
                                                <button class="fix-address-btn" on:click={toggleManualAddress} aria-label="Corrigir endereço">
                                                    <i class="fas fa-edit" aria-hidden="true"></i>
                                                    <span>Corrigir</span>
                                                </button>
                                            {/if}
                                        </div>
                                    </div>
                                {:else}
                                    <div class="location-buttons">
                                        <button
                                            class="location-btn"
                                            on:click={getLocation}
                                            disabled={$orderInfo.isLoadingLocation}
                                        >
                                            {#if $orderInfo.isLoadingLocation}
                                                <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                                                Calculando entrega...
                                            {:else}
                                                <i class="fas fa-location-arrow" aria-hidden="true"></i>
                                                Usar minha localização
                                            {/if}
                                        </button>

                                        <button class="manual-btn" on:click={toggleManualAddress}>
                                            <i class="fas fa-edit" aria-hidden="true"></i>
                                            Digitar endereço
                                        </button>
                                    </div>
                                    <p class="delivery-note">
                                        📍 Entrega grátis até 3km<br>
                                        🚚 R$ 2,50 por km adicional<br>
                                        📏 Máximo 15km de distância
                                    </p>
                                {/if}

                                {#if showLocationError}
                                    <div class="error-message" role="alert">
                                        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                                        {locationErrorMessage}
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>

                    <div class="cart-footer">
                        <div class="order-summary">
                            <div class="summary-line">
                                <span>Subtotal:</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                            {#if $orderInfo.deliveryFee > 0}
                                <div class="summary-line">
                                    <span>Entrega ({$orderInfo.distance}km):</span>
                                    <span>{formatPrice($orderInfo.deliveryFee)}</span>
                                </div>
                            {:else if $orderInfo.deliveryFee === 0 && $orderInfo.distance !== null}
                                <div class="summary-line free-delivery">
                                    <span>Entrega ({$orderInfo.distance}km):</span>
                                    <span>Grátis! 🎉</span>
                                </div>
                            {/if}
                            <div class="summary-line total">
                                <strong>Total: {formatPrice(finalTotal)}</strong>
                            </div>
                        </div>
                        <div class="footer-buttons">
                            <button
                                class="order-btn checkout-btn"
                                on:click={openCheckoutModal}
                            >
                                <i class="fas fa-check-circle" aria-hidden="true"></i>
                                Finalizar Pedido
                            </button>
                            <button
                                class="order-btn legacy-btn"
                                on:click={sendOrder}
                                disabled={!$orderInfo.canDeliver && $orderInfo.location}
                            >
                                <i class="fab fa-whatsapp" aria-hidden="true"></i>
                                {#if !$orderInfo.canDeliver && $orderInfo.location}
                                    Fora da área de entrega
                                {:else}
                                    Pedido Rápido (com localização)
                                {/if}
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    {#if showCheckoutModal}
        <CheckoutModal
            cartItems={$cart}
            onClose={closeCheckoutModal}
            onConfirm={handleCheckoutConfirm}
        />
    {/if}
</div>

<style>
    .cart-container {
        position: fixed;
        bottom: var(--spacing-6);
        right: var(--spacing-6);
        z-index: 1000;
    }

    .cart-toggle {
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        position: relative;
    }

    .cart-toggle:hover {
        transform: scale(1.1);
        background: #d97706;
    }

    .cart-toggle.has-items {
        animation: pulse 2s infinite;
    }

    .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--danger-color);
        color: var(--white);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xs);
        font-weight: bold;
    }

    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }

    .cart-panel {
        position: fixed;
        top: 0;
        right: 0;
        width: 400px;
        height: 100vh;
        max-height: 100vh;
        background: var(--white);
        z-index: 999;
        display: flex;
        flex-direction: column;
        box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-6);
        border-bottom: 1px solid var(--gray-200);
    }

    .cart-header h3 {
        margin: 0;
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--gray-900);
    }

    .close-btn {
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        color: var(--gray-500);
        cursor: pointer;
        padding: var(--spacing-2);
    }

    .close-btn:hover {
        color: var(--gray-700);
    }

    .cart-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: calc(100vh - 200px);
    }

    .empty-cart {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-4);
        color: var(--gray-500);
    }

    .empty-cart i {
        font-size: 4rem;
    }

    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: var(--spacing-4);
        -webkit-overflow-scrolling: touch;
    }

    .order-details {
        padding: var(--spacing-6);
        border-top: 1px solid var(--gray-200);
        background: var(--gray-50);
        flex-shrink: 0;
        max-height: 300px;
        overflow-y: auto;
    }

    .form-group {
        margin-bottom: var(--spacing-6);
    }

    .form-group label {
        display: block;
        font-weight: 600;
        color: var(--gray-700);
        margin-bottom: var(--spacing-2);
        font-size: var(--font-size-sm);
    }

    textarea {
        width: 100%;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-family: inherit;
        font-size: var(--font-size-sm);
        resize: vertical;
        min-height: 80px;
    }

    textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }

    .location-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .location-display {
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-3);
        padding: var(--spacing-4);
        background: var(--white);
        border: 2px solid var(--accent-color);
        border-radius: 8px;
        font-size: var(--font-size-sm);
    }

    .location-display i {
        color: var(--accent-color);
        flex-shrink: 0;
        margin-top: 2px;
    }

    .location-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
    }

    .location-actions {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-1);
        align-items: flex-end;
    }

    .address {
        color: var(--gray-700);
        font-weight: 500;
    }

    .delivery-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-1);
        font-size: var(--font-size-xs);
    }

    .distance {
        color: var(--gray-600);
    }

    .accuracy {
        color: var(--gray-500);
        font-size: 0.9em;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .accuracy.medium-accuracy {
        color: #f59e0b;
    }

    .accuracy.low-accuracy {
        color: #dc2626;
        font-weight: 600;
    }

    .free {
        color: #059669;
        font-weight: 600;
    }

    .fee {
        color: var(--accent-color);
        font-weight: 600;
    }

    .error {
        color: var(--danger-color);
        font-weight: 600;
    }

    .delivery-note {
        font-size: var(--font-size-xs);
        color: var(--gray-600);
        line-height: 1.4;
        margin-top: var(--spacing-2);
        padding: var(--spacing-3);
        background: var(--gray-50);
        border-radius: 6px;
        border-left: 3px solid var(--accent-color);
    }

    .order-summary {
        background: var(--gray-50);
        border-radius: 12px;
        padding: var(--spacing-4);
        margin-bottom: var(--spacing-4);
    }

    .summary-line {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-2) 0;
        color: var(--gray-700);
        font-size: var(--font-size-sm);
    }

    .summary-line.free-delivery {
        color: #059669;
    }

    .summary-line.total {
        border-top: 2px solid var(--gray-200);
        margin-top: var(--spacing-2);
        padding-top: var(--spacing-3);
        color: var(--gray-900);
        font-size: var(--font-size-base);
    }

    .order-btn:disabled {
        background: var(--gray-400);
        cursor: not-allowed;
        opacity: 0.7;
    }

    .order-btn:disabled:hover {
        background: var(--gray-400);
        transform: none;
    }

    .location-display {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        padding: var(--spacing-3);
        background: var(--white);
        border: 2px solid var(--accent-color);
        border-radius: 8px;
        font-size: var(--font-size-sm);
    }

    .location-display i {
        color: var(--accent-color);
        flex-shrink: 0;
    }

    .location-display span {
        flex: 1;
        color: var(--gray-700);
    }

    .location-clear {
        background: none;
        border: none;
        color: var(--gray-400);
        cursor: pointer;
        padding: var(--spacing-1);
        border-radius: 4px;
        flex-shrink: 0;
    }

    .location-clear:hover {
        color: var(--danger-color);
        background: var(--gray-100);
    }

    .fix-address-btn {
        background: var(--accent-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-1) var(--spacing-2);
        border-radius: 4px;
        cursor: pointer;
        font-size: var(--font-size-xs);
        display: flex;
        align-items: center;
        gap: var(--spacing-1);
        transition: background-color 0.3s ease;
        flex-shrink: 0;
    }

    .fix-address-btn:hover {
        background: #e68900;
    }

    .fix-address-btn span {
        font-size: 0.8em;
    }

    .location-btn {
        background: var(--accent-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3);
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        justify-content: center;
        transition: background-color 0.3s ease;
        font-size: var(--font-size-sm);
    }

    .location-btn:hover:not(:disabled) {
        background: #e68900;
    }

    .location-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .error-message {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        padding: var(--spacing-3);
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        color: #dc2626;
        font-size: var(--font-size-sm);
    }

    /* Novos estilos para endereço manual */
    .location-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .manual-btn {
        background: var(--gray-600);
        color: var(--white);
        border: none;
        padding: var(--spacing-3);
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        justify-content: center;
        transition: background-color 0.3s ease;
        font-size: var(--font-size-sm);
    }

    .manual-btn:hover {
        background: var(--gray-700);
    }

    .manual-address-form {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .manual-address-form label {
        font-weight: 600;
        color: var(--gray-700);
        font-size: var(--font-size-sm);
    }

    .manual-address-form textarea {
        width: 100%;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-family: inherit;
        font-size: var(--font-size-sm);
        resize: vertical;
        min-height: 80px;
    }

    .manual-address-form textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        font-size: var(--font-size-sm);
        color: var(--gray-600);
        cursor: pointer;
        margin-top: var(--spacing-2);
    }

    .checkbox-label input[type="checkbox"] {
        width: auto;
        margin: 0;
    }

    .checkbox-label span {
        font-weight: normal;
    }

    .manual-address-buttons {
        display: flex;
        gap: var(--spacing-2);
    }

    .save-address-btn {
        flex: 1;
        background: var(--accent-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3);
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        justify-content: center;
        transition: background-color 0.3s ease;
        font-size: var(--font-size-sm);
    }

    .save-address-btn:hover:not(:disabled) {
        background: #e68900;
    }

    .save-address-btn:disabled {
        background: var(--gray-400);
        cursor: not-allowed;
        opacity: 0.7;
    }

    .cancel-address-btn {
        background: var(--gray-500);
        color: var(--white);
        border: none;
        padding: var(--spacing-3);
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        justify-content: center;
        transition: background-color 0.3s ease;
        font-size: var(--font-size-sm);
    }

    .cancel-address-btn:hover {
        background: var(--gray-600);
    }

    .cart-items {
        flex: 1;
        overflow-y: auto;
    }

    .cart-footer {
        padding: var(--spacing-6);
        border-top: 1px solid var(--gray-200);
        background: var(--gray-50);
        flex-shrink: 0;
        min-height: 120px;
    }

    .order-btn {
        width: 100%;
        background: var(--whatsapp-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-4);
        border-radius: 12px;
        font-size: var(--font-size-lg);
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2);
        transition: background-color 0.3s ease;
    }

    .order-btn:hover {
        background: #22c55e;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .footer-buttons {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .checkout-btn {
        background: var(--secondary-color);
    }

    .checkout-btn:hover {
        background: #d97706;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .legacy-btn {
        font-size: var(--font-size-sm);
        padding: var(--spacing-3);
    }

    @media (max-width: 768px) {
        .cart-panel {
            width: 100%;
            height: 100vh;
        }

        .cart-container {
            bottom: var(--spacing-4);
            right: var(--spacing-4);
        }

        .cart-content {
            height: calc(100vh - 160px);
        }

        .cart-items {
            padding: var(--spacing-3);
        }

        .order-details {
            padding: var(--spacing-4);
            border-top: 1px solid var(--gray-200);
            background: var(--gray-50);
        }

        .cart-footer {
            padding: var(--spacing-4);
            border-top: 2px solid var(--gray-200);
            background: var(--white);
        }

        .order-btn {
            font-size: var(--font-size-lg);
            padding: var(--spacing-4);
            min-height: 56px;
        }

        .footer-buttons {
            gap: var(--spacing-2);
        }

        .legacy-btn {
            font-size: var(--font-size-xs);
            padding: var(--spacing-2);
        }
    }
</style>
