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

<div class="admin-view">
    <div class="container">
        {#if !authenticated}
            <div class="login-wrapper">
                <div class="login-card">
                    <div class="lock-icon">🔐</div>
                    <h1>Acesso Restrito</h1>
                    <p>Lanche da Si • Gestão</p>

                    <div class="input-group">
                        <label>SENHA DO PROPRIETÁRIO</label>
                        <input type="password" bind:value={password} placeholder="••••••••" on:keydown={(e) => e.key === 'Enter' && login()} />
                    </div>
                    
                    <button class="btn-primary" on:click={login}>ENTRAR NO PAINEL</button>
                    
                    {#if status.type === 'error'}
                        <div class="error-msg">{status.message}</div>
                    {/if}
                </div>
            </div>
        {:else}
            <header class="admin-header">
                <div>
                    <h1>Novo Produto</h1>
                    <p>Adicione itens ao cardápio</p>
                </div>
                <button class="logout-btn" on:click={() => authenticated = false}>Sair</button>
            </header>

            <div class="admin-grid">
                <div class="form-side">
                    <form on:submit|preventDefault={handleSubmit} class="card">
                        <div class="row">
                            <div class="field">
                                <label>ID do Produto</label>
                                <input bind:value={product.id} placeholder="ex: x-egg" required />
                            </div>
                            <div class="field">
                                <label>Categoria</label>
                                <select bind:value={product.category}>
                                    {#each categories as cat}
                                        <option value={cat.id}>{cat.label}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label>Nome do Lanche</label>
                            <input bind:value={product.name} placeholder="Ex: X-Salada Especial" required />
                        </div>

                        <div class="row">
                            <div class="field">
                                <label>Preço (R$)</label>
                                <input type="number" step="0.5" bind:value={product.price} placeholder="0.00" required />
                            </div>
                            <div class="field">
                                <label>URL da Foto</label>
                                <input bind:value={product.image} placeholder="https://..." />
                            </div>
                        </div>

                        <div class="field">
                            <label>Descrição</label>
                            <textarea bind:value={product.description} placeholder="Pão, carne, queijo..."></textarea>
                        </div>

                        <div class="toggles">
                            <label class="toggle {product.popular ? 'active' : ''}">
                                <input type="checkbox" bind:checked={product.popular} />
                                ⭐ DESTAQUE
                            </label>
                            <label class="toggle {product.disponivel ? 'active' : ''}">
                                <input type="checkbox" bind:checked={product.disponivel} />
                                ✅ DISPONÍVEL
                            </label>
                        </div>

                        <button type="submit" class="btn-submit" disabled={loading}>
                            {loading ? 'SALVANDO...' : 'PUBLICAR NO CARDÁPIO'}
                        </button>

                        {#if status.message}
                            <div class="status-box {status.type}">{status.message}</div>
                        {/if}
                    </form>
                </div>

                <div class="preview-side">
                    <h2>Prévia no Site</h2>
                    <div class="product-preview">
                        <div class="img-box">
                            {#if product.image}
                                <img src={product.image} alt="Preview" />
                            {:else}
                                <span class="placeholder">📸</span>
                            {if product.popular}
                                <span class="badge">Mais Pedido</span>
                            {/if}
                        </div>
                        <div class="info-box">
                            <div class="name-row">
                                <h3>{product.name || 'Nome do Lanche'}</h3>
                                <span class="price">R$ {product.price || '0,00'}</span>
                            </div>
                            <p>{product.description || 'A descrição aparecerá aqui...'}</p>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .admin-view {
        min-height: 100vh;
        background: #f8fafc;
        font-family: 'Inter', sans-serif;
        padding: 40px 0;
    }
    .container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 20px;
    }
    .login-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 60vh;
    }
    .login-card {
        background: white;
        padding: 40px;
        border-radius: 32px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.05);
        text-align: center;
        width: 100%;
        max-width: 400px;
    }
    .lock-icon { font-size: 40px; margin-bottom: 20px; }
    .login-card h1 { font-size: 24px; color: #1e293b; margin-bottom: 8px; font-weight: 800; }
    .login-card p { color: #64748b; margin-bottom: 32px; font-size: 14px; }
    
    .input-group { text-align: left; margin-bottom: 24px; }
    .input-group label { display: block; font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; margin-bottom: 8px; margin-left: 4px; }
    .input-group input { 
        width: 100%; padding: 16px; background: #f1f5f9; border: 2px solid transparent; 
        border-radius: 16px; font-size: 18px; font-weight: 700; text-align: center;
        transition: 0.2s;
    }
    .input-group input:focus { border-color: #f59e0b; background: white; outline: none; }
    
    .btn-primary {
        width: 100%; background: #0f172a; color: white; border: none; padding: 18px;
        border-radius: 16px; font-weight: 800; cursor: pointer; transition: 0.2s;
    }
    .btn-primary:hover { background: black; transform: translateY(-2px); }
    
    .admin-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
    .admin-header h1 { font-size: 32px; font-weight: 900; color: #0f172a; }
    .admin-header p { color: #64748b; }
    .logout-btn { background: none; border: none; color: #94a3b8; font-weight: 700; cursor: pointer; }
    .logout-btn:hover { color: #ef4444; }

    .admin-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; }
    @media (max-width: 800px) { .admin-grid { grid-template-columns: 1fr; } }

    .card { background: white; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .field { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
    .field label { font-size: 13px; font-weight: 700; color: #475569; }
    .field input, .field select, .field textarea {
        padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;
        font-size: 15px; transition: 0.2s;
    }
    .field input:focus { border-color: #f59e0b; background: white; outline: none; }
    .field textarea { height: 100px; }

    .toggles { display: flex; gap: 12px; margin-bottom: 30px; }
    .toggle { 
        flex: 1; text-align: center; padding: 12px; border: 2px solid #f1f5f9; 
        border-radius: 12px; font-size: 11px; font-weight: 800; color: #94a3b8;
        cursor: pointer; transition: 0.2s;
    }
    .toggle input { display: none; }
    .toggle.active { border-color: #f59e0b; color: #f59e0b; background: #fffbeb; }

    .btn-submit {
        width: 100%; background: #f59e0b; color: white; border: none; padding: 18px;
        border-radius: 16px; font-weight: 900; cursor: pointer; transition: 0.2s;
    }
    .btn-submit:hover { background: #d97706; box-shadow: 0 10px 20px rgba(245,158,11,0.2); }
    .btn-submit:disabled { background: #cbd5e1; cursor: not-allowed; }

    .preview-side h2 { font-size: 12px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; margin-bottom: 16px; }
    .product-preview { background: white; border-radius: 24px; overflow: hidden; border: 1px solid #e2e8f0; position: sticky; top: 40px; }
    .img-box { aspect-ratio: 1; background: #f1f5f9; display: flex; align-items: center; justify-content: center; position: relative; }
    .img-box img { width: 100%; height: 100%; object-cover: cover; }
    .placeholder { font-size: 48px; }
    .badge { position: absolute; top: 12px; left: 12px; background: #facc15; color: #854d0e; padding: 4px 10px; border-radius: 100px; font-size: 10px; font-weight: 900; }
    
    .info-box { padding: 20px; }
    .name-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .name-row h3 { font-size: 18px; font-weight: 800; color: #1e293b; }
    .price { font-weight: 900; color: #f59e0b; font-size: 18px; }
    .info-box p { color: #64748b; font-size: 14px; line-height: 1.5; }

    .status-box { margin-top: 20px; padding: 12px; border-radius: 12px; text-align: center; font-weight: 700; font-size: 14px; }
    .status-box.success { background: #f0fdf4; color: #16a34a; }
    .status-box.error { background: #fef2f2; color: #dc2626; }
    .status-box.info { background: #eff6ff; color: #2563eb; }
</style>
