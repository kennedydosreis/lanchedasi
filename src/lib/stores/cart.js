import { writable } from 'svelte/store';
import { sanitizeQuantity } from '$lib/utils/CartValidator.ts';
import { CartRepository } from '$lib/repositories/CartRepository';

function createCart() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        init: () => {
            const initialCart = CartRepository.getCart();
            set(initialCart);
        },
        addItem: (item) => update(cart => {
            // Validate item availability and required fields
            if (!item || !item.id || !item.name || item.price === undefined || item.isAvailable === false) {
                console.warn('Item not available or invalid:', item);
                return cart;
            }

            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            let newCart;
            if (existingItemIndex !== -1) {
                newCart = [...cart];
                // Sanitize new quantity
                const newQuantity = sanitizeQuantity(newCart[existingItemIndex].quantity + 1);
                newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newQuantity };
            } else {
                newCart = [...cart, { ...item, quantity: 1 }];
            }
            CartRepository.saveCart(newCart);
            return newCart;
        }),
        removeItem: (id) => update(cart => {
            const newCart = cart.filter(item => item.id !== id);
            CartRepository.saveCart(newCart);
            return newCart;
        }),
        updateQuantity: (id, quantity) => update(cart => {
            let newCart;
            // Check for zero or negative before sanitization to allow removal
            const num = Number(quantity);
            if (!isNaN(num) && isFinite(num) && num <= 0) {
                newCart = cart.filter(item => item.id !== id);
            } else {
                // Sanitize quantity input for positive values
                const safeQuantity = sanitizeQuantity(quantity);
                
                newCart = cart.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: safeQuantity };
                    }
                    return item;
                });
            }
            CartRepository.saveCart(newCart);
            return newCart;
        }),
        clear: () => {
            CartRepository.clearCart();
            set([]);
        },
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
