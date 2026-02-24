import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image?: string;
    available: boolean;
}

export interface MenuState {
    data: MenuItem[];
    loading: boolean;
    error: string | null;
    stale: boolean;
}

const CACHE_KEY = 'lanchedasi_menu_cache';

function createMenuStore() {
    const { subscribe, set, update } = writable<MenuState>({
        data: [],
        loading: false,
        error: null,
        stale: false
    });

    async function fetchMenu() {
        update(s => ({ ...s, loading: true, error: null }));

        try {
            // Em um site estático, buscamos o JSON estático em vez de uma API dinâmica
            const response = await fetch('/data/menu.json');
            if (!response.ok) throw new Error('Falha ao buscar menu');
            
            const rawData = await response.json();
            
            // Mapear os dados do JSON para o formato do MenuItem
            const allItems = [
                ...(rawData.combos || []),
                ...(rawData.sanduiches || []),
                ...(rawData.kikao || []),
                ...(rawData.porcoes || []),
                ...(rawData.pratos || []),
                ...(rawData.bebidas || [])
            ];
            
            const data: MenuItem[] = allItems
                .filter(item => item.popular)
                .map(item => ({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    image: item.image,
                    available: item.isAvailable ?? true
                }));
            
            if (browser) {
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    data,
                    timestamp: Date.now()
                }));
            }

            set({
                data,
                loading: false,
                error: null,
                stale: false
            });
        } catch (err) {
            console.error('Fetch error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            
            update(s => ({
                ...s,
                loading: false,
                error: errorMessage,
                stale: s.data.length > 0
            }));
        }
    }

    function init() {
        if (!browser) return;

        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const { data } = JSON.parse(cached);
                set({
                    data,
                    loading: true, // Ainda vamos buscar o fresh
                    error: null,
                    stale: true
                });
            } catch (e) {
                console.error('Erro ao ler cache:', e);
            }
        }

        fetchMenu();
    }

    return {
        subscribe,
        init,
        refresh: fetchMenu
    };
}

export const menuStore = createMenuStore();
