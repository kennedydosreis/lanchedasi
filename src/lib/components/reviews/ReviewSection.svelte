<script>
    import { onMount } from 'svelte';
    import { ReviewRepository } from '$lib/repositories/ReviewRepository';
    import LoggerService from '$lib/services/LoggerService';

    export let itemId;
    export let itemName;

    let reviews = [];
    let loading = true;
    let newRating = 5;
    let isSubmitting = false;
    let errorMessage = '';

    onMount(async () => {
        await loadReviews();
    });

    async function loadReviews() {
        loading = true;
        try {
            reviews = await ReviewRepository.getReviewsByItem(itemId);
        } catch (e) {
            LoggerService.error('Error loading reviews', { itemId, error: e.message });
        } finally {
            loading = false;
        }
    }

    $: averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    async function submitRating(rating) {
        if (isSubmitting) return;
        newRating = rating;
        isSubmitting = true;
        errorMessage = '';
        try {
            await ReviewRepository.addReview({
                author: 'Cliente',
                rating: newRating,
                comment: 'Avaliação iFood style',
                itemId
            });
            await loadReviews();
            LoggerService.info('Rating added successfully', { itemId, rating });
        } catch (e) {
            errorMessage = 'Erro ao avaliar.';
            LoggerService.warn('Rating failed', { itemId, error: e.message });
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="rating-container py-4 border-t border-gray-100">
    {#if loading}
        <div class="h-6 w-24 bg-gray-100 animate-pulse rounded"></div>
    {:else}
        <div class="flex items-center justify-between gap-4">
            <!-- Resumo iFood Style -->
            <div class="flex items-center gap-2">
                <div class="flex items-center text-yellow-500 font-bold">
                    <i class="fas fa-star mr-1 text-sm"></i>
                    <span class="text-sm">{averageRating || 'Novo!'}</span>
                </div>
                {#if reviews.length > 0}
                    <span class="text-gray-400 text-xs">•</span>
                    <span class="text-gray-500 text-xs">{reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'}</span>
                {/if}
            </div>

            <!-- Botões de Ação Rápida -->
            <div class="flex items-center gap-1">
                {#if isSubmitting}
                    <span class="text-[10px] text-gray-400 animate-pulse">Enviando...</span>
                {:else}
                    <span class="text-[10px] text-gray-400 mr-2 uppercase font-bold tracking-tight">Avaliar:</span>
                    <div class="flex gap-1">
                        {#each [1, 2, 3, 4, 5] as star}
                            <button 
                                on:click={() => submitRating(star)}
                                class="w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90 border {newRating === star ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'bg-white border-gray-100 text-gray-300'}"
                                aria-label="Avaliar com {star} estrelas"
                            >
                                <i class="fas fa-star text-[10px]"></i>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>

        {#if errorMessage}
            <p class="text-red-500 text-[10px] mt-1 text-right">{errorMessage}</p>
        {/if}
     neighborhood </div>
{/if}

<style>
    .rating-container {
        user-select: none;
    }
</style>
