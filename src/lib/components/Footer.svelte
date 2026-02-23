<script>
    const whatsappNumber = '5511999999999'; // Número placeholder
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: 'fab fa-facebook', href: '#', label: 'Facebook' },
        { icon: 'fab fa-instagram', href: '#', label: 'Instagram' },
        { icon: 'fab fa-whatsapp', href: whatsappLink, label: 'WhatsApp' }
    ];

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cardapio', label: 'Cardápio' },
        { href: '/sobre', label: 'Sobre' },
        { href: '/contato', label: 'Contato' }
    ];
</script>

<footer class="footer">
    <div class="container">
        <div class="bento-footer">
            <!-- Card Principal: Marca -->
            <div class="footer-card brand-card">
                <h3 class="footer-title">Lanche da Si</h3>
                <p class="footer-description">
                    Tradição e sabor em cada lanche. Preparamos com carinho para você e sua família.
                </p>
                <div class="social-links">
                    {#each socialLinks as social}
                        <a 
                            href={social.href} 
                            class="social-link" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            aria-label={social.label}
                        >
                            <i class={social.icon}></i>
                        </a>
                    {/each}
                </div>
            </div>

            <!-- Card: Horário -->
            <div class="footer-card hours-card">
                <div class="card-icon"><i class="fas fa-clock"></i></div>
                <h4 class="card-title">Horários</h4>
                <div class="hours-info">
                    <p><strong>Quarta a Domingo</strong></p>
                    <p>18h às 23h</p>
                    <span class="closed-badge">Segunda e terça fechado</span>
                </div>
            </div>

            <!-- Card: CTA WhatsApp -->
            <div class="footer-card cta-card">
                <div class="card-icon"><i class="fab fa-whatsapp"></i></div>
                <h4 class="card-title">Peça Agora</h4>
                <p>Bateu a fome? Peça pelo WhatsApp e receba em casa.</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="cta-button">
                    Fazer Pedido
                </a>
            </div>

            <!-- Card: Navegação -->
            <div class="footer-card nav-card">
                <h4 class="card-title">Explorar</h4>
                <nav class="footer-nav">
                    {#each navLinks as link}
                        <a href={link.href} class="footer-link" data-sveltekit-preload-data>
                            {link.label}
                        </a>
                    {/each}
                </nav>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; {currentYear} Lanche da Si. Todos os direitos reservados.</p>
            <p class="made-with">
                Feito com <span class="heart">❤️</span> para você
            </p>
        </div>
    </div>
</footer>

<style>
    .footer {
        background: var(--gray-900);
        color: var(--gray-200);
        padding: var(--spacing-12) 0 var(--spacing-6) 0;
        margin-top: auto;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .bento-footer {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto auto;
        gap: var(--spacing-4);
        margin-bottom: var(--spacing-12);
    }

    .footer-card {
        background: var(--gray-800);
        border-radius: 24px;
        padding: var(--spacing-6);
        border: 1px solid var(--gray-700);
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .footer-card:hover {
        border-color: var(--primary-color);
        transform: translateY(-4px);
    }

    /* Layout do Grid */
    .brand-card {
        grid-column: span 2;
        grid-row: span 1;
        justify-content: center;
    }

    .hours-card {
        grid-column: span 1;
    }

    .cta-card {
        grid-column: span 1;
        grid-row: span 2;
        background: linear-gradient(135deg, var(--gray-800) 0%, #1e293b 100%);
        border: 1px solid var(--secondary-color);
        justify-content: space-between;
    }

    .nav-card {
        grid-column: span 3;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: var(--spacing-4) var(--spacing-8);
    }

    /* Elementos Internos */
    .footer-title {
        font-size: 2rem;
        font-weight: 800;
        color: var(--primary-color);
        margin-bottom: var(--spacing-2);
    }

    .footer-description {
        color: var(--gray-400);
        max-width: 400px;
    }

    .card-title {
        font-size: var(--font-size-lg);
        font-weight: 700;
        color: var(--white);
        margin-bottom: var(--spacing-4);
    }

    .card-icon {
        font-size: 1.5rem;
        color: var(--primary-color);
        margin-bottom: var(--spacing-4);
    }

    .social-links {
        display: flex;
        gap: var(--spacing-3);
        margin-top: var(--spacing-6);
    }

    .social-link {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: var(--gray-700);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.2rem;
        transition: all 0.3s ease;
    }

    .social-link:hover {
        background: var(--primary-color);
        color: var(--gray-900);
    }

    .hours-info p {
        margin: 0;
        line-height: 1.4;
    }

    .closed-badge {
        display: inline-block;
        margin-top: var(--spacing-4);
        padding: 4px 12px;
        background: rgba(239, 68, 68, 0.1);
        color: #f87171;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
    }

    .cta-button {
        display: block;
        width: 100%;
        padding: var(--spacing-4);
        background: var(--secondary-color);
        color: white;
        text-align: center;
        text-decoration: none;
        border-radius: 16px;
        font-weight: 700;
        margin-top: var(--spacing-4);
        transition: all 0.3s ease;
    }

    .cta-button:hover {
        background: #d97706;
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
    }

    .footer-nav {
        display: flex;
        gap: var(--spacing-8);
    }

    .footer-link {
        color: var(--gray-400);
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s;
    }

    .footer-link:hover {
        color: var(--primary-color);
    }

    .footer-bottom {
        border-top: 1px solid var(--gray-800);
        padding-top: var(--spacing-8);
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--gray-500);
        font-size: var(--font-size-sm);
    }

    .heart {
        color: var(--danger-color);
        display: inline-block;
        animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    /* Mobile First Adjustments */
    @media (max-width: 1024px) {
        .bento-footer {
            grid-template-columns: repeat(2, 1fr);
        }
        .nav-card {
            grid-column: span 2;
        }
    }

    @media (max-width: 640px) {
        .bento-footer {
            grid-template-columns: 1fr;
        }
        .brand-card, .hours-card, .cta-card, .nav-card {
            grid-column: span 1;
            grid-row: span 1;
        }
        .nav-card {
            flex-direction: column;
            gap: var(--spacing-4);
        }
        .footer-nav {
            flex-direction: column;
            gap: var(--spacing-2);
            align-items: center;
        }
        .footer-bottom {
            flex-direction: column;
            gap: var(--spacing-4);
            text-align: center;
        }
    }
</style>
