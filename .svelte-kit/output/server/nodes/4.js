import * as universal from '../entries/pages/contato/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contato/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/contato/+page.js";
export const imports = ["_app/immutable/nodes/4.XMouSUYQ.js","_app/immutable/chunks/JQPz_MRN.js","_app/immutable/chunks/DDWrEf_9.js","_app/immutable/chunks/7FTgANww.js","_app/immutable/chunks/BOFEw3tB.js","_app/immutable/chunks/DcY6sxlp.js","_app/immutable/chunks/BMaO7_QC.js"];
export const stylesheets = ["_app/immutable/assets/4.DSAtKxjY.css"];
export const fonts = [];
