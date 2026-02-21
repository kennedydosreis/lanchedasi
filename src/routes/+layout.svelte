<script>
    import Header from '$lib/components/Header.svelte';
    import Cart from '$lib/components/Cart/Cart.svelte';
    import WhatsAppFloat from '$lib/components/WhatsAppFloat.svelte';
    import '../app.css';
</script>

<svelte:head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<Header />
<main>
    <slot />
</main>
<Cart />
<WhatsAppFloat />
