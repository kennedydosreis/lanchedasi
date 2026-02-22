<script>
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
            showStatus('error', 'Preencha os campos obrigatórios.');
            return;
        }
        loading = true;
        showStatus('info', 'Sincronizando...');
        setTimeout(() => {
            showStatus('success', '✅ Cadastrado com sucesso!');
            loading = false;
            resetForm();
        }, 1500);
    }

    function showStatus(type, message) {
        status = { type, message };
        if (type === 'success') setTimeout(() => status = { type: '', message: '' }, 5000);
    }

    function resetForm() {
        product = { id: '', name: '', price: '', description: '', category: 'sanduiches', image: '', popular: false, disponivel: true };
    }

    function login() {
        if (password === 'admin123') authenticated = true;
        else showStatus('error', 'Senha incorreta!');
    }
</script>

<div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-4xl mx-auto">
        
        {#if !authenticated}
            <!-- Login Card -->
            <div class="flex items-center justify-center py-12">
                <div class="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                    <div class="text-center mb-10">
                        <div class="w-20 h-20 bg-orange-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-lg">
                            🔐
                        </div>
                        <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">Painel Administrativo</h1>
                        <p class="text-gray-500 mt-2 font-medium">Acesso Restrito • Lanche da Si</p>
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="block text-xs font-bold uppercase tracking-widest text-gray-400">Senha de Acesso</label>
                            <input 
                                type="password" 
                                bind:value={password} 
                                placeholder="••••••••" 
                                class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:bg-white focus:outline-none transition-all text-center text-xl font-bold tracking-widest"
                                on:keydown={(e) => e.key === 'Enter' && login()}
                            />
                        </div>
                        
                        <button 
                            on:click={login}
                            class="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            Acessar Painel →
                        </button>
                        
                        {#if status.type === 'error'}
                            <div class="bg-red-50 text-red-500 py-3 rounded-xl text-center text-sm font-bold">
                                {status.message}
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {:else}
            <!-- Admin Dashboard -->
            <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 class="text-4xl font-black text-gray-900">Novo Produto</h1>
                    <p class="text-gray-500 font-medium">Gerencie seu cardápio em tempo real</p>
                </div>
                <button on:click={() => authenticated = false} class="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors">
                    Sair do Painel
                </button>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Form Column -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                            
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-gray-700">ID do Produto</label>
                                    <input bind:value={product.id} placeholder="ex: x-egg" class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all" required />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-gray-700">Categoria</label>
                                    <select bind:value={product.category} class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all">
                                        {#each categories as cat}
                                            <option value={cat.id}>{cat.label}</option>
                                        {/each}
                                    </select>
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-sm font-bold text-gray-700">Nome do Lanche</label>
                                <input bind:value={product.name} placeholder="Ex: X-Salada Especial" class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all" required />
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-gray-700">Preço (R$)</label>
                                    <input type="number" step="0.5" bind:value={product.price} placeholder="0.00" class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all" required />
                                </div>
                                <div class="space-y-2">
                                    <label class="text-sm font-bold text-gray-700">URL da Foto</label>
                                    <input bind:value={product.image} placeholder="https://link-da-imagem.jpg" class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-sm font-bold text-gray-700">Descrição/Ingredientes</label>
                                <textarea bind:value={product.description} placeholder="Pão, carne, queijo..." class="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-orange-500 focus:outline-none transition-all h-24 resize-none"></textarea>
                            </div>

                            <div class="flex gap-4">
                                <label class="flex-1 text-center py-3 rounded-2xl border-2 font-bold text-xs cursor-pointer transition-all {product.popular ? 'border-orange-500 bg-orange-50 text-orange-600' : 'border-gray-100 text-gray-400'}">
                                    <input type="checkbox" bind:checked={product.popular} class="hidden" />
                                    ⭐ DESTAQUE
                                </label>
                                <label class="flex-1 text-center py-3 rounded-2xl border-2 font-bold text-xs cursor-pointer transition-all {product.disponivel ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-100 text-gray-400'}">
                                    <input type="checkbox" bind:checked={product.disponivel} class="hidden" />
                                    ✅ DISPONÍVEL
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                class="w-full bg-orange-500 text-white font-black py-5 rounded-2xl shadow-lg hover:bg-orange-600 transition-all disabled:bg-gray-300 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Salvando...' : 'PUBLICAR NO CARDÁPIO'}
                            </button>

                            {#if status.message}
                                <div class="p-4 rounded-2xl text-center text-sm font-bold {status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}">
                                    {status.message}
                                </div>
                            {/if}
                        </form>
                    </div>
                </div>

                <!-- Preview Column -->
                <div class="space-y-6">
                    <h2 class="text-sm font-black uppercase tracking-widest text-gray-400">Prévia no Site</h2>
                    <div class="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden sticky top-8">
                        <div class="aspect-square bg-gray-100 flex items-center justify-center relative">
                            {#if product.image}
                                <img src={product.image} alt="Preview" class="w-full h-full object-cover" />
                            {:else}
                                <span class="text-gray-300 text-6xl">📸</span>
                            {/if}
                            {#if product.popular}
                                <span class="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-sm">Mais Pedido</span>
                            {/if}
                        </div>
                        <div class="p-6 space-y-3">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-xl text-gray-900 leading-tight">{product.name || 'Nome do Lanche'}</h3>
                                <span class="text-orange-600 font-black text-lg">R$ {product.price || '0,00'}</span>
                            </div>
                            <p class="text-gray-500 text-sm leading-relaxed">{product.description || 'A descrição aparecerá aqui...'}</p>
                            <div class="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <span class="text-[10px] font-black text-gray-300 uppercase tracking-widest">{categories.find(c => c.id === product.category)?.label.split(' ')[1]}</span>
                                <div class="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">🛒</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
