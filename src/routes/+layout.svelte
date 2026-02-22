<script>
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Cart from '$lib/components/Cart/Cart.svelte';
    import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
    import LoggerService from '$lib/services/LoggerService';
    import { onMount } from 'svelte';
    import '../app.css';

    onMount(() => {
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
</svelte:head>

<a href="#conteudo-principal" class="skip-link">Pular para o conteúdo principal</a>
<Header />
<main id="conteudo-principal" aria-label="Conteúdo principal">
    <slot />
</main>
<Footer />
<Cart />
<WhatsAppFloat />
