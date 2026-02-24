!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "75cdee25-aa00-4b18-bc55-33648ce4e463", e._sentryDebugIdIdentifier = "sentry-dbid-75cdee25-aa00-4b18-bc55-33648ce4e463");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, a as subscribe, b as add_attribute, d as escape } from "./ssr.js";
import { p as page } from "./stores.js";
import { b as base } from "./paths.js";
const MetaTags = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let canonicalUrl;
  let structuredData;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { title = "Lanche da Si - Os melhores lanches de Manaus | Delivery" } = $$props;
  let { description = "Lanchonete em Manaus com delivery. Hambúrgueres, kikões, yakisoba, porções e mais. Peça pelo WhatsApp! Aberto de quarta a domingo, 18h às 23h." } = $$props;
  let { image = `${base}/logo-lanche-da-si.png` } = $$props;
  let { type = "website" } = $$props;
  const siteUrl = "https://www.lanchedasi.com.br";
  function getStructuredData(data) {
    const structuredData2 = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Lanche da Si",
      description,
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
    return structuredData2;
  }
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  canonicalUrl = new URL(base + $page.url.pathname, siteUrl).href;
  structuredData = getStructuredData();
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-abv99y_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><meta name="keywords" content="lanche Manaus, hamburger delivery Manaus, lanchonete Manaus, kikão, yakisoba Manaus, pedido online, Lanche da Si, x-salada, batata frita, Alvorada Manaus"><meta name="robots" content="index, follow"><meta name="author" content="Lanche da Si"><meta name="geo.region" content="BR-AM"><meta name="geo.placename" content="Manaus"><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:description"${add_attribute("content", description, 0)}><meta property="og:image"${add_attribute("content", `${siteUrl}/logo-lanche-da-si.png`, 0)}><meta property="og:url"${add_attribute("content", canonicalUrl, 0)}><meta property="og:type"${add_attribute("content", type, 0)}><meta property="og:site_name" content="Lanche da Si"><meta property="og:locale" content="pt_BR"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", title, 0)}><meta name="twitter:description"${add_attribute("content", description, 0)}><meta name="twitter:image"${add_attribute("content", `${siteUrl}/logo-lanche-da-si.png`, 0)}><link rel="canonical"${add_attribute("href", canonicalUrl, 0)}><!-- HTML_TAG_START -->${`<script type="application/ld+json">${JSON.stringify(structuredData)}<\/script>`}<!-- HTML_TAG_END --><!-- HEAD_svelte-abv99y_END -->`, ""}`;
});
export {
  MetaTags as M
};
