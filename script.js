// Dados do menu - Carregados do localStorage ou dados padrão
let menuData = {};

// Versão atual do menu para forçar atualização quando necessário
const MENU_VERSION = '6.0';

// Função para carregar dados do menu
function loadMenuData() {
    // FORÇA A LIMPEZA DO CACHE ANTIGO
    localStorage.removeItem('lancheDaSiMenu');
    localStorage.removeItem('lancheDaSiMenuVersion');

    const savedData = localStorage.getItem('lancheDaSiMenu');
    const savedVersion = localStorage.getItem('lancheDaSiMenuVersion');

    // Se a versão mudou ou não existe dados salvos, carregar dados padrão
    if (!savedData || savedVersion !== MENU_VERSION) {
        // Dados padrão da lanchonete
        menuData = {
            combos: [
                {
                    id: 'combo-1',
                    name: 'Combo 1',
                    description: '1 X-Salada + 1 Batata Frita P + 1 Refrigerante (Magistral ou Regente) 350ml',
                    price: 25.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-1.jpg'
                },
                {
                    id: 'combo-2',
                    name: 'Combo 2',
                    description: '2 X-Saladas + 1 Batata Frita P + 1 Refrigerante (Magistral ou Regente) 1,5L',
                    price: 40.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-2.jpg'
                },
                {
                    id: 'combo-3',
                    name: 'Combo 3',
                    description: '3 X-Saladas + 1 Refrigerante (Magistral ou Regente) 1,5L',
                    price: 48.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-3.jpg'
                },
                {
                    id: 'combo-4',
                    name: 'Combo 4',
                    description: '4 X-Saladas + 1 Batata Frita P + 1 Refrigerante (Magistral ou Regente) 1,5L',
                    price: 65.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-4.jpg'
                },
                {
                    id: 'combo-5',
                    name: 'Combo 5',
                    description: '1 Kikão Simples + 1 Refrigerante lata 350ml + 1 Batata Frita P',
                    price: 20.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-5.jpg'
                },
                {
                    id: 'combo-6',
                    name: 'Combo 6',
                    description: '3 Kikões Simples + 1 Refrigerante (Magistral ou Regente) 1,5L',
                    price: 35.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-6.jpg'
                },
                {
                    id: 'combo-7',
                    name: 'Combo 7',
                    description: '4 Kikões Simples + 1 Refrigerante (Magistral ou Regente) 1,5L',
                    price: 42.00,
                    category: 'combos',
                    image: 'assets/produtos/combo-7.jpg'
                }
            ],
            sanduiches: [
                {
                    id: 'sanduiche-1',
                    name: 'X-Salada',
                    description: 'Pão, hambúrguer, queijo, alface, tomate e maionese',
                    price: 12.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada.jpg'
                },
                {
                    id: 'sanduiche-2',
                    name: 'X-Salada com Calabresa',
                    description: 'Pão, hambúrguer, calabresa, queijo, alface, tomate e maionese',
                    price: 14.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada-calabresa.jpg'
                },
                {
                    id: 'sanduiche-3',
                    name: 'X-Bacon',
                    description: 'Pão, hambúrguer, bacon crocante, queijo, alface, tomate e maionese',
                    price: 15.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-bacon.jpg'
                },
                {
                    id: 'sanduiche-4',
                    name: 'X-Salada com Salsicha',
                    description: 'Hambúrguer com salsicha, queijo, alface, tomate e maionese',
                    price: 15.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada-salsicha.jpg'
                },
                {
                    id: 'sanduiche-5',
                    name: 'X-Salada Duplo',
                    description: 'Dois hambúrgueres, queijo, alface, tomate e maionese',
                    price: 17.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada-duplo.jpg'
                },
                {
                    id: 'sanduiche-6',
                    name: 'X-Salada com Cebola',
                    description: 'Hambúrguer com cebola, queijo, alface, tomate e maionese',
                    price: 13.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada-cebola.jpg'
                },
                {
                    id: 'sanduiche-7',
                    name: 'X-Burguer com Salsicha',
                    description: 'Hambúrguer simples com salsicha, queijo e maionese',
                    price: 13.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-burguer-salsicha.jpg'
                },
                {
                    id: 'sanduiche-8',
                    name: 'X-Burguer',
                    description: 'Hambúrguer simples com queijo e maionese',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-burguer.jpg'
                },
                {
                    id: 'sanduiche-9',
                    name: 'X-Tudo',
                    description: 'Hambúrguer completo com bacon, calabresa, ovo, queijo, alface, tomate e maionese',
                    price: 20.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-tudo.jpg'
                },
                {
                    id: 'sanduiche-10',
                    name: 'X-Calabresa',
                    description: 'Hambúrguer com calabresa, queijo e maionese',
                    price: 10.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-calabresa.jpg'
                },
                {
                    id: 'sanduiche-11',
                    name: 'X-Maionese',
                    description: 'Hambúrguer simples com queijo e maionese caseira',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-maionese.jpg'
                },
                {
                    id: 'sanduiche-12',
                    name: 'X-Salsicha',
                    description: 'Hambúrguer simples com salsicha e maionese',
                    price: 12.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salsicha.jpg'
                },
                {
                    id: 'sanduiche-13',
                    name: 'X-Salada com Banana',
                    description: 'Hambúrguer com banana frita, queijo, alface, tomate e maionese',
                    price: 13.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-salada-banana.jpg'
                },
                {
                    id: 'sanduiche-14',
                    name: 'X-Egg',
                    description: 'Hambúrguer com ovo, queijo, alface, tomate e maionese',
                    price: 11.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-egg.jpg'
                },
                {
                    id: 'sanduiche-15',
                    name: 'X-Banana',
                    description: 'Hambúrguer simples com banana frita e queijo',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/x-banana.jpg'
                },
                {
                    id: 'sanduiche-16',
                    name: 'Bauru',
                    description: 'Pão francês, presunto, queijo e tomate',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/bauru.jpg'
                },
                {
                    id: 'sanduiche-17',
                    name: 'Americano',
                    description: 'Sanduíche clássico com presunto, queijo, ovo e salada',
                    price: 9.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/americano.jpg'
                },
                {
                    id: 'sanduiche-18',
                    name: 'Hambúrguer Tradicional',
                    description: 'Hambúrguer simples no pão com maionese',
                    price: 5.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/hamburguer.jpg'
                },
                {
                    id: 'sanduiche-19',
                    name: 'Misto Simples',
                    description: '2 Pães de forma, presunto e queijo',
                    price: 5.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/misto-simples.jpg'
                },
                {
                    id: 'sanduiche-20',
                    name: 'Misto Duplo',
                    description: '3 Pães de forma, presunto e queijo duplo',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/misto-duplo.jpg'
                },
                {
                    id: 'sanduiche-21',
                    name: 'Queijo Quente Simples',
                    description: 'Pão de forma e queijo',
                    price: 5.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/queijo-quente.jpg'
                },
                {
                    id: 'sanduiche-22',
                    name: 'Queijo Quente Duplo',
                    description: 'Pão de forma e queijo duplo',
                    price: 8.00,
                    category: 'sanduiches',
                    image: 'assets/produtos/queijo-quente-duplo.jpg'
                }
            ],
            kikao: [
                {
                    id: 'kikao-1',
                    name: 'Kikão Simples',
                    description: 'Pão com molho, salsicha, batata palha e queijo ralado',
                    price: 8.00,
                    category: 'kikao',
                    image: 'assets/produtos/kikao-simples.jpg'
                },
                {
                    id: 'kikao-2',
                    name: 'Kikão Especial',
                    description: 'Pão com molho, salsicha, batata palha, queijo ralado e mussarela derretida',
                    price: 12.00,
                    category: 'kikao',
                    image: 'assets/produtos/kikao-especial.jpg'
                },
                {
                    id: 'kikao-3',
                    name: 'Kikão Especial com Bacon',
                    description: 'Pão com molho, salsicha, batata palha, queijo ralado, mussarela e bacon crocante',
                    price: 15.00,
                    category: 'kikao',
                    image: 'assets/produtos/kikao-bacon.jpg'
                }
            ],
            bebidas: [
                {
                    id: 'bebida-1',
                    name: 'Refrigerante Magistral 1,5L',
                    description: 'Refrigerante Magistral 1,5 litros',
                    price: 6.00,
                    category: 'bebidas',
                    image: 'assets/produtos/magistral-1-5l.jpg'
                },
                {
                    id: 'bebida-2',
                    name: 'Refrigerante Regente 1,5L',
                    description: 'Refrigerante Regente 1,5 litros',
                    price: 6.00,
                    category: 'bebidas',
                    image: 'assets/produtos/regente-1-5l.jpg'
                },
                {
                    id: 'bebida-3',
                    name: 'Coca-Cola 1,5L',
                    description: 'Coca-Cola 1,5 litros',
                    price: 9.00,
                    category: 'bebidas',
                    image: 'assets/produtos/coca-1-5l.jpg'
                },
                {
                    id: 'bebida-4',
                    name: 'Coca-Cola 2L',
                    description: 'Coca-Cola 2 litros',
                    price: 12.00,
                    category: 'bebidas',
                    image: 'assets/produtos/coca-2l.jpg'
                },
                {
                    id: 'bebida-5',
                    name: 'Coca-Cola 350ml',
                    description: 'Coca-Cola lata 350ml',
                    price: 6.00,
                    category: 'bebidas',
                    image: 'assets/produtos/coca-350ml.jpg'
                },
                {
                    id: 'bebida-6',
                    name: 'Baré 350ml',
                    description: 'Guaraná Baré 350ml',
                    price: 5.00,
                    category: 'bebidas',
                    image: 'assets/produtos/bare-350ml.jpg'
                },
                {
                    id: 'bebida-7',
                    name: 'Cerveja Skol 350ml',
                    description: 'Cerveja Skol lata 350ml',
                    price: 5.00,
                    category: 'bebidas',
                    image: 'assets/produtos/skol-350ml.jpg'
                }
            ],
            porcoes: [
                {
                    id: 'porcao-1',
                    name: 'Porção 1',
                    description: 'Carne, Batata Frita e Calabresa',
                    price: 25.00,
                    category: 'porcoes',
                    image: 'assets/produtos/porcao-1.jpg'
                },
                {
                    id: 'porcao-2',
                    name: 'Porção 2',
                    description: 'Carne e Calabresa',
                    price: 20.00,
                    category: 'porcoes',
                    image: 'assets/produtos/porcao-2.jpg'
                },
                {
                    id: 'porcao-3',
                    name: 'Porção 3',
                    description: 'Carne e Batata Frita',
                    price: 20.00,
                    category: 'porcoes',
                    image: 'assets/produtos/porcao-3.jpg'
                },
                {
                    id: 'porcao-4',
                    name: 'Porção 4',
                    description: 'Calabresa e Batata Frita',
                    price: 18.00,
                    category: 'porcoes',
                    image: 'assets/produtos/porcao-4.jpg'
                },
                {
                    id: 'porcao-5',
                    name: 'Batata Frita P',
                    description: 'Porção pequena',
                    price: 8.00,
                    category: 'porcoes',
                    image: 'assets/produtos/batata-p.jpg'
                },
                {
                    id: 'porcao-6',
                    name: 'Batata Frita G',
                    description: 'Porção grande',
                    price: 12.00,
                    category: 'porcoes',
                    image: 'assets/produtos/batata-g.jpg'
                }
            ],
            pratos: [
                {
                    id: 'prato-1',
                    name: 'Isca Simples de Carne',
                    description: 'Carne grelhada acompanhada de arroz, farofa e batata frita',
                    price: 22.00,
                    category: 'pratos',
                    image: 'assets/produtos/isca-carne.jpg'
                },
                {
                    id: 'prato-2',
                    name: 'Isca Simples de Frango',
                    description: 'Frango grelhado acompanhado de arroz, farofa e batata frita',
                    price: 20.00,
                    category: 'pratos',
                    image: 'assets/produtos/isca-frango.jpg'
                },
                {
                    id: 'prato-3',
                    name: 'Isca Mista (Carne e Frango)',
                    description: 'Combinação de carne e frango, acompanhados de arroz, farofa e batata frita',
                    price: 25.00,
                    category: 'pratos',
                    image: 'assets/produtos/isca-mista-carne-frango.jpg'
                },
                {
                    id: 'prato-4',
                    name: 'Isca Mista (Carne e Calabresa)',
                    description: 'Combinação de carne e calabresa, acompanhados de arroz, farofa e batata frita',
                    price: 25.00,
                    category: 'pratos',
                    image: 'assets/produtos/isca-mista-carne-calabresa.jpg'
                },
                {
                    id: 'prato-5',
                    name: 'Isca Mista (Frango e Calabresa)',
                    description: 'Combinação de frango e calabresa, acompanhados de arroz, farofa e batata frita',
                    price: 23.00,
                    category: 'pratos',
                    image: 'assets/produtos/isca-mista-frango-calabresa.jpg'
                },
                {
                    id: 'prato-6',
                    name: 'Yakisoba Médio de Carne',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne',
                    price: 18.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-m-carne.jpg'
                },
                {
                    id: 'prato-7',
                    name: 'Yakisoba Médio de Frango',
                    description: 'Macarrão com verduras e molho especial, acompanhado de frango',
                    price: 16.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-m-frango.jpg'
                },
                {
                    id: 'prato-8',
                    name: 'Yakisoba Médio Misto (Carne e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne e calabresa',
                    price: 20.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-m-carne-calabresa.jpg'
                },
                {
                    id: 'prato-9',
                    name: 'Yakisoba Médio Misto (Frango e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de frango e calabresa',
                    price: 18.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-m-frango-calabresa.jpg'
                },
                {
                    id: 'prato-10',
                    name: 'Yakisoba Médio Misto (Carne, Frango e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne, frango e calabresa',
                    price: 22.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-m-completo.jpg'
                },
                {
                    id: 'prato-11',
                    name: 'Yakisoba Grande de Carne',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne',
                    price: 22.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-g-carne.jpg'
                },
                {
                    id: 'prato-12',
                    name: 'Yakisoba Grande de Frango',
                    description: 'Macarrão com verduras e molho especial, acompanhado de frango',
                    price: 20.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-g-frango.jpg'
                },
                {
                    id: 'prato-13',
                    name: 'Yakisoba Grande Misto (Carne e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne e calabresa',
                    price: 25.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-g-carne-calabresa.jpg'
                },
                {
                    id: 'prato-14',
                    name: 'Yakisoba Grande Misto (Frango e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de frango e calabresa',
                    price: 23.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-g-frango-calabresa.jpg'
                },
                {
                    id: 'prato-15',
                    name: 'Yakisoba Grande Misto (Carne, Frango e Calabresa)',
                    description: 'Macarrão com verduras e molho especial, acompanhado de carne, frango e calabresa',
                    price: 28.00,
                    category: 'pratos',
                    image: 'assets/produtos/yakisoba-g-completo.jpg'
                }
            ]
        };
        // Salvar dados padrão no localStorage
        localStorage.setItem('lancheDaSiMenu', JSON.stringify(menuData));
        localStorage.setItem('lancheDaSiMenuVersion', MENU_VERSION);
    } else {
        menuData = JSON.parse(savedData);
    }
}

