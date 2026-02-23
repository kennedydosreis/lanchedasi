<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cart } from '$lib/stores/cart.js';
    import PriceTag from '../atoms/PriceTag.svelte';
    import SmartImage from '../Menu/SmartImage.svelte';
    import AvailabilityOverlay from '../atoms/AvailabilityOverlay.svelte';

    export let items = [];
    export let categoryId = 'all';

    let container;
    let mouseX = 0;
    let mouseY = 0;

    function handleMouseMove(e) {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        e.currentTarget.style.setProperty('--mouse-x', `${mouseX}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${mouseY}px`);
    }

    function getItemSize(item, index) {
        if (item.popular) return 'large'; // 2x2
        if (index % 5 === 0) return 'wide'; // 2x1
        return 'normal'; // 1x1
    }

    function addToCart(item) {
        cart.addItem(item);
    }
</script>

<div 
    class="bento-grid" 
    bind:this={container}
    on:mousemove={handleMouseMove}
    role="list"
    aria-label="Grade de itens do cardápio"
>
    {#each items as item, i (item.id)}
        <div 
            class="bento-card {getItemSize(item, i)}"
            class:unavailable={item.isAvailable === false}
            in:fly={{ y: 20, duration: 400, delay: i * 50 }}
            style="view-transition-name: item-{item.id}"
            role="listitem"
        >
            <div class="card-glow"></div>
            
            <div class="card-content">
                <div class="image-wrapper">
                    <SmartImage src={item.image} alt={item.name} />
                    {#if item.popular}
                        <div class="popular-tag">🔥 Destaque</div>
                    {/if}
                    <AvailabilityOverlay isAvailable={item.isAvailable} />
                </div>

                <div class="info">
                    <div class="text-group">
                        <h3>{item.name}</h3>
                        {#if getItemSize(item, i) !== 'normal'}
                            <p class="description">{item.description}</p>
                        {/if}
                    </div>

                    <div class="actions">
                        <PriceTag price={item.price} />
                        <button 
                            class="add-btn" 
                            on:click={() => addToCart(item)}
                            disabled={item.isAvailable === false}
                        >
                            <span class="btn-text">Adicionar</span>
                            <span class="btn-icon">+</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .bento-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: 200px;
        gap: var(--spacing-4);
        padding: var(--spacing-4);
        position: relative;
    }

    .bento-card {
        position: relative;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 24px;
        overflow: hidden;
        border: 1px solid var(--gray-200);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
        cursor: pointer;
        backdrop-filter: blur(10px);
    }

    .bento-card:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        z-index: 10;
        border-color: var(--secondary-color);
    }

    /* Glow Effect */
    .card-glow {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(245, 158, 11, 0.15),
            transparent 40%
        );
        opacity: 0;
        transition: opacity 0.5s;
        pointer-events: none;
        z-index: 1;
    }

    .bento-card:hover .card-glow {
        opacity: 1;
    }

    /* Sizes */
    .normal { grid-column: span 1; grid-row: span 1; }
    .wide { grid-column: span 2; grid-row: span 1; }
    .large { grid-column: span 2; grid-row: span 2; }

    .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 2;
    }

    .image-wrapper {
        position: relative;
        flex: 1;
        min-height: 0;
        overflow: hidden;
    }

    .image-wrapper :global(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .bento-card:hover .image-wrapper :global(img) {
        transform: scale(1.1);
    }

    .popular-tag {
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--secondary-color);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 700;
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }

    .info {
        padding: var(--spacing-4);
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--spacing-2);
    }

    h3 {
        margin: 0;
        font-size: var(--font-size-base);
        font-weight: 700;
        color: var(--gray-900);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .description {
        font-size: 12px;
        color: var(--gray-600);
        margin: 4px 0 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: var(--spacing-2);
    }

    .add-btn {
        background: var(--gray-900);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 12px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .add-btn:hover:not(:disabled) {
        background: var(--secondary-color);
        transform: translateX(4px);
    }

    .add-btn:disabled {
        background: var(--gray-300);
        cursor: not-allowed;
    }

    .btn-icon {
        font-size: 18px;
        line-height: 1;
    }

    /* Adjustments for normal cards */
    .normal .info {
        padding: var(--spacing-3);
    }
    .normal .description { display: none; }
    .normal .btn-text { display: none; }
    .normal .add-btn { padding: 8px; border-radius: 50%; width: 32px; height: 32px; justify-content: center; }

    /* Mobile */
    @media (max-width: 1024px) {
        .bento-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 180px;
        }
    }

    @media (max-width: 640px) {
        .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: var(--spacing-6);
        }

        .bento-card {
            grid-column: span 1 !important;
            grid-row: span 1 !important;
            height: 400px;
        }

        .info { padding: var(--spacing-5); }
        h3 { font-size: var(--font-size-lg); }
        .normal .description { display: block; }
        .normal .btn-text { display: inline; }
        .normal .add-btn { width: auto; height: auto; border-radius: 12px; padding: 12px 24px; }
    }

    .unavailable {
        filter: grayscale(1) opacity(0.7);
    }
</style>
