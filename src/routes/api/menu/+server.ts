import { json } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

export const config = {
  runtime: 'edge'
};

export const GET = async () => {
  try {
    // Simulando a base de dados do menu que existia anteriormente ou gerando uma estática resiliente
    // Em um cenário de produção, isso viria de um CMS ou banco de dados
    const menuData = [
      {
        id: '1',
        name: 'X-Salada Especial',
        description: 'Pão, carne artesanal, queijo, presunto, alface, tomate e maionese da casa.',
        price: 18.00,
        category: 'sanduiches',
        popular: true,
        available: true
      },
      {
        id: '2',
        name: 'Combo Casal',
        description: '2 X-Bacon + Batata Média + Guaraná 1L.',
        price: 45.00,
        category: 'combos',
        popular: true,
        available: true
      },
      {
        id: '3',
        name: 'Kikão da Si',
        description: 'Pão de leite, salsicha, molho especial, batata palha e queijo ralado.',
        price: 12.00,
        category: 'kikao',
        popular: true,
        available: true
      }
    ];

    return json(menuData);
  } catch (error) {
    Sentry.captureException(error);
    return json({ error: 'Erro ao processar o menu' }, { status: 500 });
  }
};