// Verificar se o menu foi atualizado no painel admin
function checkMenuUpdates() {
    const lastUpdate = localStorage.getItem('restaurantMenuUpdated');
    if (lastUpdate) {
        loadMenuData();
        renderMenu();
        localStorage.removeItem('restaurantMenuUpdated');
    }
}

// Função para resetar o menu (pode ser chamada no console se necessário)
function resetMenu() {
    localStorage.removeItem('lancheDaSiMenu');
    localStorage.removeItem('lancheDaSiMenuVersion');
    loadMenuData();
    renderMenu();
    console.log('Menu resetado com sucesso!');
}

// Função de teste para verificar dados (pode ser chamada no console)
function testMenu() {
    console.log('=== TESTE DO MENU ===');
    console.log('menuData:', menuData);
    console.log('currentCategory:', currentCategory);

    Object.keys(menuData).forEach(category => {
        console.log(`${category}: ${menuData[category].length} itens`);
        menuData[category].forEach(item => {
            console.log(`  - ${item.name} (${item.id})`);
        });
    });

    console.log('=== FIM DO TESTE ===');
}

// Carrinho de compras
let cart = [];
let currentCategory = 'todos';

// Elementos DOM
const menuGrid = document.getElementById('menuGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const subtotal = document.getElementById('subtotal');
const total = document.getElementById('total');
const cartSection = document.getElementById('cartSection');
const cartToggle = document.getElementById('cartToggle');
const clearCartBtn = document.getElementById('clearCart');
const orderWhatsAppBtn = document.getElementById('orderWhatsApp');

// Verificar se todos os elementos existem
function checkDOMElements() {
    const elements = {
        menuGrid,
        cartItems,
        cartCount,
        subtotal,
        total,
        cartSection,
        cartToggle,
        clearCartBtn,
        orderWhatsAppBtn
    };

    let allElementsFound = true;
    Object.keys(elements).forEach(key => {
        if (!elements[key]) {
            console.error(`Elemento não encontrado: ${key}`);
            allElementsFound = false;
        }
    });

    return allElementsFound;
}

// Pegar categoryBtns após o DOM estar carregado
let categoryBtns;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Pequeno delay para garantir que tudo esteja carregado
    setTimeout(() => {
        // Verificar elementos DOM
        const elementsOK = checkDOMElements();
        if (!elementsOK) {
            console.error('Alguns elementos DOM não foram encontrados!');
            return;
        }

        // Pegar os botões de categoria
        categoryBtns = document.querySelectorAll('.category-btn');

        // Forçar limpeza completa do cache
        localStorage.clear();

        loadMenuData();

        // Verificar se os dados foram carregados corretamente
        if (!menuData || Object.keys(menuData).length === 0) {
            console.error('Falha ao carregar dados do menu!');
            return;
        }

        renderMenu();
        setupEventListeners();
        updateCartDisplay();

        // Verificar atualizações do menu a cada 2 segundos
        setInterval(checkMenuUpdates, 2000);

        console.log('✅ Aplicação inicializada com sucesso!');
    }, 100);
});

