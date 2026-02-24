!function() {
  try {
    var e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : {};
    e.SENTRY_RELEASE = { id: "a9a6c365e5af544cf116d5add4ce50f9371f8788" };
    var n = new e.Error().stack;
    n && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[n] = "c9fa2c3c-6c7f-4303-92b4-ea710aad3ee0", e._sentryDebugIdIdentifier = "sentry-dbid-c9fa2c3c-6c7f-4303-92b4-ea710aad3ee0");
  } catch (e2) {
  }
}();
import { c as create_ssr_component, b as add_attribute } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let password = "";
  return `<div style="min-height: 100vh; background-color: #f8fafc; font-family: sans-serif; padding: 40px 20px; color: #1e293b;"><div style="max-width: 1000px; margin: 0 auto;">${`<div style="display: flex; justify-content: center; align-items: center; min-height: 60vh;"><div style="background: white; padding: 40px; border-radius: 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.05); text-align: center; width: 100%; max-width: 400px; border: 1px solid #f1f5f9;"><div style="font-size: 48px; margin-bottom: 20px;" data-svelte-h="svelte-33y4r2">🔐</div> <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 8px; color: #0f172a;" data-svelte-h="svelte-ocefo4">Painel do Dono</h1> <p style="color: #64748b; margin-bottom: 32px; font-size: 14px;" data-svelte-h="svelte-1grghjo">Lanche da Si • Gestão</p> <div style="text-align: left; margin-bottom: 24px;"><label style="display: block; font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 2px; margin-bottom: 8px; text-transform: uppercase;" data-svelte-h="svelte-1rtf4ba">Senha de Acesso</label> <input type="password" placeholder="••••••••" style="width: 100%; padding: 18px; background: #f1f5f9; border: 2px solid transparent; border-radius: 20px; font-size: 20px; font-weight: 700; text-align: center; outline: none;"${add_attribute("value", password, 0)}></div> <button style="width: 100%; background: #0f172a; color: white; border: none; padding: 20px; border-radius: 20px; font-weight: 800; cursor: pointer; font-size: 16px;" data-svelte-h="svelte-1ui6ibj">ENTRAR NO PAINEL</button> ${``}</div></div>`}</div></div>`;
});
export {
  Page as default
};
