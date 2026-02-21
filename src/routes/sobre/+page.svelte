<script>
    import MetaTags from '$lib/components/MetaTags.svelte';
</script>

<MetaTags 
    title="Sobre Nós - Lanche da Si"
    description="Conheça a história do Lanche da Si, nossa localização e horários de funcionamento."
/>

<div class="page-header">
    <div class="container">
        <h1 class="gradient-text">Sobre o Lanche da Si</h1>
        <p class="subtitle">Tradição e sabor desde o início</p>
    </div>
</div>

<section class="about-section">
    <div class="container">
        <div class="content-grid">
            <div class="info-card">
                <div class="icon">🍔</div>
                <h2>Nossa História</h2>
                <p>
                    O Lanche da Si nasceu do sonho de levar sabor e qualidade para a comunidade. 
                    Com receitas caseiras e ingredientes frescos, nos tornamos referência em lanches 
                    e pratos deliciosos. Cada pedido é preparado com carinho e dedicação.
                </p>
            </div>

            <div class="info-card">
                <div class="icon">📍</div>
                <h2>Localização</h2>
                <p>
                    <strong>Lanche da Si</strong><br>
                    Rua Exemplo, 123 - Centro<br>
                    Cidade - Estado<br>
                    CEP: 00000-000
                </p>
            </div>

            <div class="info-card">
                <div class="icon">🕐</div>
                <h2>Horário de Funcionamento</h2>
                <p>
                    <strong>Quarta a Domingo</strong><br>
                    18h às 23h<br>
                    <br>
                    <em>Segunda e terça: fechado</em>
                </p>
            </div>

            <div class="info-card">
                <div class="icon">✨</div>
                <h2>Nosso Diferencial</h2>
                <p>
                    Ingredientes frescos, receitas exclusivas e atendimento personalizado. 
                    Nosso compromisso é entregar não apenas comida, mas uma experiência 
                    saborosa e inesquecível.
                </p>
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

    .about-section {
        padding: var(--spacing-12) 0;
        background: var(--gray-50);
    }

    .content-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-8);
        margin-top: var(--spacing-8);
    }

    .info-card {
        background: white;
        padding: var(--spacing-8);
        border-radius: 16px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .info-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .icon {
        font-size: 3rem;
        margin-bottom: var(--spacing-4);
    }

    .info-card h2 {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--secondary-color);
        margin-bottom: var(--spacing-4);
    }

    .info-card p {
        line-height: 1.8;
        color: var(--gray-700);
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

        .about-section {
            padding: var(--spacing-8) 0;
        }

        .content-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
        }

        .info-card {
            padding: var(--spacing-6);
        }
    }
</style>
