<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Cart from '$lib/components/Cart/Cart.svelte';
    import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
    import LoggerService from '$lib/services/LoggerService';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { cart } from '$lib/stores/cart';
    import '../app.css';

    onMount(() => {
        cart.init();
        
        // Glow Tracker: Global CSS variables for cursor tracking
        const handleMouseMove = (e) => {
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        window.onerror = (message, source, lineno, colno, error) => {
            LoggerService.error('Global Client Error', {
                message,
                source,
                lineno,
                colno,
                error: error?.stack
            });
            return false;
        };

        window.onunhandledrejection = (event) => {
            LoggerService.error('Unhandled Promise Rejection', {
                reason: event.reason
            });
        };

        LoggerService.info('App layout mounted successfully');
    });

    // SEO Structured Data (JSON-LD)
    $: structuredData = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Lanche da Si",
        "image": "https://www.lanchedasi.com.br/assets/logo.png",
        "@id": "https://www.lanchedasi.com.br",
        "url": "https://www.lanchedasi.com.br",
        "telephone": "+5592984570146",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua das Lanchonetes, 123",
            "addressLocality": "Manaus",
            "addressRegion": "AM",
            "postalCode": "69000-000",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -3.1190275,
            "longitude": -60.0217314
        },
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
            ],
            "opens": "18:00",
            "closes": "23:59"
        },
        "servesCuisine": "Fast Food, Brazilian",
        "priceRange": "$$"
    };
</script>

<svelte:head>
    <!-- Preconnect to font origins -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" media="print" onload="this.media='all'" />
    <noscript><link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" /></noscript>

    <!-- Inter font with display=swap for fast text rendering -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

    <!-- SEO JSON-LD -->
    {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>

<a href="#conteudo-principal" class="skip-link">Pular para o conteúdo principal</a>
<Header />
<main id="conteudo-principal" aria-label="Conteúdo principal">
    <slot />
</main>
<Footer />
<Cart />
<WhatsAppFloat />
