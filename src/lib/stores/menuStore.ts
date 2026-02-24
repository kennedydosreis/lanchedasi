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
            // Em um cenário real, aqui seria a chamada para a API de borda
            // Simulando fetch com atraso
            const response = await fetch('/api/menu');
            if (!response.ok) throw new Error('Falha ao buscar menu');
            
            const data: MenuItem[] = await response.json();
            
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
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            
            update(s => ({
                ...s,
                loading: false,
                error: errorMessage,
                // Se temos dados (do cache), marcamos como stale mas mantemos funcional
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
