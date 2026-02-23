<script>
    export let rating;
</script>

{#if rating}
    <div class="rating-badge">
        <i class="fas fa-star" aria-hidden="true"></i>
        <span>{rating}</span>
    </div>
{/if}

<style>
    .rating-badge {
        display: flex;
        align-items: center;
        gap: 4px;
        background: #fff8e6;
        color: #b45309;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 700;
    }

    .rating-badge i {
        font-size: 10px;
        color: #f59e0b;
    }
</style>
