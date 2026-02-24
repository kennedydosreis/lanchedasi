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

<div class="relative overflow-hidden bg-gray-100 {className}" style="height: 100%; width: 100%;">
    {#if !loaded && !error}
        <div class="absolute inset-0 animate-pulse bg-gray-200" style="position: absolute; inset: 0; background: #eee;"></div>
    {/if}

    {#if src && !error}
        <img
            src={processedSrc}
            {alt}
            style="width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s, transform 0.5s; opacity: {loaded ? '1' : '0'}"
            on:load={() => loaded = true}
            on:error={() => error = true}
            loading="lazy"
        />
    {:else}
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; color: #d1d5db;">
            <span style="font-size: 3rem;">🍔</span>
        </div>
    {/if}
</div>