// Configurar event listeners
function setupEventListeners() {
    cartToggle.addEventListener('click', toggleCart);
    clearCartBtn.addEventListener('click', clearCart);
    orderWhatsAppBtn.addEventListener('click', sendToWhatsApp);

    // Event listener para o campo de observações
    const observationsTextarea = document.getElementById('orderObservations');
    const charCount = document.getElementById('charCount');

    if (observationsTextarea && charCount) {
        observationsTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 300;

            charCount.textContent = currentLength;

            // Remover classes anteriores
            charCount.parentElement.classList.remove('warning', 'danger');

            // Adicionar classes baseadas no limite
            if (currentLength >= maxLength - 50) {
                charCount.parentElement.classList.add('warning');
            }
            if (currentLength >= maxLength - 20) {
                charCount.parentElement.classList.add('danger');
            }
        });
    }

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setActiveCategory(btn.dataset.category);
        });
    });
}

// Renderizar menu
function renderMenu() {
    if (!menuGrid) {
        console.error('menuGrid não encontrado!');
        return;
    }

    menuGrid.innerHTML = '';

    let itemsToShow = [];

    if (currentCategory === 'todos') {
        Object.values(menuData).forEach(category => {
            if (Array.isArray(category)) {
                itemsToShow = itemsToShow.concat(category);
            }
        });
    } else {
        itemsToShow = menuData[currentCategory] || [];
    }

    if (itemsToShow.length === 0) {
        menuGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--gray-500);">
                <i class="fas fa-utensils" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>Nenhum item encontrado nesta categoria.</p>
                <p><small>Categoria atual: ${currentCategory}</small></p>
            </div>
        `;
        return;
    }

    itemsToShow.forEach((item) => {
        const menuItem = createMenuItem(item);
        menuGrid.appendChild(menuItem);
    });
}

// Criar item do menu
function createMenuItem(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';

    const cartItem = cart.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-item-image"
             onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgMTAwbTAtNDBhNDAgNDAgMCAxIDEgMCA4MCA0MCA0MCAwIDEgMS0wLTgwIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPg==';">
        <div class="menu-item-content">
            <div class="menu-item-header">
                <h3>${item.name}</h3>
                <span class="menu-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <p>${item.description}</p>
            <div class="menu-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${quantity - 1})">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${quantity + 1})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="add-to-cart" onclick="addToCart('${item.id}')">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar
                </button>
            </div>
        </div>
    `;
    return div;
}

