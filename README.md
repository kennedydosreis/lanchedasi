# Lanche da Si - Aplicação SvelteKit

Uma aplicação moderna de pedidos online para lanchonete, desenvolvida com SvelteKit e otimizada para SEO.

## 🚀 Tecnologias

- **SvelteKit** - Framework para aplicações web modernas
- **JavaScript** - Linguagem de programação
- **CSS3** - Estilização moderna com CSS Variables
- **Font Awesome** - Ícones
- **Google Fonts** - Tipografia (Inter)

## 📱 Funcionalidades

- ✅ **Cardápio dinâmico** - Menu organizado por categorias
- ✅ **Carrinho de compras** - Adicionar/remover itens
- ✅ **Integração WhatsApp** - Envio automático de pedidos
- ✅ **Design responsivo** - Funciona em todos os dispositivos
- ✅ **Otimização SEO** - Meta tags, Schema.org, sitemap
- ✅ **Performance** - Lazy loading, code splitting

## 🎯 Otimizações SEO

### Meta Tags
- Títulos e descrições dinâmicas
- Open Graph para redes sociais
- Twitter Cards
- Meta robots e canonical URLs

### Schema Markup
- Estrutura de dados para restaurante
- Menu estruturado
- Informações de negócio local

### Arquivos SEO
- `/sitemap.xml` - Mapa do site
- `/robots.txt` - Instruções para crawlers

## 🛠️ Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── lib/
│   ├── components/
│   │   ├── Header.svelte
│   │   ├── Hero.svelte
│   │   ├── MetaTags.svelte
│   │   ├── Menu/
│   │   └── Cart/
│   ├── stores/
│   │   └── cart.js
│   └── data/
│       └── menu.js
├── routes/
│   ├── +layout.svelte
│   ├── +page.svelte
│   ├── sitemap.xml/
│   └── robots.txt/
└── static/
```
