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
        <div class="footer-grid">
            <div class="footer-section">
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

            <div class="footer-section">
                <h4 class="footer-subtitle">Navegação</h4>
                <nav class="footer-nav">
                    {#each navLinks as link}
                        <a href={link.href} class="footer-link" data-sveltekit-preload-data>
                            {link.label}
                        </a>
                    {/each}
                </nav>
            </div>

            <div class="footer-section">
                <h4 class="footer-subtitle">Horário de Funcionamento</h4>
                <div class="hours">
                    <p><strong>Quarta a Domingo</strong></p>
                    <p>18h às 23h</p>
                    <p class="closed">Segunda e terça: fechado</p>
                </div>
            </div>

            <div class="footer-section">
                <h4 class="footer-subtitle">Entre em Contato</h4>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="whatsapp-link">
                    <i class="fab fa-whatsapp"></i>
                    <span>Faça seu pedido</span>
                </a>
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
        background: linear-gradient(180deg, var(--gray-800), var(--gray-900));
        color: var(--gray-200);
        padding: var(--spacing-12) 0 var(--spacing-6) 0;
        margin-top: auto;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .footer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--spacing-8);
        margin-bottom: var(--spacing-8);
    }

    .footer-section {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-4);
    }

    .footer-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--primary-color);
        margin-bottom: var(--spacing-2);
    }

    .footer-subtitle {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--white);
        margin-bottom: var(--spacing-2);
    }

    .footer-description {
        line-height: 1.6;
        color: var(--gray-400);
    }

    .social-links {
        display: flex;
        gap: var(--spacing-4);
        margin-top: var(--spacing-2);
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--gray-700);
        color: var(--white);
        font-size: var(--font-size-lg);
        transition: all 0.3s ease;
        text-decoration: none;
    }

    .social-link:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }

    .footer-nav {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
    }

    .footer-link {
        color: var(--gray-400);
        text-decoration: none;
        transition: all 0.3s ease;
        padding: var(--spacing-1) 0;
    }

    .footer-link:hover {
        color: var(--primary-color);
        padding-left: var(--spacing-2);
    }

    .hours p {
        line-height: 1.8;
        color: var(--gray-400);
    }

    .hours .closed {
        color: var(--gray-500);
        font-style: italic;
        font-size: var(--font-size-sm);
    }

    .whatsapp-link {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        background: var(--whatsapp-color);
        color: white;
        padding: var(--spacing-3) var(--spacing-6);
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        align-self: flex-start;
    }

    .whatsapp-link:hover {
        background: #20b358;
        transform: translateY(-2px);
    }

    .whatsapp-link i {
        font-size: var(--font-size-xl);
    }

    .footer-bottom {
        border-top: 1px solid var(--gray-700);
        padding-top: var(--spacing-6);
        text-align: center;
        color: var(--gray-500);
    }

    .footer-bottom p {
        margin: var(--spacing-2) 0;
        font-size: var(--font-size-sm);
    }

    .made-with {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-1);
    }

    .heart {
        color: var(--danger-color);
        animation: heartbeat 1.5s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }

    @media (max-width: 768px) {
        .footer {
            padding: var(--spacing-8) 0 var(--spacing-4) 0;
        }

        .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
        }

        .footer-section {
            text-align: center;
        }

        .social-links {
            justify-content: center;
        }

        .footer-nav {
            align-items: center;
        }

        .footer-link:hover {
            padding-left: 0;
        }

        .whatsapp-link {
            align-self: center;
        }
    }
</style>
