import * as universal from '../entries/pages/cardapio/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/cardapio/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/cardapio/+page.js";
export const imports = ["_app/immutable/nodes/3.BoHGbC45.js","_app/immutable/chunks/BxN5ndwy.js","_app/immutable/chunks/D9vLkFHD.js","_app/immutable/chunks/JQPz_MRN.js","_app/immutable/chunks/DQw87EaK.js","_app/immutable/chunks/DDWrEf_9.js","_app/immutable/chunks/DcY6sxlp.js","_app/immutable/chunks/7FTgANww.js","_app/immutable/chunks/BOFEw3tB.js","_app/immutable/chunks/BMaO7_QC.js"];
export const stylesheets = ["_app/immutable/assets/BentoMenu.DIuhtUwd.css","_app/immutable/assets/3.BDyRjRZe.css"];
export const fonts = [];
