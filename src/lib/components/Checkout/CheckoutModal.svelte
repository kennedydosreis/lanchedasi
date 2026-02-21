<script>
    import { onMount } from 'svelte';
    import { CheckoutService } from '$lib/services/CheckoutService.js';
    import { cart } from '$lib/stores/cart';
    import { validateCartForCheckout, truncateWhatsAppMessage } from '$lib/utils/CartValidator.ts';
    import { loadMenuData } from '$lib/utils/loadMenu.js';

    export let cartItems = [];
    export let onClose = () => {};
    export let onConfirm = () => {};

    const WHATSAPP_NUMBER = '5592993525884';

    let menuData = null;
    let formData = {
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'pix',
        change: '',
        observations: ''
    };

    let errors = {};
    let isSubmitting = false;
    let validationError = '';

    onMount(async () => {
        // Carregar dados salvos do cliente
        const savedInfo = CheckoutService.loadCustomerInfo();
        if (savedInfo) {
            formData = { ...formData, ...savedInfo };
        }

        try {
            menuData = await loadMenuData();
        } catch (err) {
            console.error('Error loading menu for checkout:', err);
        }
    });

    function formatPrice(price) {
        return price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    async function handleSubmit() {
        validationError = '';
        errors = {};

        if (!menuData) {
            validationError = 'Erro ao carregar dados do cardápio. Tente novamente.';
            return;
        }

        isSubmitting = true;

        try {
            // 1. Validação estrutural e lógica de negócio via Service (Zod)
            // Note: CheckoutService.processOrder já lida com a validação do Schema e LocalStorage
            const whatsappUrl = await CheckoutService.processOrder(formData);
            
            // 2. Validação de integridade do carrinho (legado mantido para segurança)
            const cartValidation = validateCartForCheckout(cartItems, menuData);
            if (!cartValidation.valid) {
                validationError = cartValidation.errors.join(', ');
                isSubmitting = false;
                return;
            }

            // 3. Abrir WhatsApp (URL gerada pelo Service)
            window.open(whatsappUrl, '_blank');

            // 4. Finalizar
            onConfirm();
            onClose();

        } catch (error) {
            console.error('Error during checkout:', error);
            validationError = error.message || 'Erro ao processar pedido.';
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
    <div class="modal-content" on:click|stopPropagation role="dialog" aria-labelledby="checkout-title" aria-modal="true">
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
                            <span>{item.quantity}x {item.nome || item.name}</span>
                            <span>{formatPrice((item.preco || item.price) * item.quantity)}</span>
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
                    <h3>Dados de Entrega</h3>
                    
                    <div class="form-group">
                        <label for="name">Nome Completo <span class="required">*</span></label>
                        <input
                            id="name"
                            type="text"
                            bind:value={formData.name}
                            placeholder="Como quer ser chamado?"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="phone">WhatsApp <span class="required">*</span></label>
                        <input
                            id="phone"
                            type="text"
                            bind:value={formData.phone}
                            placeholder="(92) 99999-9999"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <label for="address">Endereço Completo <span class="required">*</span></label>
                        <textarea
                            id="address"
                            bind:value={formData.address}
                            placeholder="Rua, número, bairro e ponto de referência"
                            rows="2"
                            required
                        ></textarea>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Pagamento</h3>
                    
                    <div class="payment-options">
                        <label class="radio-label">
                            <input type="radio" value="pix" bind:group={formData.paymentMethod} />
                            <span class="radio-custom"></span>
                            <span class="radio-text"><i class="fas fa-qrcode"></i> PIX</span>
                        </label>

                        <label class="radio-label">
                            <input type="radio" value="dinheiro" bind:group={formData.paymentMethod} />
                            <span class="radio-custom"></span>
                            <span class="radio-text"><i class="fas fa-money-bill-wave"></i> Dinheiro</span>
                        </label>

                        {#if formData.paymentMethod === 'dinheiro'}
                            <div class="form-group mt-2">
                                <input type="text" bind:value={formData.change} placeholder="Troco para quanto?" />
                            </div>
                        {/if}

                        <label class="radio-label">
                            <input type="radio" value="cartao" bind:group={formData.paymentMethod} />
                            <span class="radio-custom"></span>
                            <span class="radio-text"><i class="fas fa-credit-card"></i> Cartão (Maquininha)</span>
                        </label>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Observações <span class="optional">(opcional)</span></h3>
                    <textarea
                        id="observations"
                        bind:value={formData.observations}
                        placeholder="Ex: Sem cebola, capricha no molho..."
                        rows="2"
                    ></textarea>
                </div>

                {#if validationError}
                    <div class="validation-error" role="alert">
                        <i class="fas fa-exclamation-triangle"></i>
                        {validationError}
                    </div>
                {/if}

                <div class="form-actions">
                    <button type="button" class="btn-cancel" on:click={onClose}>Voltar</button>
                    <button type="submit" class="btn-submit" disabled={isSubmitting}>
                        {#if isSubmitting}
                            <i class="fas fa-spinner fa-spin"></i> Processando...
                        {:else}
                            <i class="fab fa-whatsapp"></i> Enviar Pedido
                        {/if}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    /* Reaproveitando estilos anteriores com ajustes de UX */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 1rem;
    }

    .modal-content {
        background: white;
        border-radius: 20px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h2 { margin: 0; font-size: 1.5rem; }

    .close-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }

    .modal-body { padding: 1.5rem; overflow-y: auto; }

    .order-summary { background: #f9f9f9; padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; }

    .summary-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; }

    .summary-total { border-top: 1px solid #ddd; padding-top: 0.5rem; margin-top: 0.5rem; display: flex; justify-content: space-between; font-size: 1.1rem; }

    .form-section { margin-bottom: 1.5rem; }

    .form-section h3 { font-size: 1rem; margin-bottom: 1rem; color: #333; }

    .form-group { margin-bottom: 1rem; }

    label { display: block; margin-bottom: 0.5rem; font-weight: 600; font-size: 0.85rem; }

    input[type="text"], textarea {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        font-family: inherit;
    }

    .required { color: #e11d48; }

    .payment-options { display: flex; flex-direction: column; gap: 0.8rem; }

    .radio-label {
        display: flex;
        align-items: center;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 10px;
        cursor: pointer;
    }

    .radio-custom {
        width: 18px;
        height: 18px;
        border: 2px solid #ddd;
        border-radius: 50%;
        margin-right: 0.8rem;
    }

    input[type="radio"]:checked + .radio-custom {
        border-color: #25d366;
        background: #25d366;
        box-shadow: inset 0 0 0 3px white;
    }

    input[type="radio"] { display: none; }

    .radio-text { display: flex; align-items: center; gap: 0.5rem; font-weight: 500; }

    .validation-error {
        background: #fff1f2;
        color: #e11d48;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 1rem;
        font-size: 0.9rem;
    }

    .form-actions { display: flex; gap: 1rem; margin-top: 1rem; }

    .btn-cancel, .btn-submit {
        flex: 1;
        padding: 1rem;
        border-radius: 12px;
        font-weight: 700;
        cursor: pointer;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .btn-cancel { background: #eee; }

    .btn-submit { background: #25d366; color: white; }

    .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    .mt-2 { margin-top: 0.5rem; }
</style>
