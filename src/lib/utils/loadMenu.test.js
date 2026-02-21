import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock $app/environment and $app/paths before importing the module
vi.mock('$app/environment', () => ({
    dev: false
}));

vi.mock('$app/paths', () => ({
    base: ''
}));

// Import after mocks are set up
import { getAllItems, findItemById, clearMenuCache, loadMenuData } from './loadMenu.js';

const mockMenuData = {
    version: '1.0',
    combos: [
        { id: 'combo-1', name: 'Combo X-Salada', price: 25.00, category: 'combos', description: 'Test', image: '/test.jpg' }
    ],
    sanduiches: [
        { id: 'sand-1', name: 'X-Salada', price: 12.00, category: 'sanduiches', description: 'Test', image: '/test.jpg' },
        { id: 'sand-2', name: 'X-Tudo', price: 20.00, category: 'sanduiches', description: 'Test', image: '/test.jpg' }
    ],
    kikao: [
        { id: 'kikao-1', name: 'Kikão Simples', price: 8.00, category: 'kikao', description: 'Test', image: '/test.jpg' }
    ],
    bebidas: [
        { id: 'bebida-1', name: 'Coca-Cola', price: 6.00, category: 'bebidas', description: 'Test', image: '/test.jpg' }
    ],
    porcoes: [],
    pratos: [],
    sobremesas: []
};

describe('loadMenu utilities', () => {
    describe('getAllItems', () => {
        it('should return all items from all categories as a flat array', () => {
            const items = getAllItems(mockMenuData);
            
            expect(items).toHaveLength(5);
            expect(items.map(i => i.id)).toContain('combo-1');
            expect(items.map(i => i.id)).toContain('sand-1');
            expect(items.map(i => i.id)).toContain('sand-2');
            expect(items.map(i => i.id)).toContain('kikao-1');
            expect(items.map(i => i.id)).toContain('bebida-1');
        });

        it('should return empty array for empty menu data', () => {
            const emptyMenu = {
                combos: [],
                sanduiches: [],
                kikao: [],
                bebidas: [],
                porcoes: [],
                pratos: [],
                sobremesas: []
            };
            
            const items = getAllItems(emptyMenu);
            expect(items).toHaveLength(0);
        });

        it('should handle missing categories gracefully', () => {
            const partialMenu = {
                sanduiches: [
                    { id: 'sand-1', name: 'X-Salada', price: 12.00 }
                ]
            };
            
            const items = getAllItems(partialMenu);
            expect(items).toHaveLength(1);
            expect(items[0].id).toBe('sand-1');
        });

        it('should handle undefined categories', () => {
            const menuWithUndefined = {
                sanduiches: undefined,
                bebidas: [{ id: 'beb-1', name: 'Suco', price: 5.00 }]
            };
            
            const items = getAllItems(menuWithUndefined);
            expect(items).toHaveLength(1);
        });
    });

    describe('findItemById', () => {
        it('should find an item by its ID', () => {
            const item = findItemById(mockMenuData, 'sand-1');
            
            expect(item).not.toBeNull();
            expect(item.id).toBe('sand-1');
            expect(item.name).toBe('X-Salada');
            expect(item.price).toBe(12.00);
        });

        it('should return null for non-existent ID', () => {
            const item = findItemById(mockMenuData, 'non-existent-id');
            expect(item).toBeNull();
        });

        it('should find items across different categories', () => {
            expect(findItemById(mockMenuData, 'combo-1')?.category).toBe('combos');
            expect(findItemById(mockMenuData, 'sand-2')?.category).toBe('sanduiches');
            expect(findItemById(mockMenuData, 'kikao-1')?.category).toBe('kikao');
            expect(findItemById(mockMenuData, 'bebida-1')?.category).toBe('bebidas');
        });

        it('should return null for empty menu data', () => {
            const emptyMenu = {
                combos: [],
                sanduiches: [],
                kikao: [],
                bebidas: [],
                porcoes: [],
                pratos: [],
                sobremesas: []
            };
            
            const item = findItemById(emptyMenu, 'any-id');
            expect(item).toBeNull();
        });

        it('should return null for undefined ID', () => {
            const item = findItemById(mockMenuData, undefined);
            expect(item).toBeNull();
        });

        it('should return null for null ID', () => {
            const item = findItemById(mockMenuData, null);
            expect(item).toBeNull();
        });
    });

    describe('clearMenuCache', () => {
        it('should clear the menu cache without errors', () => {
            // This should not throw
            expect(() => clearMenuCache()).not.toThrow();
        });

        it('should be callable multiple times', () => {
            clearMenuCache();
            clearMenuCache();
            clearMenuCache();
            // Should not throw
            expect(true).toBe(true);
        });
    });
});

describe('loadMenuData', () => {
    beforeEach(() => {
        clearMenuCache();
        vi.restoreAllMocks();
    });

    it('should fetch menu data successfully', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(mockMenuData)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const data = await loadMenuData();
        
        expect(global.fetch).toHaveBeenCalledWith('/data/menu.json', {
            headers: { 'Content-Type': 'application/json' }
        });
        expect(data).toEqual(mockMenuData);
    });

    it('should return fallback menu on HTTP error', async () => {
        const mockResponse = {
            ok: false,
            status: 404
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const data = await loadMenuData();
        
        expect(data).toHaveProperty('version', '0.0');
        expect(data).toHaveProperty('combos');
        expect(data).toHaveProperty('sanduiches');
        expect(data.combos).toEqual([]);
    });

    it('should return fallback menu on network error', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

        const data = await loadMenuData();
        
        expect(data).toHaveProperty('version', '0.0');
        expect(data.sanduiches).toEqual([]);
    });

    it('should return fallback menu for invalid data structure (non-object)', async () => {
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue(null)
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const data = await loadMenuData();
        
        expect(data).toHaveProperty('version', '0.0');
    });

    it('should return data for array response (arrays pass typeof object check)', async () => {
        // Note: Arrays pass the typeof check since typeof [] === 'object'
        // The current implementation accepts arrays as valid data
        const mockResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue([])
        };
        global.fetch = vi.fn().mockResolvedValue(mockResponse);

        const data = await loadMenuData();
        
        // Arrays are returned as-is since they pass the object check
        expect(Array.isArray(data)).toBe(true);
    });

    it('fallback menu should have all expected categories', async () => {
        global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

        const data = await loadMenuData();
        
        expect(data).toHaveProperty('combos');
        expect(data).toHaveProperty('sanduiches');
        expect(data).toHaveProperty('kikao');
        expect(data).toHaveProperty('bebidas');
        expect(data).toHaveProperty('porcoes');
        expect(data).toHaveProperty('pratos');
        expect(data).toHaveProperty('sobremesas');
    });
});
