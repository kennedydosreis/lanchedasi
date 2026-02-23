<script>
    export let src;
    export let alt;
    export let className = "";
    
    // Configuração do Proxy Gratuito (ImageKit)
    // Exemplo: https://ik.imagekit.io/seu_id/tr:w-400,h-400,f-auto/URL_DA_IMAGEM
    const PROXY_BASE = "https://ik.imagekit.io/demo/tr:w-600,f-auto"; 
    
    let loaded = false;
    let error = false;

    $: processedSrc = src ? `${PROXY_BASE}/${src}` : null;
</script>

<div class="relative overflow-hidden bg-gray-100 {className}" style="aspect-ratio: 1/1;">
    {#if !loaded && !error}
        <div class="absolute inset-0 animate-pulse bg-gray-200"></div>
    {/if}

    {#if src && !error}
        <img
            src={processedSrc}
            {alt}
            class="w-full h-full object-cover transition-opacity duration-500 {loaded ? 'opacity-100' : 'opacity-0'}"
            on:load={() => loaded = true}
            on:error={() => error = true}
            loading="lazy"
        />
    {:else}
        <div class="flex items-center justify-center h-full text-gray-300">
            <span class="text-4xl">🍔</span>
        </div>
    {/if}
</div>
