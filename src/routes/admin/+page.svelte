<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    let password = '';
    let authenticated = false;
    let loading = false;
    let status = { type: '', message: '' };

    let product = {
        id: '',
        name: '',
        price: '',
        description: '',
        category: 'sanduiches',
        image: '',
        popular: false,
        disponivel: true
    };

    const categories = [
        { id: 'sanduiches', label: '🍔 Hambúrgueres' },
        { id: 'kikao', label: '🌭 Kikões' },
        { id: 'porcoes', label: '🍟 Porções' },
        { id: 'bebidas', label: '🥤 Bebidas' },
        { id: 'combos', label: '🍱 Combos' }
    ];

    async function handleSubmit() {
        if (!product.id || !product.name || !product.price) {
            showStatus('error', 'Por favor, preencha os campos obrigatórios.');
            return;
        }

        loading = true;
        showStatus('info', 'Sincronizando com o cardápio...');

        try {
            // Simulação de integração com GitHub API
            console.log('Payload:', product);
            
            setTimeout(() => {
                showStatus('success', '✅ Produto cadastrado! O site atualizará em breve.');
                loading = false;
                resetForm();
            }, 1500);
        } catch (err) {
            showStatus('error', 'Erro ao salvar. Tente novamente.');
            loading = false;
        }
    }

    function showStatus(type, message) {
        status = { type, message };
        if (type === 'success') {
            setTimeout(() => status = { type: '', message: '' }, 5000);
        }
    }

    function resetForm() {
        product = { id: '', name: '', price: '', description: '', category: 'sanduiches', image: '', popular: false, disponivel: true };
    }

    function login() {
        if (password === 'admin123') {
            authenticated = true;
        } else {
            showStatus('error', 'Senha incorreta!');
        }
    }
</script>

