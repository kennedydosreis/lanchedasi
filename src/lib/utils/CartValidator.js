import { findItemById } from './loadMenu.js';

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

export function sanitizeQuantity(qty) {
    const num = Number(qty);
    if (isNaN(num)) return 1;
    if (!isFinite(num)) return num > 0 ? 10 : 1;
    return Math.max(1, Math.min(10, Math.floor(num)));
}

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

export function calculateTotal(cartItems) {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
        const price = Number(item.price) || 0;
        const quantity = sanitizeQuantity(item.quantity);
        return total + (price * quantity);
    }, 0);
}

export function truncateWhatsAppMessage(message, maxChars = 1800) {
    if (!message || typeof message !== 'string') {
        return { message: '', truncated: false };
    }
    if (message.length <= maxChars) {
        return { message, truncated: false };
    }

    const cutoff = maxChars - 100;
    const lastNewline = message.lastIndexOf('\n', cutoff);
    const truncateAt = lastNewline > cutoff - 200 ? lastNewline : cutoff;
    
    return {
        message: message.substring(0, truncateAt) + 
            '\n\n⚠️ Mensagem muito grande - itens resumidos.\n' +
            'Entre em contato para completar o pedido.',
        truncated: true
    };
}

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
