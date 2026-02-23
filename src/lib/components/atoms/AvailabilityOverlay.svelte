<script>
    export let isAvailable;
</script>

{#if isAvailable === false}
    <div class="availability-overlay">
        Esgotado
    </div>
{/if}

<style>
    .availability-overlay {
        position: absolute;
        top: 12px;
        left: 12px;
        background: var(--gray-600);
        color: var(--white);
        padding: var(--spacing-1) var(--spacing-3);
        border-radius: 20px;
        font-size: var(--font-size-xs);
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 10;
    }
</style>
