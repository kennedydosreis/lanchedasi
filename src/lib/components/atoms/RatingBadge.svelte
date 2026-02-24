<script>
    export let rating;
    export let glass = false;
</script>

{#if rating}
    <div class="rating-badge" class:glass>
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
        transition: all 0.3s ease;
    }

    .rating-badge.glass {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 4px 10px;
        border-radius: 10px;
    }

    .rating-badge i {
        font-size: 10px;
        color: #f59e0b;
    }

    .rating-badge.glass i {
        color: #ffcc00;
    }
</style>
