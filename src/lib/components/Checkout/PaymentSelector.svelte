<script>
    export let paymentMethod = 'PIX';
</script>

<div class="form-section">
    <h3>Forma de Pagamento</h3>
    
    <div class="payment-options">
        <label class="radio-label">
            <input
                type="radio"
                name="payment"
                value="Dinheiro"
                bind:group={paymentMethod}
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
                bind:group={paymentMethod}
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
                bind:group={paymentMethod}
            />
            <span class="radio-custom"></span>
            <span class="radio-text">
                <i class="fas fa-credit-card" aria-hidden="true"></i>
                Cartão
            </span>
        </label>
    </div>
</div>

<style>
    .form-section {
        margin-bottom: var(--spacing-6);
    }

    .form-section h3 {
        margin: 0 0 var(--spacing-4) 0;
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--gray-900);
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
</style>
