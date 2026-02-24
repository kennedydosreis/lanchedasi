<script>
    import { orderInfo } from '$lib/stores/orderInfo';
    import { PriceService } from '$lib/services/PriceService';

    let showLocationError = false;
    let locationErrorMessage = '';
    let showManualAddress = false;
    let manualAddress = '';
    let recalculateDistance = false;

    async function getLocation() {
        try {
            showLocationError = false;
            showManualAddress = false;
            const result = await orderInfo.getLocationAsync();

            if (result.location && result.location.accuracy) {
                const accuracy = Math.round(result.location.accuracy);
                if (accuracy > 200) {
                    showLocationError = true;
                    locationErrorMessage = `⚠️ Localização muito imprecisa (±${accuracy}m).`;
                    setTimeout(() => { showLocationError = false; }, 10000);
                }
            }
        } catch (error) {
            showLocationError = true;
            locationErrorMessage = error.message;
            setTimeout(() => { showLocationError = false; }, 5000);
        }
    }

    function toggleManualAddress() {
        showManualAddress = !showManualAddress;
        showLocationError = false;
        if (showManualAddress) {
            manualAddress = $orderInfo.address || '';
            recalculateDistance = false;
        }
    }

    async function saveManualAddress() {
        if (manualAddress.trim()) {
            try {
                orderInfo.setLoadingLocation(true);
                if (!$orderInfo.location || recalculateDistance) {
                    await orderInfo.setAddressWithGeocode(manualAddress.trim());
                } else {
                    orderInfo.setAddress(manualAddress.trim());
                }
                showManualAddress = false;
                manualAddress = '';
                recalculateDistance = false;
            } catch (error) {
                showLocationError = true;
                locationErrorMessage = 'Erro ao processar endereço.';
                setTimeout(() => { showLocationError = false; }, 5000);
            }
        }
    }
</script>

<div class="form-group">
    <label for="delivery-address">Endereço para entrega:</label>
    <div class="location-section" id="delivery-address">
        {#if showManualAddress}
            <div class="manual-address-form">
                <label for="manual-address">{$orderInfo.address ? 'Corrigir endereço:' : 'Digite seu endereço completo:'}</label>
                <textarea id="manual-address" bind:value={manualAddress} placeholder="Ex: Rua Itororo, 22, Alvorada, Manaus - AM" rows="3"></textarea>
                {#if $orderInfo.location}
                    <label class="checkbox-label">
                        <input type="checkbox" bind:checked={recalculateDistance} />
                        <span>Recalcular distância e frete</span>
                    </label>
                {/if}
                <div class="manual-address-buttons">
                    <button class="save-address-btn" on:click={saveManualAddress} disabled={!manualAddress.trim()}>
                        <i class="fas fa-check" aria-hidden="true"></i>
                        {$orderInfo.address ? 'Atualizar' : 'Salvar'}
                    </button>
                    <button class="cancel-address-btn" on:click={toggleManualAddress}>Cancelar</button>
                </div>
            </div>
        {:else if $orderInfo.address}
            <div class="location-display">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <div class="location-info">
                    <span class="address">{$orderInfo.address}</span>
                    {#if $orderInfo.distance !== null}
                        <div class="delivery-info">
                            <span class="distance">📏 {$orderInfo.distance}km</span>
                            {#if !$orderInfo.canDeliver}
                                <span class="error">❌ Fora da área</span>
                            {:else if $orderInfo.deliveryFee === 0}
                                <span class="free">🎉 Entrega grátis!</span>
                            {:else}
                                <span class="fee">🚚 Taxa: {PriceService.formatCurrency($orderInfo.deliveryFee)}</span>
                            {/if}
                        </div>
                    {/if}
                </div>
                <div class="location-actions">
                    <button class="location-clear" on:click={() => orderInfo.clear()} aria-label="Limpar">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                    <button class="fix-address-btn" on:click={toggleManualAddress} aria-label="Corrigir">
                        <i class="fas fa-edit" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        {:else}
            <div class="location-buttons">
                <button class="location-btn" on:click={getLocation} disabled={$orderInfo.isLoadingLocation}>
                    <i class="fas fa-location-arrow" aria-hidden="true"></i>
                    {$orderInfo.isLoadingLocation ? 'Calculando...' : 'Usar minha localização'}
                </button>
                <button class="manual-btn" on:click={toggleManualAddress}>
                    <i class="fas fa-edit" aria-hidden="true"></i> Digitar endereço
                </button>
            </div>
        {/if}

        {#if showLocationError}
            <div class="error-message" role="alert">{locationErrorMessage}</div>
        {/if}
    </div>
</div>

<style>
    .form-group { margin-bottom: var(--spacing-6); }
    .form-group label { display: block; font-weight: 600; color: var(--gray-700); margin-bottom: var(--spacing-2); font-size: var(--font-size-sm); }
    .location-section { display: flex; flex-direction: column; gap: var(--spacing-3); }
    .location-display { display: flex; align-items: flex-start; gap: var(--spacing-3); padding: var(--spacing-4); background: var(--white); border: 2px solid var(--accent-color); border-radius: 8px; font-size: var(--font-size-sm); }
    .location-info { flex: 1; display: flex; flex-direction: column; gap: var(--spacing-2); }
    .location-actions { display: flex; flex-direction: column; gap: var(--spacing-1); align-items: flex-end; }
    .address { color: var(--gray-700); font-weight: 500; }
    .delivery-info { display: flex; flex-direction: column; gap: var(--spacing-1); font-size: var(--font-size-xs); }
    .free { color: #059669; font-weight: 600; }
    .fee { color: var(--accent-color); font-weight: 600; }
    .error { color: var(--danger-color); font-weight: 600; }
    .location-btn, .manual-btn, .save-address-btn, .cancel-address-btn { 
        padding: var(--spacing-3); border-radius: 8px; border: none; cursor: pointer; font-weight: 600; font-size: var(--font-size-sm); display: flex; align-items: center; justify-content: center; gap: var(--spacing-2);
    }
    .location-btn { background: var(--accent-color); color: var(--white); }
    .manual-btn { background: var(--gray-600); color: var(--white); }
    .save-address-btn { background: var(--accent-color); color: var(--white); }
    .cancel-address-btn { background: var(--gray-500); color: var(--white); }
    .location-clear { background: none; border: none; color: var(--gray-400); cursor: pointer; }
    .fix-address-btn { background: var(--accent-color); color: var(--white); border: none; padding: 4px; border-radius: 4px; cursor: pointer; }
    .manual-address-form { display: flex; flex-direction: column; gap: var(--spacing-3); }
    .manual-address-buttons { display: flex; gap: var(--spacing-2); }
    .manual-address-buttons button { flex: 1; }
    textarea { width: 100%; padding: var(--spacing-3); border: 2px solid var(--gray-300); border-radius: 8px; font-family: inherit; font-size: var(--font-size-sm); }
    .error-message { padding: var(--spacing-3); background: #fef2f2; color: #dc2626; border-radius: 8px; font-size: var(--font-size-sm); }
    .checkbox-label { display: flex; align-items: center; gap: var(--spacing-2); font-size: var(--font-size-sm); cursor: pointer; }
</style>
