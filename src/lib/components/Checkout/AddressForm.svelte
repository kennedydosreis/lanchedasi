<script>
    export let formData = {
        name: '',
        street: '',
        number: '',
        neighborhood: '',
        reference: ''
    };
    export let errors = {
        name: '',
        street: '',
        number: '',
        neighborhood: ''
    };
</script>

<div class="address-form">
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

    input[type="text"] {
        width: 100%;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-family: inherit;
        font-size: var(--font-size-sm);
        transition: border-color 0.2s;
    }

    input[type="text"]:focus {
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

    @media (max-width: 768px) {
        .form-row {
            flex-direction: column;
        }
    }
</style>