// Definir categoria ativa
function setActiveCategory(category) {
    currentCategory = category;

    // Atualizar botões
    if (categoryBtns) {
        categoryBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });
    }

    renderMenu();
}

// Adicionar ao carrinho
function addToCart(itemId) {
    let item = null;

    // Encontrar o item no menu
    Object.values(menuData).forEach(category => {
        const found = category.find(i => i.id === itemId);
        if (found) item = found;
    });

    if (!item) return;

    // Verificar se já existe no carrinho
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartDisplay();
    showNotification(`${item.name} adicionado ao carrinho!`);
}

// Remover do carrinho
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        updateCartDisplay();
    }
}

// Limpar carrinho
function clearCart() {
    cart = [];

    // Limpar também o campo de observações
    const observationsTextarea = document.getElementById('orderObservations');
    const charCount = document.getElementById('charCount');

    if (observationsTextarea) {
        observationsTextarea.value = '';
    }
    if (charCount) {
        charCount.textContent = '0';
        charCount.parentElement.classList.remove('warning', 'danger');
    }

    updateCartDisplay();
    showNotification('Carrinho limpo!');
}

// Atualizar exibição do carrinho
function updateCartDisplay() {
    // Atualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Atualizar itens do carrinho
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
                <p class="empty-cart-subtitle">Adicione itens do cardápio para começar</p>
            </div>
        `;
        subtotal.textContent = 'R$ 0,00';
        total.textContent = 'R$ 0,00';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzMG0wLTEyYTEyIDEyIDAgMSAxIDAgMjQgMTIgMTIgMCAxIDEgMC0yNCIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <span class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="quantity-btn" onclick="removeItemFromCart('${item.id}')" style="background: var(--danger-color); color: white; margin-left: var(--spacing-2);">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Calcular totais
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    subtotal.textContent = `R$ ${subtotalValue.toFixed(2).replace('.', ',')}`;

    const deliveryFee = subtotalValue > 0 ? 0.00 : 0;
    document.getElementById('deliveryFee').textContent = `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;

    const totalValue = subtotalValue + deliveryFee;
    total.textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;

    // Renderizar menu novamente para atualizar quantidades
    renderMenu();
}

