<script>
    import MetaTags from '$lib/components/MetaTags.svelte';
    
    const whatsappNumber = '5511999999999'; // Número placeholder
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
</script>

<MetaTags 
    title="Contato - Lanche da Si"
    description="Entre em contato conosco pelo WhatsApp ou visite nosso endereço."
/>

<div class="page-header">
    <div class="container">
        <h1 class="gradient-text">Fale Conosco</h1>
        <p class="subtitle">Estamos prontos para atender você</p>
    </div>
</div>

<section class="contact-section">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-card whatsapp-card">
                <div class="icon">💬</div>
                <h2>WhatsApp</h2>
                <p>Faça seu pedido ou tire suas dúvidas</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i>
                    Abrir WhatsApp
                </a>
            </div>

            <div class="contact-card">
                <div class="icon">📍</div>
                <h2>Endereço</h2>
                <p>
                    <strong>Lanche da Si</strong><br>
                    Rua Exemplo, 123 - Centro<br>
                    Cidade - Estado<br>
                    CEP: 00000-000
                </p>
            </div>

            <div class="contact-card">
                <div class="icon">🕐</div>
                <h2>Horário de Atendimento</h2>
                <p>
                    <strong>Quarta a Domingo</strong><br>
                    18h às 23h<br>
                    <br>
                    <em>Segunda e terça: fechado</em>
                </p>
            </div>
        </div>

        <div class="map-container">
            <h2>Encontre-nos no Mapa</h2>
            <div class="map-wrapper">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197!2d-46.633!3d-23.550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMzJzAwLjAiUyA0NsKwMzcnNTguOCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                    width="100%"
                    height="400"
                    style="border:0; border-radius: 16px;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Localização do Lanche da Si"
                ></iframe>
            </div>
        </div>
    </div>
</section>

<style>
    .page-header {
        padding: calc(var(--spacing-12) + 60px) 0 var(--spacing-8) 0;
        background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
        text-align: center;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .gradient-text {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-4);
    }

    .subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-700);
        max-width: 600px;
        margin: 0 auto;
    }

    .contact-section {
        padding: var(--spacing-12) 0;
        background: var(--gray-50);
    }

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-8);
        margin-bottom: var(--spacing-12);
    }

    .contact-card {
        background: white;
        padding: var(--spacing-8);
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .icon {
        font-size: 3rem;
        margin-bottom: var(--spacing-4);
    }

    .contact-card h2 {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-4);
    }

    .contact-card p {
        line-height: 1.8;
        color: var(--gray-700);
        margin-bottom: var(--spacing-4);
    }

    .whatsapp-card {
        background: linear-gradient(135deg, var(--whatsapp-color), #20b358);
        color: white;
    }

    .whatsapp-card h2,
    .whatsapp-card p {
        color: white;
    }

    .whatsapp-button {
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        background: white;
        color: var(--whatsapp-color);
        padding: var(--spacing-4) var(--spacing-6);
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: var(--font-size-lg);
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .whatsapp-button:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .whatsapp-button i {
        font-size: var(--font-size-2xl);
    }

    .map-container {
        margin-top: var(--spacing-12);
    }

    .map-container h2 {
        text-align: center;
        font-size: var(--font-size-3xl);
        font-weight: 700;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-6);
    }

    .map-wrapper {
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        .page-header {
            padding: calc(var(--spacing-8) + 56px) 0 var(--spacing-6) 0;
        }

        .gradient-text {
            font-size: var(--font-size-3xl);
        }

        .subtitle {
            font-size: var(--font-size-base);
        }

        .contact-section {
            padding: var(--spacing-8) 0;
        }

        .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
        }

        .contact-card {
            padding: var(--spacing-6);
        }

        .map-wrapper iframe {
            height: 300px;
        }
    }
</style>
