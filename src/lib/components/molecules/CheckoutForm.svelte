<script>
    export let observations;
</script>

<div class="form-group">
    <label for="observations">Observações (opcional):</label>
    <textarea
        id="observations"
        bind:value={observations}
        placeholder="Ex: Sem cebola, bem passado, etc..."
        rows="3"
    ></textarea>
</div>

<style>
    .form-group {
        margin-bottom: var(--spacing-6);
    }

    .form-group label {
        display: block;
        font-weight: 600;
        color: var(--gray-700);
        margin-bottom: var(--spacing-2);
        font-size: var(--font-size-sm);
    }

    textarea {
        width: 100%;
        padding: var(--spacing-3);
        border: 2px solid var(--gray-300);
        border-radius: 8px;
        font-family: inherit;
        font-size: var(--font-size-sm);
        resize: vertical;
        min-height: 80px;
    }

    textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }
</style>
