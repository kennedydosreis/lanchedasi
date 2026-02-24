<script>
    import { onMount } from 'svelte';

    let visible = false;
    let pulse = true;

    const whatsappNumber = '5592993525884';

    onMount(() => {
        // Show after scrolling past hero
        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = !entry.isIntersecting;
            },
            { threshold: 0.3 }
        );

        const hero = document.getElementById('inicio');
        if (hero) observer.observe(hero);

        // Stop pulsing after 5 seconds
        setTimeout(() => { pulse = false; }, 5000);

        return () => observer.disconnect();
    });

    function openWhatsApp() {
        const message = encodeURIComponent('Olá! Gostaria de fazer um pedido no Lanche da Si. 🍔');
        window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
</script>

{#if visible}
    <button
        class="whatsapp-float"
        class:pulse
        on:click={openWhatsApp}
        aria-label="Pedir pelo WhatsApp"
        title="Pedir pelo WhatsApp"
    >
        <i class="fab fa-whatsapp"></i>
    </button>
{/if}

<style>
    .whatsapp-float {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        background: #25d366;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
        z-index: 999;
        transition: all 0.3s ease;
        animation: slideUp 0.4s ease;
    }

    .whatsapp-float:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 28px rgba(37, 211, 102, 0.6);
    }

    .whatsapp-float.pulse {
        animation: slideUp 0.4s ease, pulseGlow 2s ease-in-out infinite 0.5s;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulseGlow {
        0%, 100% {
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5);
        }
        50% {
            box-shadow: 0 4px 30px rgba(37, 211, 102, 0.8), 0 0 0 12px rgba(37, 211, 102, 0.15);
        }
    }

    @media (max-width: 768px) {
        .whatsapp-float {
            bottom: 16px;
            right: 16px;
            width: 56px;
            height: 56px;
            font-size: 1.8rem;
        }
    }
</style>
