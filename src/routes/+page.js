export const prerender = true;

export async function load({ fetch }) {
    try {
        const response = await fetch('/data/menu.json');
        const menuData = await response.json();
        return { menuData };
    } catch {
        return { menuData: null };
    }
}
