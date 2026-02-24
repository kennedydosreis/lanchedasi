!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "2961e4dd-e1cf-453c-85c0-f664a6d4cabd", e._sentryDebugIdIdentifier = "sentry-dbid-2961e4dd-e1cf-453c-85c0-f664a6d4cabd");
  } catch (e2) {
  }
}();
import { json } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";
const config = {
  runtime: "edge"
};
const GET = async () => {
  try {
    const menuData = [
      {
        id: "combo-4",
        name: "Combo 4",
        description: "4 X-Saladas + 1 Batata Frita P + 1 Refrigerante (Magistral ou Regente) 1,5L",
        price: 45,
        category: "combos",
        popular: true,
        available: true
      },
      {
        id: "kikao-2",
        name: "Kikão Especial",
        description: "Pão com molho, salsicha, batata palha, queijo ralado e mussarela derretida",
        price: 10,
        category: "kikao",
        popular: true,
        available: true
      },
      {
        id: "prato-1",
        name: "Isca de Carne",
        description: "Carne grelhada acompanhada de arroz, farofa e batata frita",
        price: 17,
        category: "pratos",
        popular: true,
        available: true
      }
    ];
    return json(menuData);
  } catch (error) {
    Sentry.captureException(error);
    return json({ error: "Erro ao processar o menu" }, { status: 500 });
  }
};
export {
  GET,
  config
};
