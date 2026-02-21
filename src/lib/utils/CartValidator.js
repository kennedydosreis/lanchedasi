/**
 * Cart Validator - Security and data integrity for cart operations
 * Prevents price manipulation, validates quantities, and ensures cart data integrity
 */

import { findItemById } from './loadMenu.js';

/**
 * Validate a single item against menu data
 * @param {Object} item - Cart item to validate
 * @param {Object} menuData - Current menu data
 * @returns {Object} Validation result with { valid, error, validatedItem }
 */
export function validateItem(item, menuData) {
    if (!item || !item.id) {
        return {
            valid: false,
            error: 'Item inválido: ID ausente',
            validatedItem: null
        };
    }

    // Find the real item in menu
    const menuItem = findItemById(menuData, item.id);

    if (!menuItem) {
        return {
            valid: false,
            error: `Item não encontrado no cardápio: ${item.id}`,
            validatedItem: null
        };
    }

    // Check if price matches
    if (item.price !== menuItem.price) {
        console.warn(`Price mismatch for ${item.id}: cart=${item.price}, menu=${menuItem.price}`);
        return {
            valid: false,
            error: `Preço incorreto para ${menuItem.name}`,
            validatedItem: {
                ...item,
                price: menuItem.price, // Use real price from menu
                name: menuItem.name,
                description: menuItem.description,
                image: menuItem.image
            }
        };
    }

    return {
        valid: true,
        error: null,
        validatedItem: {
            ...item,
            // Ensure we have all necessary fields from menu
            name: menuItem.name,
            description: menuItem.description,
            image: menuItem.image,
            category: menuItem.category
        }
    };
}

/**
 * Sanitize quantity to safe values
 * @param {number|string} qty - Quantity to sanitize
 * @returns {number} Safe quantity value
 */
export function sanitizeQuantity(qty) {
    // Convert to number
    const num = Number(qty);

    // Reject invalid numbers (NaN)
    if (isNaN(num)) {
        return 1; // Default to 1 for NaN
    }

    // Handle Infinity cases
    if (!isFinite(num)) {
        // Positive infinity -> max, negative infinity -> min
        return num > 0 ? 10 : 1;
    }

    // Enforce bounds
    const MIN_QTY = 1;
    const MAX_QTY = 10;

    if (num < MIN_QTY) return MIN_QTY;
    if (num > MAX_QTY) return MAX_QTY;

    // Round to integer
    return Math.floor(num);
}

/**
 * Recalculate entire cart with real prices from menu
 * @param {Array} cartItems - Current cart items
 * @param {Object} menuData - Current menu data
 * @returns {Object} Recalculated cart with { items, invalid, errors }
 */
export function recalculateCart(cartItems, menuData) {
    if (!Array.isArray(cartItems)) {
        return {
            items: [],
            invalid: [],
            errors: ['Carrinho inválido']
        };
    }

    const validItems = [];
    const invalidItems = [];
    const errors = [];

    for (const item of cartItems) {
        // Sanitize quantity first
        const safeQuantity = sanitizeQuantity(item.quantity);

        // Validate item
        const validation = validateItem(
            { ...item, quantity: safeQuantity },
            menuData
        );

        if (validation.valid) {
            validItems.push({
                ...validation.validatedItem,
                quantity: safeQuantity
            });
        } else {
            // If we have a validated item with corrected price, use it
            if (validation.validatedItem) {
                validItems.push({
                    ...validation.validatedItem,
                    quantity: safeQuantity
                });
                errors.push(`${validation.error} - preço corrigido`);
            } else {
                invalidItems.push(item);
                errors.push(validation.error);
            }
        }
    }

    return {
        items: validItems,
        invalid: invalidItems,
        errors: errors.length > 0 ? errors : null
    };
}

/**
 * Calculate cart total with validated prices
 * @param {Array} cartItems - Cart items (should be validated first)
 * @returns {number} Total price
 */
export function calculateTotal(cartItems) {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = sanitizeQuantity(item.quantity);
        return total + (price * quantity);
    }, 0);
}

/**
 * Truncate WhatsApp message if it exceeds length limit
 * @param {string} message - Full message
 * @param {number} maxChars - Maximum characters (default 1800)
 * @returns {Object} { message, truncated }
 */
export function truncateWhatsAppMessage(message, maxChars = 1800) {
    if (!message || typeof message !== 'string') {
        return { message: '', truncated: false };
    }

    if (message.length <= maxChars) {
        return { message, truncated: false };
    }

    // Try to truncate at a line break near the limit
    const cutoff = maxChars - 100; // Leave room for ellipsis message
    const lastNewline = message.lastIndexOf('\n', cutoff);
    
    const truncateAt = lastNewline > cutoff - 200 ? lastNewline : cutoff;
    
    const truncated = message.substring(0, truncateAt) + 
        '\n\n⚠️ Mensagem muito grande - itens resumidos.\n' +
        'Entre em contato para completar o pedido.';

    return {
        message: truncated,
        truncated: true
    };
}

/**
 * Validate cart before checkout
 * @param {Array} cartItems - Cart items to validate
 * @param {Object} menuData - Current menu data
 * @returns {Object} Validation result with { valid, errors, validatedCart, total }
 */
export function validateCartForCheckout(cartItems, menuData) {
    if (!cartItems || cartItems.length === 0) {
        return {
            valid: false,
            errors: ['Carrinho vazio'],
            validatedCart: [],
            total: 0
        };
    }

    const recalculated = recalculateCart(cartItems, menuData);
    
    if (recalculated.invalid.length > 0) {
        return {
            valid: false,
            errors: recalculated.errors || ['Itens inválidos no carrinho'],
            validatedCart: recalculated.items,
            total: calculateTotal(recalculated.items),
            invalidItems: recalculated.invalid
        };
    }

    return {
        valid: true,
        errors: recalculated.errors, // May have warnings
        validatedCart: recalculated.items,
        total: calculateTotal(recalculated.items)
    };
}
