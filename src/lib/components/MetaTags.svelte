<script>
    export let title = 'Lanche da Si - Os melhores lanches da cidade';
    export let description = 'Faça seu pedido online de forma simples e rápida. Os melhores lanches da cidade com entrega rápida.';
    export let image = '/logo-lanche-da-si.png';
    export let url = '';
    export let type = 'website';
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="lanche, hamburger, delivery, comida, pedido online, lanchonete" />
    <meta name="robots" content="index, follow" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Lanche da Si" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <link rel="canonical" href={url} />

    {@html `
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Lanche da Si",
        "description": "${description}",
        "image": "${image}",
        "url": "${url}",
        "telephone": "",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR"
        },
        "servesCuisine": "Brasileira",
        "priceRange": "$$",
        "hasMenu": {
            "@type": "Menu",
            "name": "Menu Principal"
        }
    }
    </script>
    `}
</svelte:head>
