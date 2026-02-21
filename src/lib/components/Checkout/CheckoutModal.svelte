<script>
    import { onMount } from 'svelte';
    import { validateCartForCheckout, truncateWhatsAppMessage } from '$lib/utils/CartValidator.js';
    import { loadMenuData } from '$lib/utils/loadMenu.js';

    export let cartItems = [];
    export let onClose = () => {};
    export let onConfirm = () => {};

    const WHATSAPP_NUMBER = '5592993525884';

    let menuData = null;
    let formData = {
        name: '',
        street: '',
        number: '',
        neighborhood: '',
        reference: '',
        observations: '',
        paymentMethod: 'PIX'
    };

    let errors = {
        name: '',
        street: '',
        number: '',
        neighborhood: ''
    };

    let isSubmitting = false;
    let validationError = '';

    onMount(async () => {
        try {
            menuData = await loadMenuData();
        } catch (err) {
            console.error('Error loading menu for checkout:', err);
        }
    });

    function validateForm() {
        let isValid = true;
        errors = { name: '', street: '', number: '', neighborhood: '' };

        if (!formData.name.trim()) {
            errors.name = 'Nome é obrigatório';
            isValid = false;
        }

        if (!formData.street.trim()) {
            errors.street = 'Rua/Avenida é obrigatória';
            isValid = false;
        }

        if (!formData.number.trim()) {
            errors.number = 'Número é obrigatório';
            isValid = false;
        }

        if (!formData.neighborhood.trim()) {
            errors.neighborhood = 'Bairro é obrigatório';
            isValid = false;
        }

        return isValid;
    }

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    function buildWhatsAppMessage(validatedCart, total) {
        let message = "🍔 *PEDIDO - Lanche da Si*\n\n";
        
        message += `*Cliente:* ${formData.name}\n`;
        
        message += `*Endereço:* ${formData.street}, ${formData.number}, ${formData.neighborhood}`;
        if (formData.reference) {
            message += `\n*Referência:* ${formData.reference}`;
        }
        message += "\n";
        
        message += `*Pagamento:* ${formData.paymentMethod}\n\n`;
        
        message += "*Itens:*\n";
        validatedCart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            message += `• ${item.quantity}x ${item.name} - ${formatPrice(itemTotal)}\n`;
        });
        
        message += `\n*TOTAL: ${formatPrice(total)}*\n`;
        
        if (formData.observations.trim()) {
            message += `\n*Obs:* ${formData.observations}`;
        }

        return message;
    }

    async function handleSubmit() {
        if (!validateForm()) {
            return;
        }

        if (!menuData) {
            validationError = 'Erro ao carregar dados do cardápio. Tente novamente.';
            return;
        }

        isSubmitting = true;
        validationError = '';

        try {
            // Validate cart with menu data
            const validation = validateCartForCheckout(cartItems, menuData);

            if (!validation.valid) {
                validationError = validation.errors.join(', ');
                isSubmitting = false;
                return;
            }

            // Build WhatsApp message
            const message = buildWhatsAppMessage(validation.validatedCart, validation.total);
            
            // Truncate if needed
            const { message: finalMessage, truncated } = truncateWhatsAppMessage(message);

            if (truncated) {
                console.warn('Message was truncated to fit WhatsApp limits');
            }

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
            window.open(whatsappUrl, '_blank');

            // Close modal and notify parent
            onConfirm();
            onClose();

        } catch (error) {
            console.error('Error during checkout:', error);
            validationError = 'Erro ao processar pedido. Tente novamente.';
        } finally {
            isSubmitting = false;
        }
    }

    function handleKeydown(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    $: subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
</script>

<div class="modal-overlay" on:click={onClose} on:keydown={handleKeydown} role="presentation">
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <div class="modal-content" on:click|stopPropagation on:keydown role="dialog" aria-labelledby="checkout-title" aria-modal="true">
        <div class="modal-header">
            <h2 id="checkout-title">Finalizar Pedido</h2>
            <button class="close-btn" on:click={onClose} aria-label="Fechar">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        </div>

        <div class="modal-body">
            <!-- Order Summary -->
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

            <!-- Checkout Form -->
            <form on:submit|preventDefault={handleSubmit}>
                <div class="form-section">
                    <h3>Dados do Cliente</h3>
                    
                    <div class="form-group" class:has-error={errors.name}>
                        <label for="name">
                            Nome Completo <span class="required">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            bind:value={formData.name}
                            placeholder="Seu nome completo"
                            required
                        />
                        {#if errors.name}
                            <span class="error-message">{errors.name}</span>
                        {/if}
                    </div>
                </div>

                <div class="form-section">
                    <h3>Endereço de Entrega</h3>
                    
                    <div class="form-row">
                        <div class="form-group flex-2" class:has-error={errors.street}>
                            <label for="street">
                                Rua/Avenida <span class="required">*</span>
                            </label>
                            <input
                                id="street"
                                type="text"
                                bind:value={formData.street}
                                placeholder="Nome da rua"
                                required
                            />
                            {#if errors.street}
                                <span class="error-message">{errors.street}</span>
                            {/if}
                        </div>

                        <div class="form-group flex-1" class:has-error={errors.number}>
                            <label for="number">
                                Número <span class="required">*</span>
                            </label>
                            <input
                                id="number"
                                type="text"
                                bind:value={formData.number}
                                placeholder="Nº"
                                required
                            />
                            {#if errors.number}
                                <span class="error-message">{errors.number}</span>
                            {/if}
                        </div>
                    </div>

                    <div class="form-group" class:has-error={errors.neighborhood}>
                        <label for="neighborhood">
                            Bairro <span class="required">*</span>
                        </label>
                        <input
                            id="neighborhood"
                            type="text"
                            bind:value={formData.neighborhood}
                            placeholder="Nome do bairro"
                            required
                        />
                        {#if errors.neighborhood}
                            <span class="error-message">{errors.neighborhood}</span>
                        {/if}
                    </div>

                    <div class="form-group">
                        <label for="reference">
                            Ponto de Referência <span class="optional">(opcional)</span>
                        </label>
                        <input
                            id="reference"
                            type="text"
                            bind:value={formData.reference}
                            placeholder="Ex: Próximo ao posto de gasolina"
                        />
                    </div>
                </div>

                <div class="form-section">
                    <h3>Forma de Pagamento</h3>
                    
                    <div class="payment-options">
                        <label class="radio-label">
                            <input
                                type="radio"
                                name="payment"
                                value="Dinheiro"
                                bind:group={formData.paymentMethod}
                            />
                            <span class="radio-custom"></span>
                            <span class="radio-text">
                                <i class="fas fa-money-bill-wave" aria-hidden="true"></i>
                                Dinheiro
                            </span>
                        </label>

                        <label class="radio-label">
                            <input
                                type="radio"
                                name="payment"
                                value="PIX"
                                bind:group={formData.paymentMethod}
                            />
                            <span class="radio-custom"></span>
                            <span class="radio-text">
                                <i class="fas fa-qrcode" aria-hidden="true"></i>
                                PIX
                            </span>
                        </label>

                        <label class="radio-label">
                            <input
                                type="radio"
                                name="payment"
                                value="Cartão"
                                bind:group={formData.paymentMethod}
                            />
                            <span class="radio-custom"></span>
                            <span class="radio-text">
                                <i class="fas fa-credit-card" aria-hidden="true"></i>
                                Cartão
                            </span>
                        </label>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Observações <span class="optional">(opcional)</span></h3>
                    
                    <div class="form-group">
                        <textarea
                            id="observations"
                            bind:value={formData.observations}
                            placeholder="Ex: Sem cebola, bem passado, etc..."
                            rows="3"
                        ></textarea>
                    </div>
                </div>

                {#if validationError}
                    <div class="validation-error" role="alert">
                        <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                        {validationError}
                    </div>
                {/if}

                <div class="form-actions">
                    <button type="button" class="btn-cancel" on:click={onClose}>
                        Cancelar
                    </button>
                    <button type="submit" class="btn-submit" disabled={isSubmitting}>
                        {#if isSubmitting}
                            <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                            Processando...
                        {:else}
                            <i class="fab fa-whatsapp" aria-hidden="true"></i>
                            Finalizar no WhatsApp
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: var(--spacing-4);
        overflow-y: auto;
    }

    .modal-content {
        background: var(--white);
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--spacing-6);
        border-bottom: 2px solid var(--gray-200);
    }

    .modal-header h2 {
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
        border-radius: 4px;
        transition: all 0.2s;
    }

    .close-btn:hover {
        color: var(--gray-700);
        background: var(--gray-100);
    }

    .modal-body {
        padding: var(--spacing-6);
        overflow-y: auto;
    }

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

    .form-section {
        margin-bottom: var(--spacing-6);
    }

    .form-section h3 {
        margin: 0 0 var(--spacing-4) 0;
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--gray-900);
    }

    .form-group {
        margin-bottom: var(--spacing-4);
    }

    .form-row {
        display: flex;
        gap: var(--spacing-3);
    }

    .form-row .flex-1 {
        flex: 1;
    }

    .form-row .flex-2 {
        flex: 2;
    }

    label {
        display: block;
        font-weight: 600;
        color: var(--gray-700);
        margin-bottom: var(--spacing-2);
        font-size: var(--font-size-sm);
    }

    .required {
        color: var(--danger-color);
    }

    .optional {
        color: var(--gray-500);
        font-weight: 400;
        font-size: var(--font-size-xs);
    }

    input[type="text"],
    textarea {
        width: 100%;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-family: inherit;
        font-size: var(--font-size-sm);
        transition: border-color 0.2s;
    }

    input[type="text"]:focus,
    textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }

    .has-error input[type="text"] {
        border-color: var(--danger-color);
    }

    .error-message {
        display: block;
        margin-top: var(--spacing-1);
        color: var(--danger-color);
        font-size: var(--font-size-xs);
        font-weight: 500;
    }

    textarea {
        resize: vertical;
        min-height: 80px;
    }

    .payment-options {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .radio-label {
        display: flex;
        align-items: center;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
    }

    .radio-label:hover {
        border-color: var(--secondary-color);
        background: var(--gray-50);
    }

    .radio-label input[type="radio"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .radio-custom {
        width: 20px;
        height: 20px;
        border: 2px solid var(--gray-400);
        border-radius: 50%;
        margin-right: var(--spacing-3);
        position: relative;
        flex-shrink: 0;
        transition: all 0.2s;
    }

    .radio-label input[type="radio"]:checked ~ .radio-custom {
        border-color: var(--secondary-color);
    }

    .radio-label input[type="radio"]:checked ~ .radio-custom::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 10px;
        background: var(--secondary-color);
        border-radius: 50%;
    }

    .radio-text {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        font-weight: 500;
        color: var(--gray-700);
    }

    .radio-text i {
        color: var(--secondary-color);
        font-size: var(--font-size-lg);
    }

    .validation-error {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        padding: var(--spacing-3);
        background: #fef2f2;
        border: 2px solid #fecaca;
        border-radius: 8px;
        color: #dc2626;
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-4);
    }

    .form-actions {
        display: flex;
        gap: var(--spacing-3);
        padding-top: var(--spacing-4);
        border-top: 2px solid var(--gray-200);
    }

    .btn-cancel,
    .btn-submit {
        flex: 1;
        padding: var(--spacing-4);
        border-radius: 12px;
        font-size: var(--font-size-base);
        font-weight: 600;
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2);
        transition: all 0.3s;
    }

    .btn-cancel {
        background: var(--gray-200);
        color: var(--gray-700);
    }

    .btn-cancel:hover {
        background: var(--gray-300);
    }

    .btn-submit {
        background: #25d366;
        color: var(--white);
    }

    .btn-submit:hover:not(:disabled) {
        background: #22c55e;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
    }

    .btn-submit:disabled {
        background: var(--gray-400);
        cursor: not-allowed;
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        .modal-content {
            max-height: 95vh;
            border-radius: 16px 16px 0 0;
            margin-top: auto;
        }

        .modal-header {
            padding: var(--spacing-4);
        }

        .modal-body {
            padding: var(--spacing-4);
        }

        .form-row {
            flex-direction: column;
        }

        .form-actions {
            flex-direction: column;
        }

        .btn-cancel,
        .btn-submit {
            width: 100%;
        }
    }
</style>
