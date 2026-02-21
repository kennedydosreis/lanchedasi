<script>
    const contactInfo = {
        phone: '(92) 99352-5884',
        whatsapp: '5592993525884',
        address: 'Rua Itororo, 22, Beco Esperança - Alvorada, Manaus - AM',
        coordinates: {
            lat: -3.0863,
            lng: -59.9819
        },
        hours: {
            weekdays: 'Quarta a Domingo: 18h às 23h'
        }
    };

    function openWhatsApp() {
        const message = encodeURIComponent('Olá! Gostaria de fazer um pedido no Lanche da Si.');
        window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
    }
</script>

<section id="contato" class="contact-section" aria-label="Informações de contato">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Entre em Contato</h2>
            <p class="section-subtitle">Estamos prontos para atender você!</p>
        </div>

        <div class="contact-grid">
            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-phone"></i>
                </div>
                <h3>Telefone</h3>
                <p>{contactInfo.phone}</p>
                <a href="tel:{contactInfo.phone.replace(/\D/g, '')}" class="contact-btn phone-btn">
                    <i class="fas fa-phone"></i>
                    Ligar
                </a>
            </div>

            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <h3>Endereço</h3>
                <p>{contactInfo.address}</p>
                <a
                    href="https://www.google.com/maps/search/?api=1&query={contactInfo.coordinates.lat},{contactInfo.coordinates.lng}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="contact-btn location-btn"
                    aria-label="Ver endereço no Google Maps"
                >
                    <i class="fas fa-map" aria-hidden="true"></i>
                    Ver no Mapa
                </a>
            </div>

            <div class="contact-card">
                <div class="contact-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>Horário de Funcionamento</h3>
                <div class="hours-info">
                    <p>{contactInfo.hours.weekdays}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .contact-section {
        padding: var(--spacing-12) 0;
        background: linear-gradient(135deg, var(--gray-900), var(--gray-800));
        color: var(--white);
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 var(--spacing-4);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--spacing-12);
    }

    .section-title {
        font-size: var(--font-size-4xl);
        font-weight: 800;
        margin-bottom: var(--spacing-4);
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--gray-300);
        margin: 0;
    }

    .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: var(--spacing-8);
        margin-bottom: var(--spacing-12);
    }

    .contact-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: var(--spacing-8);
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .contact-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    }

    .contact-icon {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto var(--spacing-6);
        font-size: 2rem;
        color: var(--white);
    }

    .contact-card h3 {
        font-size: var(--font-size-xl);
        font-weight: 600;
        margin-bottom: var(--spacing-4);
    }

    .contact-card p {
        color: var(--gray-300);
        margin-bottom: var(--spacing-6);
        line-height: 1.6;
    }

    .hours-info p {
        margin-bottom: var(--spacing-2);
    }

    .contact-btn {
        background: transparent;
        color: var(--white);
        border: 2px solid var(--secondary-color);
        padding: var(--spacing-3) var(--spacing-6);
        border-radius: 12px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2);
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        font-size: var(--font-size-sm);
    }

    .contact-btn:hover {
        background: var(--secondary-color);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        .contact-section {
            padding: var(--spacing-8) 0;
        }

        .section-title {
            font-size: var(--font-size-3xl);
        }

        .contact-grid {
            grid-template-columns: 1fr;
            gap: var(--spacing-6);
        }

        .contact-card {
            padding: var(--spacing-6);
        }
    }
</style>
