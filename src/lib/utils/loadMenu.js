/**
 * Menu data loader with fallback mechanism
 * Fetches menu data from external JSON file with error handling
 */

import { dev } from '$app/environment';
import { base } from '$app/paths';

let cachedMenuData = null;

/**
 * Load menu data from JSON file
 * @returns {Promise<Object>} Menu data object
 */
export async function loadMenuData() {
    // Return cached data if available (client-side only)
    if (typeof window !== 'undefined' && cachedMenuData) {
        return cachedMenuData;
    }

    try {
        // Construct URL with base path support for GitHub Pages
        const url = `${base}/data/menu.json`;
        
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Validate basic structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid menu data structure');
        }

        // Cache the data (client-side)
        if (typeof window !== 'undefined') {
            cachedMenuData = data;
        }

        return data;
    } catch (error) {
        console.error('Error loading menu data:', error);
        
        // Fallback: return empty menu structure
        return getFallbackMenu();
    }
}

/**
 * Get fallback menu structure when external JSON fails
 * @returns {Object} Empty menu structure
 */
function getFallbackMenu() {
    return {
        version: '0.0',
        combos: [],
        sanduiches: [],
        kikao: [],
        bebidas: [],
        porcoes: [],
        pratos: [],
        sobremesas: []
    };
}

/**
 * Get all items from all categories as a flat array
 * @param {Object} menuData - Menu data object
 * @returns {Array} All menu items
 */
export function getAllItems(menuData) {
    const categories = ['combos', 'sanduiches', 'kikao', 'bebidas', 'porcoes', 'pratos', 'sobremesas'];
    return categories.flatMap(cat => menuData[cat] || []);
}

/**
 * Find an item by ID across all categories
 * @param {Object} menuData - Menu data object
 * @param {string} itemId - Item ID to find
 * @returns {Object|null} Item object or null if not found
 */
export function findItemById(menuData, itemId) {
    const allItems = getAllItems(menuData);
    return allItems.find(item => item.id === itemId) || null;
}

/**
 * Clear cached menu data (useful for testing or updates)
 */
export function clearMenuCache() {
    cachedMenuData = null;
}
