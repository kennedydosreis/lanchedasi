<script>
    import { createEventDispatcher } from 'svelte';
    import { cart } from '../../stores/cart';
    import { ComboService } from '../../services/ComboService';

    export let promo;
    export let menuItems = [];

    let currentStepIndex = 0;
    let selectedItems = [];
    let dispatch = createEventDispatcher();

    $: currentStep = promo.steps[currentStepIndex];
    $: availableItems = menuItems.filter(item => item.category === currentStep.category && item.disponivel !== false);

    function selectItem(item) {
        selectedItems = [...selectedItems, item];
        if (currentStepIndex < promo.steps.length - 1) {
            currentStepIndex++;
        } else {
            completeCombo();
        }
    }

    function completeCombo() {
        const comboItem = {
            id: `${promo.id}-${Date.now()}`,
            name: promo.name,
            price: promo.discount.value,
            items: selectedItems,
            isCombo: true
        };
        
        cart.addItem(comboItem);
        ComboService.logComboApplied(promo.id);
        dispatch('complete');
        reset();
    }

    function reset() {
        currentStepIndex = 0;
        selectedItems = [];
    }
</script>

<div class="combo-stepper p-4 bg-orange-50 rounded-lg shadow-inner">
    <div class="header mb-4">
        <h3 class="text-xl font-bold text-orange-800">{promo.name}</h3>
        <p class="text-sm text-orange-600">{currentStep.label}</p>
        <div class="progress-bar flex gap-1 mt-2">
            {#each promo.steps as _, i}
                <div class="h-2 flex-1 rounded {i <= currentStepIndex ? 'bg-orange-500' : 'bg-orange-200'}"></div>
            {/each}
        </div>
    </div>

    <div class="options grid grid-cols-2 gap-3">
        {#each availableItems as item}
            <button 
                on:click={() => selectItem(item)}
                class="p-3 bg-white border-2 border-orange-200 rounded-lg hover:border-orange-500 transition-colors text-left"
            >
                <span class="block font-semibold text-gray-800">{item.name}</span>
                <span class="text-xs text-gray-500">{item.description || ''}</span>
            </button>
        {/each}
    </div>

    <button on:click={reset} class="mt-4 text-xs text-orange-700 underline">Reiniciar seleção</button>
</div>

<style>
    .combo-stepper {
        border: 2px solid #ffedd5;
    }
</style>