// Função para atualizar quantidade
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeItemFromCart(itemId);
        return;
    }

    const item = findItemById(itemId);
    if (!item) return;

    const cartItem = cart.find(cartItem => cartItem.id === itemId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
    } else if (newQuantity > 0) {
        cart.push({
            ...item,
            quantity: newQuantity
        });
    }

    updateCartDisplay();
}

// Função para remover item completamente do carrinho
function removeItemFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartDisplay();
        showNotification('Item removido do carrinho!');
    }
}

// Alternar carrinho
function toggleCart() {
    cartSection.classList.toggle('active');

    // Criar overlay se não existir
    let overlay = document.querySelector('.cart-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'cart-overlay';
        overlay.addEventListener('click', () => {
            cartSection.classList.remove('active');
            overlay.classList.remove('active');
        });
        document.body.appendChild(overlay);
    }

    overlay.classList.toggle('active');
}

// Enviar para WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        showNotification('Adicione itens ao carrinho primeiro!');
        return;
    }

    // Obter observações
    const observations = document.getElementById('orderObservations').value.trim();

    // Formatar mensagem
    let message = '🍔 *NOVO PEDIDO - Lanche da Si* 🍔\n\n';
    message += '📋 *ITENS DO PEDIDO:*\n';

    cart.forEach(item => {
        message += `• ${item.name} x${item.quantity} - R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}\n`;
    });

    message += '\n💰 *RESUMO:*\n';
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 0.00;
    const totalValue = subtotalValue + deliveryFee;

    message += `Subtotal: R$ ${subtotalValue.toFixed(2).replace('.', ',')}\n`;
    message += `Taxa de entrega: R$ ${deliveryFee.toFixed(2).replace('.', ',')} *(pode variar de acordo com a localidade)\n`;
    message += `*TOTAL: R$ ${totalValue.toFixed(2).replace('.', ',')}*\n\n`;

    // Adicionar observações se houver
    if (observations) {
        message += '📝 *OBSERVAÇÕES:*\n';
        message += `${observations}\n\n`;
    }

    message += '📍 *INFORMAÇÕES DE ENTREGA:*\n';
    message += 'Por favor, informe:\n';
    message += '• Nome\n';
    message += '• Endereço completo\n';
    message += '• Telefone para contato\n';
    message += '• Forma de pagamento\n\n';

    message += '⏰ *HORÁRIO DE FUNCIONAMENTO:*\n';
    message += 'Quarta a Domingo: 18h às 23h\n';

    // Codificar mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Número do WhatsApp (substitua pelo número real da lanchonete)
    const whatsappNumber = '5592993525884';

    // Criar link do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
}

