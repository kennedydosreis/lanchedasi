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
        comment: 'Avaliação por estrelas' // Comentário padrão automático
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
            newReview = { author: '', rating: 5, comment: 'Avaliação por estrelas' };
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
    <h2 id="reviews-title" class="text-2xl font-bold mb-6 text-gray-800 text-center">Avaliações do {itemName}</h2>

    <div class="max-w-2xl mx-auto space-y-8">
        <!-- Form Simples -->
        <div class="bg-orange-50 p-6 rounded-2xl shadow-sm border border-orange-100">
            <h3 class="text-lg font-bold mb-4 text-orange-800 text-center">Deixe sua nota</h3>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="author" class="block text-xs font-bold text-orange-700 mb-1 uppercase tracking-wider">Seu Nome</label>
                        <input 
                            type="text" 
                            id="author" 
                            bind:value={newReview.author}
                            class="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm shadow-inner"
                            placeholder="Nome"
                            required
                        />
                    </div>

                    <div>
                        <label for="rating" class="block text-xs font-bold text-orange-700 mb-1 uppercase tracking-wider">Sua Nota</label>
                        <select 
                            id="rating" 
                            bind:value={newReview.rating}
                            class="w-full px-4 py-3 rounded-xl border-none focus:ring-2 focus:ring-orange-500 text-sm shadow-inner appearance-none bg-white"
                        >
                            <option value={5}>⭐⭐⭐⭐⭐ (Excelente)</option>
                            <option value={4}>⭐⭐⭐⭐ (Muito Bom)</option>
                            <option value={3}>⭐⭐⭐ (Bom)</option>
                            <option value={2}>⭐⭐ (Regular)</option>
                            <option value={1}>⭐ (Pode Melhorar)</option>
                        </select>
                    </div>
                </div>

                {#if errorMessage}
                    <p class="text-red-600 text-xs bg-red-50 p-2 rounded text-center">{errorMessage}</p>
                {/if}

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    class="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                >
                    {isSubmitting ? 'Enviando...' : 'Avaliar agora'}
                </button>
            </form>
        </div>

        <!-- List -->
        <div class="space-y-4">
            {#if loading}
                <div class="flex justify-center py-8">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            {:else if reviews.length === 0}
                <div class="p-6 text-center">
                    <p class="text-gray-400 italic">Nenhuma avaliação ainda. Seja o primeiro!</p>
                </div>
            {:else}
                <div class="grid grid-cols-1 gap-3">
                    {#each reviews as review}
                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold uppercase text-xs">
                                    {review.author.substring(0, 2)}
                                </div>
                                <div>
                                    <span class="font-bold text-gray-800 block leading-tight">{review.author}</span>
                                    <span class="text-[10px] text-gray-400 uppercase font-medium tracking-tighter">
                                        {new Date(review.timestamp).toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="flex text-yellow-400 text-xs gap-0.5">
                                {#each Array(5) as _, i}
                                    <i class="fas fa-star {i < review.rating ? '' : 'text-gray-200'}"></i>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</section>
