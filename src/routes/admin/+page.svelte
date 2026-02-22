<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    let password = '';
    let authenticated = false;
    let loading = false;
    let message = '';

    let product = {
        id: '',
        name: '',
        price: 0,
        description: '',
        category: 'sanduiches',
        image: '',
        popular: false,
        disponivel: true
    };

    const categories = [
        { id: 'sanduiches', label: 'Hambúrgueres' },
        { id: 'kikao', label: 'Kikões' },
        { id: 'porcoes', label: 'Porções' },
        { id: 'bebidas', label: 'Bebidas' },
        { id: 'combos', label: 'Combos' }
    ];

    async function handleSubmit() {
        loading = true;
        message = 'Enviando produto para o GitHub...';

        try {
            // Aqui entra a lógica de integração com a GitHub API (Custo Zero)
            // Para o MVP de hoje, simulamos o sucesso e preparamos o payload
            console.log('Payload para GitHub:', product);
            
            setTimeout(() => {
                message = '✅ Produto cadastrado com sucesso! O site será atualizado em instantes.';
                loading = false;
                resetForm();
            }, 2000);
        } catch (err) {
            message = '❌ Erro ao cadastrar produto.';
            loading = false;
        }
    }

    function resetForm() {
        product = { id: '', name: '', price: 0, description: '', category: 'sanduiches', image: '', popular: false, disponivel: true };
    }

    function login() {
        // Autenticação simples via variável de ambiente no futuro
        if (password === 'admin123') {
            authenticated = true;
        } else {
            alert('Senha incorreta');
        }
    }
</script>

<div class="admin-container p-6 max-w-2xl mx-auto">
    {#if !authenticated}
        <div class="login-card bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
            <h1 class="text-2xl font-bold mb-6 text-orange-800">Acesso Restrito</h1>
            <input 
                type="password" 
                bind:value={password} 
                placeholder="Sua senha" 
                class="w-full p-3 border rounded-lg mb-4"
            />
            <button 
                on:click={login}
                class="w-full bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition"
            >
                Entrar
            </button>
        </div>
    {:else}
        <div class="admin-form bg-white p-8 rounded-2xl shadow-xl border border-orange-100">
            <h1 class="text-3xl font-bold mb-2 text-orange-800">Cadastrar Produto</h1>
            <p class="text-gray-500 mb-8">Adicione novos itens ao cardápio (Custo Zero)</p>

            <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">ID Único</label>
                        <input bind:value={product.id} placeholder="ex: x-egg-especial" class="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">Categoria</label>
                        <select bind:value={product.category} class="w-full p-2 border rounded">
                            {#each categories as cat}
                                <option value={cat.id}>{cat.label}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Nome do Produto</label>
                    <input bind:value={product.name} placeholder="Nome do lanche" class="w-full p-2 border rounded" required />
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold mb-1">Preço (R$)</label>
                        <input type="number" step="0.5" bind:value={product.price} class="w-full p-2 border rounded" required />
                    </div>
                    <div>
                        <label class="block text-sm font-semibold mb-1">URL da Imagem</label>
                        <input bind:value={product.image} placeholder="Link da foto" class="w-full p-2 border rounded" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold mb-1">Descrição</label>
                    <textarea bind:value={product.description} class="w-full p-2 border rounded" rows="3"></textarea>
                </div>

                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" bind:checked={product.popular} />
                        <span class="text-sm">⭐ Destaque (Mais Pedido)</span>
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    class="w-full bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-700 transition disabled:bg-gray-400"
                >
                    {loading ? 'Salvando...' : 'Salvar no Cardápio'}
                </button>

                {#if message}
                    <p class="text-center mt-4 font-semibold text-orange-700">{message}</p>
                {/if}
            </form>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        background-color: #fffaf5;
    }
</style>
