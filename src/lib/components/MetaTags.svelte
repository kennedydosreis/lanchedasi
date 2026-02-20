<script>
    import { page } from '$app/stores';
    import { base } from '$app/paths';

    export let title = 'Lanche da Si - Os melhores lanches da cidade';
    export let description = 'Faça seu pedido online de forma simples e rápida. Os melhores lanches da cidade com entrega rápida.';
    export let image = `${base}/logo-lanche-da-si.png`;
    export let type = 'website';

    const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://www.lanchedasi.com.br';

    $: canonicalUrl = new URL(base + $page.url.pathname, siteUrl).href;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="lanche, hamburger, delivery, comida, pedido online, lanchonete, Manaus" />
    <meta name="robots" content="index, follow" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Lanche da Si" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    <link rel="canonical" href={canonicalUrl} />

    {@html `
    <script type="application/ld+json">
    ${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Lanche da Si",
        "description": description,
        "image": image,
        "url": canonicalUrl,
        "telephone": "+5592993525884",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Itororó, Dom Pedro I",
            "addressLocality": "Manaus",
            "addressRegion": "AM",
            "addressCountry": "BR"
        },
        "servesCuisine": "Brasileira",
        "priceRange": "$$",
        "hasMenu": {
            "@type": "Menu",
            "name": "Menu Principal"
        }
    })}
    </script>
    `}
</svelte:head>
