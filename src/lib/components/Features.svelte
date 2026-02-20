<script>
    import { orderInfo } from '$lib/stores/orderInfo.js';

    let showDemo = false;
    let demoObservations = '';
    let showLocationError = false;
    let locationErrorMessage = '';

    async function getDemoLocation() {
        try {
            showLocationError = false;
            const result = await orderInfo.getLocationAsync();
            import.meta.env.DEV && console.log('Localização obtida:', result);
        } catch (error) {
            showLocationError = true;
            locationErrorMessage = error.message;
            setTimeout(() => {
                showLocationError = false;
            }, 5000);
        }
    }

    function clearLocation() {
        orderInfo.clear();
    }
</script>

<section id="funcionalidades" class="features-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Funcionalidades Especiais</h2>
            <p class="section-subtitle">Facilite seu pedido com nossas novas funcionalidades</p>
        </div>

        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-sticky-note"></i>
                </div>
                <h3>Observações Personalizadas</h3>
                <p>Adicione observações especiais ao seu pedido como "sem cebola", "bem passado", etc.</p>
                <button class="demo-btn" on:click={() => showDemo = !showDemo}>
                    {showDemo ? 'Ocultar' : 'Testar'} Funcionalidade
                </button>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3>Localização Automática</h3>
                <p>Use sua localização atual para facilitar a entrega do seu pedido.</p>
                <div class="location-demo">
                    {#if $orderInfo.address}
                        <div class="location-display">
                            <i class="fas fa-check-circle"></i>
                            <span>{$orderInfo.address}</span>
                            <button class="clear-btn" on:click={clearLocation} aria-label="Limpar localização">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    {:else}
                        <button
                            class="location-btn"
                            on:click={getDemoLocation}
                            disabled={$orderInfo.isLoadingLocation}
                        >
                            {#if $orderInfo.isLoadingLocation}
                                <i class="fas fa-spinner fa-spin"></i>
                                Obtendo...
                            {:else}
                                <i class="fas fa-location-arrow"></i>
                                Obter Localização
                            {/if}
                        </button>
                    {/if}

                    {#if showLocationError}
                        <div class="error-message">
                            <i class="fas fa-exclamation-triangle"></i>
                            {locationErrorMessage}
                        </div>
                    {/if}
                </div>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h3>Pedido via WhatsApp</h3>
                <p>Seu pedido é enviado diretamente para o WhatsApp com todas as informações organizadas.</p>
                <div class="whatsapp-preview">
                    <div class="message-preview">
                        <strong>🍔 Pedido - Lanche da Si</strong><br>
                        • 1x X-Burger Especial<br>
                        📝 Observações: Sem cebola<br>
                        📍 Localização: Sua localização atual
                    </div>
                </div>
            </div>
        </div>

        {#if showDemo}
            <div class="demo-section">
                <h3>💡 Teste a Funcionalidade de Observações</h3>
                <div class="demo-form">
                    <label for="demo-obs">Digite suas observações:</label>
                    <textarea
                        id="demo-obs"
                        bind:value={demoObservations}
                        placeholder="Ex: Sem cebola, bem passado, maionese à parte..."
                        rows="3"
                    ></textarea>
                    <div class="preview">
                        <strong>Prévia no WhatsApp:</strong>
                        <div class="whatsapp-message">
                            🍔 <strong>Pedido - Lanche da Si</strong><br><br>
                            • 1x X-Burger Especial<br>
                            R$ 15,90<br><br>
                            {#if demoObservations.trim()}
                                📝 <strong>Observações:</strong><br>
                                {demoObservations}<br><br>
                            {/if}
                            💰 <strong>Total: R$ 15,90</strong>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>

<style>
    .features-section {
        padding: var(--spacing-12) 0;
        background: linear-gradient(135deg, #f8fafc, #e2e8f0);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--spacing-12);
    }

    .section-title {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        margin-bottom: var(--spacing-4);
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-600);
        margin: 0;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--spacing-8);
        margin-bottom: var(--spacing-10);
    }

    .feature-card {
        background: var(--white);
        border-radius: 20px;
        padding: var(--spacing-8);
        text-align: center;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-6);
        font-size: 2rem;
        color: var(--white);
    }

    .feature-card h3 {
        font-size: var(--font-size-xl);
        font-weight: 700;
        margin-bottom: var(--spacing-4);
        color: var(--gray-900);
    }

    .feature-card p {
        color: var(--gray-600);
        line-height: 1.6;
        margin-bottom: var(--spacing-6);
    }

    .demo-btn {
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3) var(--spacing-6);
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .demo-btn:hover {
        background: #1e3a23;
    }

    .location-demo {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .location-display {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        padding: var(--spacing-3);
        background: #f0f9ff;
        border: 2px solid var(--accent-color);
        border-radius: 12px;
        font-size: var(--font-size-sm);
    }

    .location-display i {
        color: #059669;
        flex-shrink: 0;
    }

    .location-display span {
        flex: 1;
        color: var(--gray-700);
        text-align: left;
    }

    .clear-btn {
        background: none;
        border: none;
        color: var(--gray-400);
        cursor: pointer;
        padding: var(--spacing-1);
        border-radius: 4px;
        flex-shrink: 0;
    }

    .clear-btn:hover {
        color: var(--danger-color);
    }

    .location-btn {
        background: var(--accent-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3);
        border-radius: 12px;
        cursor: pointer;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        justify-content: center;
        transition: background-color 0.3s ease;
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

    .whatsapp-preview {
        margin-top: var(--spacing-4);
    }

    .message-preview {
        background: #e7f5e7;
        border: 1px solid #25d366;
        border-radius: 12px;
        padding: var(--spacing-4);
        font-size: var(--font-size-sm);
        line-height: 1.5;
        color: var(--gray-700);
        text-align: left;
    }

    .demo-section {
        background: var(--white);
        border-radius: 20px;
        padding: var(--spacing-8);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }

    .demo-section h3 {
        text-align: center;
        color: var(--gray-900);
        margin-bottom: var(--spacing-6);
    }

    .demo-form {
        max-width: 600px;
        margin: 0 auto;
    }

    .demo-form label {
        display: block;
        font-weight: 600;
        color: var(--gray-700);
        margin-bottom: var(--spacing-2);
    }

    .demo-form textarea {
        width: 100%;
        padding: var(--spacing-4);
        border: 2px solid var(--gray-300);
        border-radius: 12px;
        font-family: inherit;
        font-size: var(--font-size-base);
        resize: vertical;
        margin-bottom: var(--spacing-6);
    }

    .demo-form textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }

    .preview strong {
        color: var(--gray-900);
        display: block;
        margin-bottom: var(--spacing-3);
    }

    .whatsapp-message {
        background: #dcf8c6;
        border-radius: 18px 18px 4px 18px;
        padding: var(--spacing-4);
        font-size: var(--font-size-sm);
        line-height: 1.5;
        color: var(--gray-800);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        position: relative;
    }

    .whatsapp-message::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: -8px;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top: 8px solid #dcf8c6;
        border-right: 0;
    }

    @media (max-width: 768px) {
        .features-section {
            padding: var(--spacing-8) 0;
        }

        .section-title {
            font-size: var(--font-size-3xl);
        }

        .features-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
        }

        .feature-card {
            padding: var(--spacing-6);
        }

        .demo-section {
            padding: var(--spacing-6);
        }
    }
</style>
