import { writable } from 'svelte/store';
import { sanitizeQuantity } from '$lib/utils/CartValidator.ts';

function createCart() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        addItem: (item) => update(cart => {
            // Validate item has required fields
            if (!item || !item.id || !item.name || item.price === undefined) {
                console.error('Invalid item:', item);
                return cart;
            }

            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // Sanitize new quantity
                const newQuantity = sanitizeQuantity(existingItem.quantity + 1);
                existingItem.quantity = newQuantity;
                return [...cart];
            } else {
                return [...cart, { ...item, quantity: 1 }];
            }
        }),
        removeItem: (id) => update(cart => cart.filter(item => item.id !== id)),
        updateQuantity: (id, quantity) => update(cart => {
            // Check for zero or negative before sanitization to allow removal
            const num = Number(quantity);
            if (!isNaN(num) && isFinite(num) && num <= 0) {
                return cart.filter(item => item.id !== id);
            }
            
            // Sanitize quantity input for positive values
            const safeQuantity = sanitizeQuantity(quantity);
            
            const item = cart.find(cartItem => cartItem.id === id);
            if (item) {
                item.quantity = safeQuantity;
            }
            return [...cart];
        }),
        clear: () => set([]),
        getTotal: (cartItems) => {
            return cartItems.reduce((total, item) => {
                const price = Number(item.price) || 0;
                const quantity = sanitizeQuantity(item.quantity);
                return total + (price * quantity);
            }, 0);
        },
        getItemCount: (cartItems) => {
            return cartItems.reduce((count, item) => {
                const quantity = sanitizeQuantity(item.quantity);
                return count + quantity;
            }, 0);
        }
    };
}

export const cart = createCart();
