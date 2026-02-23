<script>
    import { PriceService } from '$lib/services/PriceService';
    export let price;
    export let glass = false;
</script>

<span class="price-tag" class:glass>
    {PriceService.formatCurrency(price)}
</span>

<style>
    .price-tag {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--secondary-color);
        transition: all 0.3s ease;
    }

    .price-tag.glass {
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        padding: 4px 10px;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        font-size: var(--font-size-lg);
    }
</style>
