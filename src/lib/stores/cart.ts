import { writable, type Writable } from 'svelte/store';
import { sanitizeQuantity } from '$lib/utils/CartValidator';
import { CartRepository } from '$lib/repositories/CartRepository';
import { PriceService } from '$lib/services/PriceService';
import type { CartItem, Product } from '$lib/types/models';

export interface CartStore extends Writable<CartItem[]> {
    init: () => void;
    addItem: (item: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clear: () => void;
    getTotal: (cartItems: CartItem[]) => number;
    getItemCount: (cartItems: CartItem[]) => number;
}

function createCart(): CartStore {
    const { subscribe, set, update } = writable<CartItem[]>([]);

    return {
        subscribe,
        set,
        update,
        init: () => {
            const initialCart = CartRepository.getCart() as CartItem[];
            set(initialCart);
        },
        addItem: (item: Product) => update(cart => {
            if (!item || !item.id || !item.name || item.price === undefined || item.isAvailable === false) {
                console.warn('Item not available or invalid:', item);
                return cart;
            }

            const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
            let newCart: CartItem[];
            if (existingItemIndex !== -1) {
                newCart = [...cart];
                const newQuantity = sanitizeQuantity(newCart[existingItemIndex].quantity + 1);
                newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newQuantity };
            } else {
                newCart = [...cart, { ...item, quantity: 1 }];
            }
            CartRepository.saveCart(newCart);
            return newCart;
        }),
        removeItem: (id: string) => update(cart => {
            const newCart = cart.filter(item => item.id !== id);
            CartRepository.saveCart(newCart);
            return newCart;
        }),
        updateQuantity: (id: string, quantity: number) => update(cart => {
            let newCart: CartItem[];
            const num = Number(quantity);
            if (!isNaN(num) && isFinite(num) && num <= 0) {
                newCart = cart.filter(item => item.id !== id);
            } else {
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
        getTotal: (cartItems: CartItem[]) => PriceService.calculateTotal(cartItems),
        getItemCount: (cartItems: CartItem[]) => PriceService.calculateItemCount(cartItems)
    };
}

export const cart = createCart();
