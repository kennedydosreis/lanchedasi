<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import { loadMenuData } from '$lib/utils/loadMenu.js';

    export let title = 'Lanche da Si - Os melhores lanches de Manaus | Delivery';
    export let description = 'Lanchonete em Manaus com delivery. Hambúrgueres, kikões, yakisoba, porções e mais. Peça pelo WhatsApp! Aberto de quarta a domingo, 18h às 23h.';
    export let image = `${base}/logo-lanche-da-si.png`;
    export let type = 'website';

    const siteUrl = import.meta.env.PUBLIC_SITE_URL || 'https://www.lanchedasi.com.br';

    let menuData = null;

    $: canonicalUrl = new URL(base + $page.url.pathname, siteUrl).href;

    // Build menu sections for structured data
    function buildMenuSections(data) {
        if (!data) return [];

        const sections = [
            { key: 'combos', name: 'Combos Especiais' },
            { key: 'sanduiches', name: 'Sanduíches' },
            { key: 'kikao', name: 'Kikões' },
            { key: 'porcoes', name: 'Porções & Salgados' },
            { key: 'pratos', name: 'Pratos Principais' },
            { key: 'bebidas', name: 'Bebidas' }
        ];

        return sections
            .filter(s => data[s.key]?.length)
            .map(s => ({
                "@type": "MenuSection",
                "name": s.name,
                "hasMenuItem": data[s.key].map(item => ({
                    "@type": "MenuItem",
                    "name": item.name,
                    "description": item.description,
                    "offers": {
                        "@type": "Offer",
                        "price": item.price.toFixed(2),
                        "priceCurrency": "BRL"
                    }
                }))
            }));
    }

    function getStructuredData(data) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Lanche da Si",
            "description": description,
            "image": `${siteUrl}/logo-lanche-da-si.png`,
            "url": siteUrl,
            "telephone": "+5592993525884",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rua Itororo, 22, Beco Esperança - Alvorada",
                "addressLocality": "Manaus",
                "addressRegion": "AM",
                "postalCode": "69042-040",
                "addressCountry": "BR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -3.0863,
                "longitude": -59.9819
            },
            "servesCuisine": ["Brasileira", "Lanches", "Fast Food"],
            "priceRange": "$",
            "currenciesAccepted": "BRL",
            "paymentAccepted": "Dinheiro, PIX",
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "18:00",
                    "closes": "23:00"
                }
            ]
        };

        // Add menu if data is loaded
        if (data) {
            structuredData.hasMenu = {
                "@type": "Menu",
                "name": "Cardápio Lanche da Si",
                "hasMenuSection": buildMenuSections(data)
            };
        }

        return structuredData;
    }

    onMount(async () => {
        try {
            menuData = await loadMenuData();
        } catch (err) {
            console.error('Error loading menu for structured data:', err);
        }
    });

    $: structuredData = getStructuredData(menuData);
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="lanche Manaus, hamburger delivery Manaus, lanchonete Manaus, kikão, yakisoba Manaus, pedido online, Lanche da Si, x-salada, batata frita, Alvorada Manaus" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Lanche da Si" />
    <meta name="geo.region" content="BR-AM" />
    <meta name="geo.placename" content="Manaus" />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}/logo-lanche-da-si.png`} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Lanche da Si" />
    <meta property="og:locale" content="pt_BR" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={`${siteUrl}/logo-lanche-da-si.png`} />

    <link rel="canonical" href={canonicalUrl} />

    {@html `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`}
</svelte:head>
