<script>
    import { onMount } from 'svelte';
    import { GitHubService } from '../../lib/services/GitHubService';

    let password = '';
    let githubToken = '';
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

    async function handleSubmit() {
        if (!product.id || !product.name || !product.price) {
            showStatus('error', 'Preencha os campos obrigatórios.');
            return;
        }
        if (!githubToken) {
            showStatus('error', 'Insira o GitHub Token para publicar.');
            return;
        }

        loading = true;
        showStatus('info', 'Publicando no GitHub...');

        const success = await GitHubService.updateMenu(product, githubToken);
        
        if (success) {
            showStatus('success', '✅ Publicado com sucesso! O site atualizará em breve.');
            resetForm();
        } else {
            showStatus('error', '❌ Falha ao publicar. Verifique o seu Token.');
        }
        loading = false;
    }
</script>

<div style="min-height: 100vh; background-color: #f8fafc; font-family: sans-serif; padding: 40px 20px; color: #1e293b;">
    <div style="max-width: 1000px; margin: 0 auto;">
        
        {#if !authenticated}
            <div style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
                <div style="background: white; padding: 40px; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); text-align: center; width: 100%; max-width: 400px; border: 1px solid #f1f5f9;">
                    <div style="font-size: 48px; margin-bottom: 20px;">🔐</div>
                    <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px; color: #0f172a;">Painel do Dono</h1>
                    <p style="color: #64748b; margin-bottom: 32px; font-size: 14px;">Lanche da Si • Gestão</p>

                    <div style="text-align: left; margin-bottom: 24px;">
                        <label style="display: block; font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; margin-bottom: 8px; text-transform: uppercase;">Senha de Acesso</label>
                        <input 
                            type="password" 
                            bind:value={password} 
                            placeholder="••••••••" 
                            style="width: 100%; padding: 18px; background: #f1f5f9; border: 2px solid transparent; border-radius: 20px; font-size: 20px; font-weight: 700; text-align: center; outline: none;"
                            on:keydown={(e) => e.key === 'Enter' && login()}
                        />
                    </div>
                    
                    <button 
                        style="width: 100%; background: #0f172a; color: white; border: none; padding: 20px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px;"
                        on:click={login}
                    >
                        ENTRAR NO PAINEL
                    </button>
                    
                    {#if status.type === 'error'}
                        <div style="margin-top: 20px; color: #ef4444; font-weight: 700; font-size: 14px;">
                            ⚠️ {status.message}
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <header style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;">
                <div>
                    <h1 style="font-size: 36px; font-weight: 900; color: #0f172a; margin: 0;">Gestão de Cardápio</h1>
                    <p style="color: #64748b; margin: 4px 0 0 0;">Adicione itens em tempo real (Custo Zero)</p>
                </div>
                <div style="text-align: right;">
                    <button style="background: none; border: none; color: #94a3b8; font-weight: 700; cursor: pointer; margin-bottom: 8px; display: block; width: 100%;" on:click={() => authenticated = false}>Sair</button>
                    <input type="password" bind:value={githubToken} placeholder="GitHub Token" style="padding: 8px 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 11px; width: 150px;" />
                </div>
            </header>

            <div style="display: grid; grid-template-columns: 1fr 340px; gap: 40px;">
                <div class="form-side">
                    <form on:submit|preventDefault={handleSubmit} style="background: white; padding: 32px; border-radius: 32px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 13px; font-weight: 700; color: #475569;">ID do Produto</label>
                                <input bind:value={product.id} placeholder="ex: x-egg" style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;" required />
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 13px; font-weight: 700; color: #475569;">Categoria</label>
                                <select bind:value={product.category} style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;">
                                    {#each categories as cat}
                                        <option value={cat.id}>{cat.label}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                            <label style="font-size: 13px; font-weight: 700; color: #475569;">Nome Público</label>
                            <input bind:value={product.name} placeholder="Ex: X-Salada Especial" style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;" required />
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 13px; font-weight: 700; color: #475569;">Preço (R$)</label>
                                <input type="number" step="0.5" bind:value={product.price} placeholder="0.00" style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;" required />
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 8px;">
                                <label style="font-size: 13px; font-weight: 700; color: #475569;">URL da Foto</label>
                                <input bind:value={product.image} placeholder="https://..." style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;" />
                            </div>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px;">
                            <label style="font-size: 13px; font-weight: 700; color: #475569;">Descrição</label>
                            <textarea bind:value={product.description} placeholder="Ingredientes..." style="padding: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; height: 80px; resize: none;"></textarea>
                        </div>

                        <div style="display: flex; gap: 12px; margin-bottom: 30px;">
                            <label style="flex: 1; text-align: center; padding: 14px; border: 2px solid #f1f5f9; border-radius: 14px; font-size: 11px; font-weight: 800; cursor: pointer; {product.popular ? 'border-color: #f59e0b; color: #f59e0b; background: #fffbeb;' : 'color: #94a3b8;'}">
                                <input type="checkbox" bind:checked={product.popular} style="display: none;" />
                                ⭐ DESTAQUE
                            </label>
                            <label style="flex: 1; text-align: center; padding: 14px; border: 2px solid #f1f5f9; border-radius: 14px; font-size: 11px; font-weight: 800; cursor: pointer; {product.disponivel ? 'border-color: #10b981; color: #10b981; background: #f0fdf4;' : 'color: #94a3b8;'}">
                                <input type="checkbox" bind:checked={product.disponivel} style="display: none;" />
                                ✅ DISPONÍVEL
                            </label>
                        </div>

                        <button type="submit" style="width: 100%; background: #f59e0b; color: white; border: none; padding: 20px; border-radius: 20px; font-weight: 900; cursor: pointer; font-size: 16px;" disabled={loading}>
                            {loading ? 'SALVANDO...' : 'PUBLICAR NO CARDÁPIO'}
                        </button>

                        {#if status.message}
                            <div style="margin-top: 20px; padding: 16px; border-radius: 16px; text-align: center; font-weight: 700; font-size: 14px; {status.type === 'success' ? 'background: #f0fdf4; color: #16a34a;' : status.type === 'error' ? 'background: #fef2f2; color: #dc2626;' : 'background: #eff6ff; color: #2563eb;'}">
                                {status.message}
                            </div>
                        {/if}
                    </form>
                </div>

                <div class="preview-side">
                    <h2 style="font-size: 11px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; margin-bottom: 16px; text-transform: uppercase;">Prévia no Site</h2>
                    <div style="background: white; border-radius: 32px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); position: sticky; top: 40px;">
                        <div style="aspect-ratio: 1/1; background: #f1f5f9; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
                            {#if product.image}
                                <img src={product.image} alt="Preview" style="width: 100%; height: 100%; object-fit: cover;" />
                            {:else}
                                <span style="font-size: 60px;">📸</span>
                            {/if}
                            {#if product.popular}
                                <span style="absolute; top: 16px; left: 16px; background: #facc15; color: #854d0e; padding: 6px 12px; border-radius: 100px; font-size: 10px; font-weight: 900; text-transform: uppercase;">Mais Pedido</span>
                            {/if}
                        </div>
                        <div style="padding: 24px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                                <h3 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0;">{product.name || 'Nome do Lanche'}</h3>
                                <span style="font-weight: 900; color: #f59e0b; font-size: 20px;">R$ {product.price || '0,00'}</span>
                            </div>
                            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0;">{product.description || 'A descrição aparecerá aqui...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
