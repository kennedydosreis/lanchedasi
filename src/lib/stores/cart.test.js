import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { cart } from './cart.js';

describe('cart store', () => {
    beforeEach(() => {
        cart.clear();
    });

    describe('addItem', () => {
        it('should add a new item with quantity 1', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            
            cart.addItem(item);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(1);
            expect(cartItems[0]).toEqual({ ...item, quantity: 1 });
        });

        it('should increment quantity when adding same item twice', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            
            cart.addItem(item);
            cart.addItem(item);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(1);
            expect(cartItems[0].quantity).toBe(2);
        });

        it('should handle multiple different items', () => {
            const item1 = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            const item2 = { id: 'item-2', name: 'Kikão Simples', price: 8.00 };
            
            cart.addItem(item1);
            cart.addItem(item2);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(2);
            expect(cartItems[0].id).toBe('item-1');
            expect(cartItems[1].id).toBe('item-2');
        });
    });

    describe('removeItem', () => {
        it('should remove an item from the cart', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.removeItem('item-1');
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(0);
        });

        it('should only remove the specified item', () => {
            const item1 = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            const item2 = { id: 'item-2', name: 'Kikão Simples', price: 8.00 };
            cart.addItem(item1);
            cart.addItem(item2);
            
            cart.removeItem('item-1');
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(1);
            expect(cartItems[0].id).toBe('item-2');
        });

        it('should handle removing non-existent item gracefully', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.removeItem('non-existent');
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(1);
        });
    });

    describe('updateQuantity', () => {
        it('should update item quantity', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', 5);
            
            const cartItems = get(cart);
            expect(cartItems[0].quantity).toBe(5);
        });

        it('should remove item when quantity is set to 0', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', 0);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(0);
        });

        it('should remove item when quantity is negative', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', -1);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(0);
        });
    });

    describe('clear', () => {
        it('should remove all items from the cart', () => {
            cart.addItem({ id: 'item-1', name: 'X-Salada', price: 12.00 });
            cart.addItem({ id: 'item-2', name: 'Kikão Simples', price: 8.00 });
            
            cart.clear();
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(0);
        });
    });

    describe('getTotal', () => {
        it('should return 0 for empty cart', () => {
            const total = cart.getTotal([]);
            expect(total).toBe(0);
        });

        it('should calculate total for single item', () => {
            const cartItems = [{ id: 'item-1', price: 12.00, quantity: 1 }];
            const total = cart.getTotal(cartItems);
            expect(total).toBe(12.00);
        });

        it('should calculate total with multiple quantities', () => {
            const cartItems = [{ id: 'item-1', price: 12.00, quantity: 3 }];
            const total = cart.getTotal(cartItems);
            expect(total).toBe(36.00);
        });

        it('should calculate total for multiple items', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: 2 },
                { id: 'item-2', price: 8.00, quantity: 3 }
            ];
            const total = cart.getTotal(cartItems);
            expect(total).toBe(48.00); // (12*2) + (8*3)
        });
    });

    describe('getItemCount', () => {
        it('should return 0 for empty cart', () => {
            const count = cart.getItemCount([]);
            expect(count).toBe(0);
        });

        it('should return quantity for single item', () => {
            const cartItems = [{ id: 'item-1', quantity: 3 }];
            const count = cart.getItemCount(cartItems);
            expect(count).toBe(3);
        });

        it('should sum quantities for multiple items', () => {
            const cartItems = [
                { id: 'item-1', quantity: 2 },
                { id: 'item-2', quantity: 4 }
            ];
            const count = cart.getItemCount(cartItems);
            expect(count).toBe(6);
        });
    });
});
