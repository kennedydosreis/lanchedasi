import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { cart } from './cart.js';
import { 
    validateItem, 
    sanitizeQuantity, 
    recalculateCart, 
    calculateTotal,
    truncateWhatsAppMessage,
    validateCartForCheckout
} from '../utils/CartValidator.ts';

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

        it('should reject items without required fields', () => {
            const invalidItem = { id: 'item-1' }; // Missing name and price
            
            cart.addItem(invalidItem);
            
            const cartItems = get(cart);
            expect(cartItems).toHaveLength(0);
        });

        it('should cap quantity at max when adding repeatedly', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            
            // Add 12 times (should cap at 10)
            for (let i = 0; i < 12; i++) {
                cart.addItem(item);
            }
            
            const cartItems = get(cart);
            expect(cartItems[0].quantity).toBe(10); // Max quantity
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

        it('should sanitize NaN quantity to 1', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', NaN);
            
            const cartItems = get(cart);
            expect(cartItems[0].quantity).toBe(1);
        });

        it('should sanitize Infinity quantity to max', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', Infinity);
            
            const cartItems = get(cart);
            expect(cartItems[0].quantity).toBe(10); // Max quantity
        });

        it('should cap quantity at maximum', () => {
            const item = { id: 'item-1', name: 'X-Salada', price: 12.00 };
            cart.addItem(item);
            
            cart.updateQuantity('item-1', 999);
            
            const cartItems = get(cart);
            expect(cartItems[0].quantity).toBe(10); // Max quantity
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

        it('should sanitize quantities when calculating total', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: NaN },
                { id: 'item-2', price: 8.00, quantity: 999 }
            ];
            const total = cart.getTotal(cartItems);
            expect(total).toBe(92.00); // (12*1) + (8*10) - sanitized
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

describe('CartValidator', () => {
    const mockMenuData = {
        sanduiches: [
            { id: 'item-1', name: 'X-Salada', price: 12.00, category: 'sanduiches', description: 'Test', image: '/test.jpg' },
            { id: 'item-2', name: 'X-Tudo', price: 20.00, category: 'sanduiches', description: 'Test', image: '/test.jpg' }
        ],
        bebidas: [
            { id: 'item-3', name: 'Coca-Cola', price: 6.00, category: 'bebidas', description: 'Test', image: '/test.jpg' }
        ],
        combos: [],
        kikao: [],
        porcoes: [],
        pratos: [],
        sobremesas: []
    };

    describe('sanitizeQuantity', () => {
        it('should return 1 for NaN', () => {
            expect(sanitizeQuantity(NaN)).toBe(1);
        });

        it('should cap Infinity at max (10)', () => {
            expect(sanitizeQuantity(Infinity)).toBe(10); // Capped at max
        });

        it('should return 1 for negative Infinity', () => {
            expect(sanitizeQuantity(-Infinity)).toBe(1); // Min
        });

        it('should return min (1) for values below minimum', () => {
            expect(sanitizeQuantity(0)).toBe(1);
            expect(sanitizeQuantity(-5)).toBe(1);
        });

        it('should return max (10) for values above maximum', () => {
            expect(sanitizeQuantity(11)).toBe(10);
            expect(sanitizeQuantity(999)).toBe(10);
        });

        it('should return value for valid range', () => {
            expect(sanitizeQuantity(1)).toBe(1);
            expect(sanitizeQuantity(5)).toBe(5);
            expect(sanitizeQuantity(10)).toBe(10);
        });

        it('should floor decimal values', () => {
            expect(sanitizeQuantity(3.7)).toBe(3);
            expect(sanitizeQuantity(9.9)).toBe(9);
        });
    });

    describe('validateItem', () => {
        it('should validate correct item', () => {
            const item = { id: 'item-1', price: 12.00, quantity: 1 };
            const result = validateItem(item, mockMenuData);
            
            expect(result.valid).toBe(true);
            expect(result.error).toBe(null);
            expect(result.validatedItem.name).toBe('X-Salada');
        });

        it('should detect price manipulation', () => {
            const item = { id: 'item-1', price: 0.01, quantity: 1 }; // Manipulated price
            const result = validateItem(item, mockMenuData);
            
            expect(result.valid).toBe(false);
            expect(result.error).toContain('Preço incorreto');
            expect(result.validatedItem.price).toBe(12.00); // Corrected price
        });

        it('should reject non-existent item', () => {
            const item = { id: 'fake-item', price: 5.00, quantity: 1 };
            const result = validateItem(item, mockMenuData);
            
            expect(result.valid).toBe(false);
            expect(result.error).toContain('não encontrado');
        });

        it('should reject item without ID', () => {
            const item = { price: 12.00, quantity: 1 };
            const result = validateItem(item, mockMenuData);
            
            expect(result.valid).toBe(false);
            expect(result.error).toContain('ID ausente');
        });
    });

    describe('recalculateCart', () => {
        it('should recalculate cart with correct prices', () => {
            const cartItems = [
                { id: 'item-1', price: 0.01, quantity: 2 }, // Manipulated
                { id: 'item-2', price: 20.00, quantity: 1 } // Correct
            ];
            
            const result = recalculateCart(cartItems, mockMenuData);
            
            expect(result.items).toHaveLength(2);
            expect(result.items[0].price).toBe(12.00); // Corrected
            expect(result.items[1].price).toBe(20.00); // Unchanged
            expect(result.errors).toBeTruthy();
        });

        it('should remove non-existent items', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: 1 },
                { id: 'fake-item', price: 5.00, quantity: 1 }
            ];
            
            const result = recalculateCart(cartItems, mockMenuData);
            
            expect(result.items).toHaveLength(1);
            expect(result.invalid).toHaveLength(1);
        });

        it('should sanitize all quantities', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: NaN },
                { id: 'item-2', price: 20.00, quantity: 999 }
            ];
            
            const result = recalculateCart(cartItems, mockMenuData);
            
            expect(result.items[0].quantity).toBe(1); // NaN -> 1
            expect(result.items[1].quantity).toBe(10); // 999 -> 10 (max)
        });
    });

    describe('calculateTotal', () => {
        it('should calculate total correctly', () => {
            const items = [
                { id: 'item-1', price: 12.00, quantity: 2 },
                { id: 'item-2', price: 8.00, quantity: 3 }
            ];
            
            const total = calculateTotal(items);
            expect(total).toBe(48.00); // (12*2) + (8*3)
        });

        it('should handle empty array', () => {
            expect(calculateTotal([])).toBe(0);
        });

        it('should handle null/undefined', () => {
            expect(calculateTotal(null)).toBe(0);
            expect(calculateTotal(undefined)).toBe(0);
        });
    });

    describe('truncateWhatsAppMessage', () => {
        it('should not truncate short messages', () => {
            const message = 'Short message';
            const result = truncateWhatsAppMessage(message);
            
            expect(result.truncated).toBe(false);
            expect(result.message).toBe(message);
        });

        it('should truncate very long messages', () => {
            const longMessage = 'a'.repeat(2000);
            const result = truncateWhatsAppMessage(longMessage);
            
            expect(result.truncated).toBe(true);
            expect(result.message.length).toBeLessThan(1900);
            expect(result.message).toContain('Mensagem muito grande');
        });

        it('should truncate at line breaks when possible', () => {
            const message = 'a'.repeat(1600) + '\n' + 'b'.repeat(500);
            const result = truncateWhatsAppMessage(message, 1800);
            
            expect(result.truncated).toBe(true);
            expect(result.message).toContain('⚠️');
        });

        it('should handle empty messages', () => {
            const result = truncateWhatsAppMessage('');
            expect(result.message).toBe('');
            expect(result.truncated).toBe(false);
        });
    });

    describe('validateCartForCheckout', () => {
        it('should validate valid cart', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: 2 }
            ];
            
            const result = validateCartForCheckout(cartItems, mockMenuData);
            
            expect(result.valid).toBe(true);
            expect(result.total).toBe(24.00);
            expect(result.validatedCart).toHaveLength(1);
        });

        it('should reject empty cart', () => {
            const result = validateCartForCheckout([], mockMenuData);
            
            expect(result.valid).toBe(false);
            expect(result.errors).toContain('Carrinho vazio');
        });

        it('should handle cart with invalid items', () => {
            const cartItems = [
                { id: 'item-1', price: 12.00, quantity: 1 },
                { id: 'fake-item', price: 5.00, quantity: 1 }
            ];
            
            const result = validateCartForCheckout(cartItems, mockMenuData);
            
            expect(result.valid).toBe(false);
            expect(result.validatedCart).toHaveLength(1); // Only valid items
            expect(result.invalidItems).toHaveLength(1);
        });
    });
});
