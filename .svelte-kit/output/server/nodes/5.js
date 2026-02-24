

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/gerenciar/_page.svelte.js')).default;
export const universal = {
  "prerender": true,
  "ssr": false,
  "trailingSlash": "always"
};
export const universal_id = "src/routes/gerenciar/+page.js";
export const imports = ["_app/immutable/nodes/5.DXrU3iRg.js","_app/immutable/chunks/JQPz_MRN.js","_app/immutable/chunks/DQw87EaK.js","_app/immutable/chunks/DDWrEf_9.js"];
export const stylesheets = [];
export const fonts = [];
