<script>
    import { onMount } from 'svelte';
    import { ReviewRepository } from '$lib/repositories/ReviewRepository';
    import LoggerService from '$lib/services/LoggerService';

    export let itemId;
    export let itemName;

    let reviews = [];
    let loading = true;
    let newReview = {
        author: '',
        rating: 5,
        comment: ''
    };
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

    async function handleSubmit() {
        isSubmitting = true;
        errorMessage = '';
        try {
            await ReviewRepository.addReview({
                ...newReview,
                itemId
            });
            newReview = { author: '', rating: 5, comment: '' };
            await loadReviews();
            LoggerService.info('Review added successfully', { itemId });
        } catch (e) {
            errorMessage = e.errors?.[0]?.message || 'Erro ao enviar avaliação. Verifique os campos.';
            LoggerService.warn('Review validation failed', { itemId, errors: e.errors });
        } finally {
            isSubmitting = false;
        }
    }
</script>

<section class="mt-12 border-t pt-8" aria-labelledby="reviews-title">
    <h2 id="reviews-title" class="text-2xl font-bold mb-6 text-gray-800">Avaliações de quem já provou</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- List -->
        <div>
            {#if loading}
                <div class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            {:else if reviews.length === 0}
                <div class="bg-gray-50 p-6 rounded-xl text-center">
                    <p class="text-gray-600">Este item ainda não tem avaliações. Seja o primeiro!</p>
                </div>
            {:else}
                <div class="space-y-4">
                    {#each reviews as review}
                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <span class="font-bold text-gray-800">{review.author}</span>
                                    {#if review.isVerified}
                                        <span class="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                            <i class="fas fa-check-circle mr-1"></i> Cliente Real
                                        </span>
                                    {/if}
                                </div>
                                <div class="flex text-yellow-400 text-sm">
                                    {#each Array(5) as _, i}
                                        <i class="fas fa-star {i < review.rating ? '' : 'text-gray-200'}"></i>
                                    {/each}
                                </div>
                            </div>
                            <p class="text-gray-600 text-sm italic">"{review.comment}"</p>
                            <span class="text-[10px] text-gray-400 mt-2 block">
                                {new Date(review.timestamp).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <!-- Form -->
        <div class="bg-orange-50 p-6 rounded-2xl h-fit">
            <h3 class="text-lg font-bold mb-4 text-orange-800">O que você achou do {itemName}?</h3>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div>
                    <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                    <input 
                        type="text" 
                        id="author" 
                        bind:value={newReview.author}
                        class="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="Ex: João Silva"
                        required
                    />
                </div>

                <div>
                    <label for="rating" class="block text-sm font-medium text-gray-700 mb-1">Sua Nota</label>
                    <select 
                        id="rating" 
                        bind:value={newReview.rating}
                        class="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                        <option value={5}>⭐⭐⭐⭐⭐ (Excelente)</option>
                        <option value={4}>⭐⭐⭐⭐ (Muito Bom)</option>
                        <option value={3}>⭐⭐⭐ (Bom)</option>
                        <option value={2}>⭐⭐ (Regular)</option>
                        <option value={1}>⭐ (Pode Melhorar)</option>
                    </select>
                </div>

                <div>
                    <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">Seu Comentário</label>
                    <textarea 
                        id="comment" 
                        bind:value={newReview.comment}
                        rows="3"
                        class="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500 text-sm"
                        placeholder="O que você mais gostou?"
                        required
                    ></textarea>
                </div>

                {#if errorMessage}
                    <p class="text-red-600 text-xs bg-red-50 p-2 rounded">{errorMessage}</p>
                {/if}

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg disabled:opacity-50"
                >
                    {isSubmitting ? 'Enviando...' : 'Publicar Avaliação'}
                </button>
            </form>
        </div>
    </div>
</section>
