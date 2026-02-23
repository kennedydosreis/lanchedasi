<script>
    import { cart } from '$lib/stores/cart.js';
    import ReviewSection from '$lib/components/reviews/ReviewSection.svelte';
    import { ReviewRepository } from '$lib/repositories/ReviewRepository';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    
    // Atoms
    import PriceTag from '../atoms/PriceTag.svelte';
    import RatingBadge from '../atoms/RatingBadge.svelte';
    import AvailabilityOverlay from '../atoms/AvailabilityOverlay.svelte';
    import SmartImage from './SmartImage.svelte';

    export let item;

    let showReviews = false;
    let reviews = [];

    onMount(async () => {
        reviews = await ReviewRepository.getReviewsByItem(item.id);
    });

    $: averageRating = reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    function addToCart() {
        cart.addItem(item);
    }

    function toggleReviews() {
        showReviews = !showReviews;
    }
</script>

<div class="menu-item-container">
    <div class="menu-item" class:popular={item.popular} class:unavailable={item.isAvailable === false}>
        <div class="item-image">
            <SmartImage src={item.image} alt={item.name} />
            
            <div class="glass-overlays">
                <PriceTag price={item.price} glass={true} />
                <RatingBadge rating={averageRating} glass={true} />
            </div>

            {#if item.popular}
                <div class="popular-badge">
                    <i class="fas fa-fire" aria-hidden="true"></i>
                    Popular
                </div>
            {/if}

            <AvailabilityOverlay isAvailable={item.isAvailable} />

            <button 
                class="review-toggle-btn" 
                on:click={toggleReviews}
                aria-label="Ver avaliações de {item.name}"
                title="Ver avaliações"
            >
                <i class="fas fa-comment-dots"></i>
            </button>
        </div>
        <div class="item-content">
            <div class="item-header">
                <h3 class="item-name">{item.name}</h3>
            </div>
            <p class="item-description">{item.description}</p>
            <div class="item-footer">
                <div class="price-placeholder"></div>
                <button 
                    class="add-button" 
                    on:click={addToCart} 
                    disabled={item.isAvailable === false}
                    aria-label={item.isAvailable === false ? "{item.name} esgotado" : "Adicionar {item.name} ao carrinho"}
                >
                    <i class="fas fa-plus" aria-hidden="true"></i>
                    {item.isAvailable === false ? 'Esgotado' : 'Adicionar'}
                </button>
            </div>
        </div>
    </div>

    {#if showReviews}
        <div class="reviews-dropdown" transition:fade>
            <div class="dropdown-header">
                <button on:click={toggleReviews} class="close-btn">
                    <i class="fas fa-times"></i> Fechar
                </button>
            </div>
            <ReviewSection itemId={item.id} itemName={item.name} />
        </div>
    {/if}
</div>

<style>
    .menu-item-container {
        position: relative;
        height: 100%;
    }

    .menu-item {
        background: var(--white);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .menu-item:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    .menu-item.popular {
        border: 2px solid var(--secondary-color);
        box-shadow: 0 6px 25px rgba(245, 158, 11, 0.2);
    }

    .menu-item.unavailable {
        opacity: 0.7;
        filter: grayscale(0.5);
    }

    .item-image {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
    }

    .glass-overlays {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 10;
    }

    .menu-item:hover :global(img) {
        transform: scale(1.05);
    }

    .popular-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: linear-gradient(45deg, var(--secondary-color), #f97316);
        color: var(--white);
        padding: var(--spacing-1) var(--spacing-3);
        border-radius: 20px;
        font-size: var(--font-size-xs);
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 5;
    }

    .review-toggle-btn {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background: rgba(255, 255, 255, 0.9);
        color: var(--gray-700);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.2s;
        z-index: 5;
    }

    .review-toggle-btn:hover {
        background: var(--primary-color);
        color: white;
        transform: scale(1.1);
    }

    .item-content {
        padding: var(--spacing-6);
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 12px;
    }

    .item-name {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--gray-900);
        margin: 0;
        line-height: 1.2;
        flex: 1;
    }

    .item-description {
        color: var(--gray-600);
        line-height: 1.5;
        flex: 1;
        margin: 0;
        font-size: var(--font-size-sm);
    }

    .item-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
        gap: var(--spacing-4);
        padding-top: var(--spacing-4);
        border-top: 1px solid var(--gray-100);
    }

    .add-button {
        background: var(--secondary-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-3) var(--spacing-5);
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
        font-size: var(--font-size-sm);
    }

    .add-button:hover:not(:disabled) {
        background: #d97706;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
    }

    .add-button:disabled {
        background: var(--gray-400);
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .reviews-dropdown {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100%;
        z-index: 50;
        background: white;
        border-radius: 20px;
        padding: var(--spacing-6);
        box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        overflow-y: auto;
    }

    .dropdown-header {
        display: flex;
        justify-content: flex-end;
        margin-bottom: var(--spacing-4);
    }

    .close-btn {
        background: var(--gray-100);
        border: none;
        padding: 4px 12px;
        border-radius: 8px;
        font-size: 12px;
        cursor: pointer;
        color: var(--gray-600);
    }

    @media (max-width: 768px) {
        .item-footer {
            flex-direction: column;
            align-items: stretch;
            gap: var(--spacing-3);
        }

        .add-button {
            justify-content: center;
        }

        .item-image {
            height: 160px;
        }
    }
</style>
