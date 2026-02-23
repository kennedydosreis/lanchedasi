const CART_STORAGE_KEY = 'lanchedasi_cart';

export class CartRepository {
    /**
     * @returns {Array}
     */
    static getCart() {
        if (typeof window === 'undefined') return [];
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Failed to load cart from localStorage', e);
            return [];
        }
    }

    /**
     * @param {Array} items 
     */
    static saveCart(items) {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (e) {
            console.error('Failed to save cart to localStorage', e);
        }
    }

    static clearCart() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(CART_STORAGE_KEY);
    }
}