<div class="admin-page min-h-screen bg-slate-50 font-sans text-slate-900">
    <div class="max-w-4xl mx-auto px-4 py-8 md:py-12">
        
        {#if !authenticated}
            <!-- Login Card -->
            <div class="min-h-[70vh] flex items-center justify-center">
                <div class="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 border border-slate-100 relative overflow-hidden">
                    <!-- Decorative background element -->
                    <div class="absolute -top-24 -right-24 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
                    <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-50 rounded-full blur-3xl opacity-50"></div>

                    <div class="relative z-10">
                        <div class="text-center mb-10">
                            <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl shadow-orange-200 animate-bounce-slow">
                                🔐
                            </div>
                            <h1 class="text-3xl font-black text-slate-800 tracking-tight">Acesso Restrito</h1>
                            <p class="text-slate-500 mt-2 font-medium">Lanche da Si • Gestão</p>
                        </div>

                        <div class="space-y-6">
                            <div class="space-y-3">
                                <label class="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Senha do Proprietário</label>
                                <input 
                                    type="password" 
                                    bind:value={password} 
                                    placeholder="••••••••" 
                                    class="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-center text-lg font-bold tracking-widest placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal"
                                    on:keydown={(e) => e.key === 'Enter' && login()}
                                />
                            </div>
                            
                            <button 
                                on:click={login}
                                class="w-full bg-slate-900 hover:bg-black text-white font-black py-5 rounded-[1.5rem] shadow-2xl shadow-slate-200 transition-all active:scale-[0.97] flex items-center justify-center gap-3 group"
                            >
                                <span>Entrar no Painel</span>
                                <span class="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                            
                            {#if status.type === 'error'}
                                <div class="bg-red-50 text-red-500 py-3 rounded-2xl text-center text-sm font-bold animate-shake">
                                    ⚠️ {status.message}
                                </div>
                            {/if}
                        </div>

                        <div class="mt-12 text-center border-t border-slate-50 pt-8">
                            <p class="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Acesso seguro • Custo Zero</p>
                        </div>
                    </div>
                </div>
            </div>
        {:else}
            <!-- Admin Dashboard -->
            <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 class="text-3xl font-extrabold text-slate-800">Novo Produto</h1>
                    <p class="text-slate-500">Adicione itens ao cardápio em tempo real</p>
                </div>
                <button on:click={() => authenticated = false} class="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors">
                    Sair do Painel
                </button>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Column -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                            
                            <!-- Basic Info -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700">Identificador (ID)</label>
                                    <input bind:value={product.id} placeholder="ex: x-egg-bacon" class="form-input" required />
                                    <span class="text-[10px] text-slate-400 uppercase font-bold">Usado para controle interno</span>
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700">Categoria</label>
                                    <select bind:value={product.category} class="form-input">
                                        {#each categories as cat}
                                            <option value={cat.id}>{cat.label}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-sm font-bold text-slate-700">Nome Público</label>
                                <input bind:value={product.name} placeholder="Nome que o cliente verá" class="form-input" required />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700">Preço de Venda (R$)</label>
                                    <input type="number" step="0.5" bind:value={product.price} placeholder="0.00" class="form-input" required />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-slate-700">URL da Foto</label>
                                    <input bind:value={product.image} placeholder="https://..." class="form-input" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-sm font-bold text-slate-700">Descrição/Ingredientes</label>
                                <textarea bind:value={product.description} placeholder="Ex: Pão, carne 150g, queijo, bacon..." class="form-input h-24 resize-none"></textarea>
                            </div>

                            <div class="flex flex-wrap gap-4 pt-2">
                                <label class="toggle-card" class:active={product.popular}>
                                    <input type="checkbox" bind:checked={product.popular} class="hidden" />
                                    <span>⭐ Destaque</span>
                                </label>
                                <label class="toggle-card" class:active={product.disponivel}>
                                    <input type="checkbox" bind:checked={product.disponivel} class="hidden" />
                                    <span>✅ Disponível</span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                class="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-black transition-all disabled:bg-slate-300 flex items-center justify-center gap-2"
                            >
                                {#if loading}
                                    <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {/if}
                                {loading ? 'Sincronizando...' : 'Publicar no Cardápio'}
                            </button>

                            {#if status.message}
                                <div class="p-4 rounded-xl text-center text-sm font-bold transition-all" 
                                     class:bg-green-50={status.type === 'success'} 
                                     class:text-green-600={status.type === 'success'}
                                     class:bg-blue-50={status.type === 'info'}
                                     class:text-blue-600={status.type === 'info'}
                                     class:bg-red-50={status.type === 'error'}
                                     class:text-red-600={status.type === 'error'}>
                                    {status.message}
                                </div>
                            {/if}
                        </form>
                    </div>
                </div>

                <!-- Preview Column -->
                <div class="space-y-6">
                    <h2 class="text-sm font-bold uppercase tracking-widest text-slate-400">Prévia do Cardápio</h2>
                    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden sticky top-8">
                        <div class="aspect-video bg-slate-100 flex items-center justify-center relative">
                            {#if product.image}
                                <img src={product.image} alt="Preview" class="w-full h-full object-cover" />
                            {:else}
                                <span class="text-slate-300 text-4xl">📸</span>
                            {/if}
                            {#if product.popular}
                                <span class="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-1 rounded-full uppercase">Mais Pedido</span>
                            {/if}
                        </div>
                        <div class="p-5 space-y-2">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-lg leading-tight">{product.name || 'Nome do Lanche'}</h3>
                                <span class="text-orange-600 font-extrabold">R$ {product.price || '0,00'}</span>
                            </div>
                            <p class="text-slate-400 text-sm line-clamp-2">{product.description || 'A descrição aparecerá aqui para o cliente...'}</p>
                            <div class="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span class="text-[10px] font-bold text-slate-300 uppercase">{categories.find(c => c.id === product.category)?.label.split(' ')[1]}</span>
                                <div class="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-xs">🛒</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="p-6 bg-blue-600 rounded-3xl text-white">
                        <h4 class="font-bold mb-1">Dica de Ouro 💡</h4>
                        <p class="text-blue-100 text-sm leading-relaxed">Use fotos quadradas (1:1) com boa iluminação para que o lanche pareça ainda mais apetitoso!</p>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .form-input {
        @apply w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all placeholder:text-slate-300;
    }

    .toggle-card {
        @apply px-4 py-2 rounded-full border-2 border-slate-100 text-slate-400 font-bold text-xs cursor-pointer transition-all select-none;
    }

    .toggle-card.active {
        @apply border-orange-500 bg-orange-50 text-orange-600;
    }

    :global(.animate-bounce-slow) {
        animation: bounce 3s infinite;
    }

    :global(.animate-spin) {
        animation: spin 1s linear infinite;
    }

    :global(.animate-shake) {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes shake {
        10%, 90% { transform: translate3d(-1px, 0, 0); }
        20%, 80% { transform: translate3d(2px, 0, 0); }
        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
        40%, 60% { transform: translate3d(4px, 0, 0); }
    }
</style>
