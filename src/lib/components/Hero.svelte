<script>
    const whatsappNumber = '5592993525884';

    function openWhatsApp() {
        const message = encodeURIComponent('Olá! Gostaria de fazer um pedido no Lanche da Si. 🍔');
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
</script>

<section id="inicio" class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <div class="hero-badge">
            <i class="fas fa-fire"></i>
            <span>Aberto de Quarta a Domingo — 18h às 23h</span>
        </div>
        <h1 class="hero-title">
            Os melhores lanches de
            <span class="highlight">Manaus</span>
        </h1>
        <p class="hero-subtitle">
            Sabor irresistível com ingredientes frescos. Peça pelo WhatsApp e receba no conforto da sua casa!
        </p>
        <div class="hero-actions">
            <button class="btn-whatsapp" on:click={openWhatsApp}>
                <i class="fab fa-whatsapp"></i>
                Pedir pelo WhatsApp
            </button>
            <a href="#menu" class="btn-menu">
                <i class="fas fa-utensils"></i>
                Ver Cardápio
            </a>
        </div>
        <div class="hero-stats">
            <div class="stat">
                <span class="stat-icon">⭐</span>
                <div>
                    <strong>4.9</strong>
                    <span>Avaliação</span>
                </div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
                <span class="stat-icon">🏍️</span>
                <div>
                    <strong>~30min</strong>
                    <span>Entrega</span>
                </div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
                <span class="stat-icon">💰</span>
                <div>
                    <strong>R$18</strong>
                    <span>A partir de</span>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .hero {
        position: relative;
        min-height: 85vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 80px;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
        overflow: hidden;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -20%;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }

    .hero::after {
        content: '';
        position: absolute;
        bottom: -30%;
        left: -10%;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    }

    .hero-overlay {
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        pointer-events: none;
    }

    .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        max-width: 720px;
        padding: var(--spacing-8) var(--spacing-4);
    }

    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        background: rgba(245, 158, 11, 0.15);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: var(--secondary-color);
        padding: var(--spacing-2) var(--spacing-4);
        border-radius: 50px;
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-bottom: var(--spacing-6);
        animation: fadeInDown 0.6s ease;
    }

    .hero-title {
        font-size: 3.5rem;
        font-weight: 800;
        color: var(--white);
        line-height: 1.1;
        margin-bottom: var(--spacing-6);
        animation: fadeInUp 0.6s ease 0.1s both;
    }

    .highlight {
        background: linear-gradient(135deg, var(--secondary-color), #f97316);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-300);
        line-height: 1.7;
        margin-bottom: var(--spacing-8);
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
        animation: fadeInUp 0.6s ease 0.2s both;
    }

    .hero-actions {
        display: flex;
        gap: var(--spacing-4);
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: var(--spacing-10);
        animation: fadeInUp 0.6s ease 0.3s both;
    }

    .btn-whatsapp {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-3);
        background: var(--whatsapp-color);
        color: var(--white);
        border: none;
        padding: var(--spacing-4) var(--spacing-8);
        border-radius: 16px;
        font-size: var(--font-size-lg);
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    }

    .btn-whatsapp:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(37, 211, 102, 0.5);
    }

    .btn-whatsapp i {
        font-size: 1.4rem;
    }

    .btn-menu {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-3);
        background: transparent;
        color: var(--white);
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: var(--spacing-4) var(--spacing-8);
        border-radius: 16px;
        font-size: var(--font-size-lg);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .btn-menu:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-3px);
    }

    .hero-stats {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-6);
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        padding: var(--spacing-4) var(--spacing-8);
        animation: fadeInUp 0.6s ease 0.4s both;
    }

    .stat {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        color: var(--white);
    }

    .stat-icon {
        font-size: 1.5rem;
    }

    .stat div {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .stat strong {
        font-size: var(--font-size-lg);
        font-weight: 700;
    }

    .stat span {
        font-size: var(--font-size-xs);
        color: var(--gray-400);
    }

    .stat-divider {
        width: 1px;
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(24px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-16px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .hero {
            min-height: 80vh;
            padding-top: 70px;
        }

        .hero-title {
            font-size: 2.2rem;
        }

        .hero-subtitle {
            font-size: var(--font-size-base);
        }

        .btn-whatsapp,
        .btn-menu {
            width: 100%;
            justify-content: center;
            padding: var(--spacing-4) var(--spacing-6);
        }

        .hero-stats {
            flex-direction: column;
            gap: var(--spacing-3);
            padding: var(--spacing-4) var(--spacing-6);
        }

        .stat-divider {
            width: 80%;
            height: 1px;
        }
    }
</style>