// Função auxiliar para encontrar item por ID
function findItemById(itemId) {
    for (const category in menuData) {
        const item = menuData[category].find(item => item.id === itemId);
        if (item) return item;
    }
    return null;
}

// Mostrar notificação melhorada
function showNotification(message, type = 'success') {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = 'notification';

    const bgColor = type === 'success' ? 'var(--accent-color)' :
                   type === 'error' ? 'var(--danger-color)' :
                   'var(--primary-color)';

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: var(--spacing-6);
        background: ${bgColor};
        color: white;
        padding: var(--spacing-4) var(--spacing-6);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 320px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
    `;

    // Adicionar ícone baseado no tipo
    const icon = type === 'success' ? 'fas fa-check-circle' :
                type === 'error' ? 'fas fa-exclamation-circle' :
                'fas fa-info-circle';

    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    // Mostrar notificação
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Indicador de progresso do scroll
function updateScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    if (scrollIndicator) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        scrollIndicator.style.width = `${scrollPercent}%`;
    }
}

// Animação de entrada para seções
function animateOnScroll() {
    const elements = document.querySelectorAll('.section-animate, .menu-item, .contact-item');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Efeito de flutuação para logo
function addLogoFloatEffect() {
    const logo = document.querySelector('.hero-logo-img');
    if (logo) {
        logo.classList.add('float-animation');
    }
}

// Aplicar efeitos de brilho aos botões
function addShineEffects() {
    const buttons = document.querySelectorAll('.btn, .category-btn, .add-to-cart');
    buttons.forEach(button => {
        button.classList.add('shine-effect');
    });
}

// Adicionar efeito de loading aos botões
function addLoadingEffect(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';
    button.disabled = true;

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 1000);
}

// Animação de entrada escalonada para itens do menu
function staggerMenuItemAnimations() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${(index * 0.1) + 0.1}s`;
    });
}

// Aplicar melhorias visuais no carregamento
function applyVisualEnhancements() {
    // Adicionar efeitos de brilho
    addShineEffects();

    // Aplicar efeito de flutuação no logo
    addLogoFloatEffect();

    // Aplicar estilos de animação inicial para elementos
    const animatedElements = document.querySelectorAll('.menu-item, .contact-item, .section-animate');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // Aplicar animação escalonada aos itens do menu
    setTimeout(staggerMenuItemAnimations, 500);

    // Executar animação inicial
    setTimeout(animateOnScroll, 200);
}

// Event listeners para scroll
window.addEventListener('scroll', () => {
    updateScrollIndicator();
    animateOnScroll();
});

// Aplicar melhorias visuais quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Delay para garantir que tudo esteja carregado
    setTimeout(applyVisualEnhancements, 300);
});
