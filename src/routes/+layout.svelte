<script>
    import Header from '$lib/components/Header.svelte';
    import Cart from '$lib/components/Cart/Cart.svelte';
    import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
    import '../app.css';
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
<main id="conteudo-principal" role="main" aria-label="Conteúdo principal">
    <slot />
</main>
<Cart />
<WhatsAppFloat />
