import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function createCart() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        addItem: (item) => update(cart => {
            const existingItem = cart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
                return [...cart];
            } else {
                return [...cart, { ...item, quantity: 1 }];
            }
        }),
        removeItem: (id) => update(cart => cart.filter(item => item.id !== id)),
        updateQuantity: (id, quantity) => update(cart => {
            if (quantity <= 0) {
                return cart.filter(item => item.id !== id);
            }
            const item = cart.find(cartItem => cartItem.id === id);
            if (item) {
                item.quantity = quantity;
            }
            return [...cart];
        }),
        clear: () => set([]),
        getTotal: (cartItems) => {
            return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        },
        getItemCount: (cartItems) => {
            return cartItems.reduce((count, item) => count + item.quantity, 0);
        }
    };
}

export const cart = createCart();
