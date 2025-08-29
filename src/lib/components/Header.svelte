<script>
    import { assets } from '$app/paths';
    
    /** @type {HTMLDivElement} */
    let scrollIndicator;
    let isMobileMenuOpen = false;

    function updateScrollIndicator() {
        if (scrollIndicator) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            scrollIndicator.style.width = Math.min(scrollPercent, 100) + '%';
        }
    }

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }

    // Adicionar event listener quando o componente for montado
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', updateScrollIndicator);
    }

    const navItems = [
        { href: '#populares', icon: 'fas fa-fire', label: 'Populares' },
        { href: '#combos', icon: 'fas fa-hamburger', label: 'Combos' },
        { href: '#sanduiches', icon: 'fas fa-bread-slice', label: 'Sanduíches' },
        { href: '#kikao', icon: 'fas fa-hotdog', label: 'Kikões' },
        { href: '#porcoes', icon: 'fas fa-drumstick-bite', label: 'Porções' },
        { href: '#pratos', icon: 'fas fa-utensils', label: 'Pratos' },
        { href: '#bebidas', icon: 'fas fa-wine-glass', label: 'Bebidas' },
        { href: '#contato', icon: 'fas fa-phone', label: 'Contato' }
    ];
</script>

<div class="scroll-indicator" bind:this={scrollIndicator}></div>

<header class="header">
    <div class="container">
        <nav class="nav">
            <div class="nav-brand">
                <a href="#inicio" class="brand-logo-link">
                    <img
                        src="{assets}/logo-lanche-da-si.png"
                        alt="Logo Lanche da Si"
                        class="brand-logo"
                        on:error={(e) => {
                            if (e.target instanceof HTMLImageElement) {
                                e.target.src = `${assets}/logo.svg`;
                            }
                        }}
                    />
                    <span class="brand-text">Lanche da Si</span>
                </a>
            </div>

            <div class="nav-links" class:active={isMobileMenuOpen}>
                {#each navItems as item}
                    <a href={item.href} class="nav-link" on:click={closeMobileMenu}>
                        <i class={item.icon}></i>
                        <span>{item.label}</span>
                    </a>
                {/each}
            </div>

            <button
                class="nav-mobile-toggle"
                class:active={isMobileMenuOpen}
                on:click={toggleMobileMenu}
                aria-label="Toggle menu"
            >
                <i class="fas {isMobileMenuOpen ? 'fa-times' : 'fa-bars'}"></i>
            </button>
        </nav>
    </div>
</header>

<style>
    .scroll-indicator {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        transition: width 0.3s ease;
    }

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--gray-200);
        z-index: 1000;
        padding: var(--spacing-3) 0;
        transition: all 0.3s ease;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-brand {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--secondary-color);
    }

    .brand-logo {
        width: 40px;
        height: 40px;
        object-fit: contain;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .brand-logo-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        transition: transform 0.3s ease;
        cursor: pointer;
        text-decoration: none;
        color: inherit;
    }

    .brand-logo-link:hover .brand-logo {
        transform: scale(1.1);
        filter: brightness(1.1);
    }

    .brand-logo-link:hover {
        transform: translateY(-2px);
    }

    .brand-logo-link .brand-text {
        color: var(--secondary-color);
        transition: color 0.3s ease;
    }

    .brand-logo-link:hover .brand-text {
        color: var(--primary-color);
    }

    .nav-links {
        display: flex;
        gap: var(--spacing-6);
        align-items: center;
    }

    .nav-link {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        text-decoration: none;
        color: var(--gray-700);
        font-weight: 500;
        font-size: var(--font-size-sm);
        transition: all 0.3s ease;
        padding: var(--spacing-2) var(--spacing-3);
        border-radius: 8px;
        white-space: nowrap;
    }

    .nav-link:hover {
        color: var(--secondary-color);
        background: var(--gray-50);
        transform: translateY(-1px);
    }

    .nav-link i {
        font-size: var(--font-size-base);
    }

    .nav-mobile-toggle {
        display: none;
        background: none;
        border: none;
        font-size: var(--font-size-xl);
        color: var(--gray-700);
        cursor: pointer;
        padding: var(--spacing-2);
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .nav-mobile-toggle:hover {
        background: var(--gray-50);
        color: var(--secondary-color);
    }

    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            flex-direction: column;
            gap: 0;
            padding: var(--spacing-4);
            border-top: 1px solid var(--gray-200);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .nav-links.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }

        .nav-link {
            width: 100%;
            padding: var(--spacing-3) var(--spacing-4);
            border-radius: 0;
            border-bottom: 1px solid var(--gray-100);
        }

        .nav-link:last-child {
            border-bottom: none;
        }

        .nav-mobile-toggle {
            display: block;
        }

        .header {
            padding: var(--spacing-2) 0;
        }

        .nav-brand {
            font-size: var(--font-size-lg);
        }

        .brand-text {
            display: none;
        }
    }

    :global(:root) {
        --primary-color: #ffedc5;
        --primary-hover: #ffd980;
        --secondary-color: #f59e0b;
        --accent-color: #10b981;
        --danger-color: #ef4444;
        --whatsapp-color: #25d366;
        --white: #ffffff;
        --gray-50: #f9fafb;
        --gray-100: #f3f4f6;
        --gray-200: #e5e7eb;
        --gray-300: #d1d5db;
        --gray-400: #9ca3af;
        --gray-500: #6b7280;
        --gray-600: #4b5563;
        --gray-700: #374151;
        --gray-800: #1f2937;
        --gray-900: #111827;
        --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        --font-size-xs: 0.75rem;
        --font-size-sm: 0.875rem;
        --font-size-base: 1rem;
        --font-size-lg: 1.125rem;
        --font-size-xl: 1.25rem;
        --font-size-2xl: 1.5rem;
        --font-size-3xl: 1.875rem;
        --font-size-4xl: 2.25rem;
        --spacing-1: 0.25rem;
        --spacing-2: 0.5rem;
        --spacing-3: 0.75rem;
        --spacing-4: 1rem;
        --spacing-5: 1.25rem;
        --spacing-6: 1.5rem;
        --spacing-8: 2rem;
        --spacing-10: 2.5rem;
        --spacing-12: 3rem;
    }
</style>
