<script>
    import { PriceService } from '$lib/services/PriceService';
    export let price;
</script>

<span class="price-tag">
    {PriceService.formatCurrency(price)}
</span>

<style>
    .price-tag {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--secondary-color);
    }
</style>
