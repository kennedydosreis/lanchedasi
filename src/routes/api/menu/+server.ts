import { json } from '@sveltejs/kit';
import * as Sentry from '@sentry/sveltekit';

export const config = {
  runtime: 'edge'
};

export const GET = async () => {
  try {
    const menuData = [
      {
        id: "combo-4",
        name: "Combo 4",
        description: "4 X-Saladas + 1 Batata Frita P + 1 Refrigerante (Magistral ou Regente) 1,5L",
        price: 45.0,
        category: "combos",
        popular: true,
        available: true
      },
      {
        id: "kikao-2",
        name: "Kikão Especial",
        description: "Pão com molho, salsicha, batata palha, queijo ralado e mussarela derretida",
        price: 10.0,
        category: "kikao",
        popular: true,
        available: true
      },
      {
        id: "prato-1",
        name: "Isca de Carne",
        description: "Carne grelhada acompanhada de arroz, farofa e batata frita",
        price: 17.0,
        category: "pratos",
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
