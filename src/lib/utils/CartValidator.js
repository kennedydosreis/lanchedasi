import { findItemById } from './loadMenu.js';

export function validateItem(item, menuData) {
    if (!item?.id) {
        return { valid: false, error: 'Item inválido: ID ausente', validatedItem: null };
    }

    const menuItem = findItemById(menuData, item.id);
    if (!menuItem) {
        return { valid: false, error: `Item não encontrado no cardápio: ${item.id}`, validatedItem: null };
    }

    const validatedItem = {
        ...item,
        price: menuItem.price,
        name: menuItem.name,
        description: menuItem.description,
        image: menuItem.image,
        category: menuItem.category
    };

    if (item.price !== menuItem.price) {
        console.warn(`Price mismatch for ${item.id}: cart=${item.price}, menu=${menuItem.price}`);
        return { valid: false, error: `Preço incorreto para ${menuItem.name}`, validatedItem };
    }

    return { valid: true, error: null, validatedItem };
}

export function sanitizeQuantity(qty) {
    const num = Number(qty);
    if (isNaN(num)) return 1;
    if (!isFinite(num)) return num > 0 ? 10 : 1;
    return Math.max(1, Math.min(10, Math.floor(num)));
}

export function recalculateCart(cartItems, menuData) {
    if (!Array.isArray(cartItems)) {
        return { items: [], invalid: [], errors: ['Carrinho inválido'] };
    }

    const validItems = [];
    const invalidItems = [];
    const errors = [];

    for (const item of cartItems) {
        const safeQuantity = sanitizeQuantity(item.quantity);
        const validation = validateItem({ ...item, quantity: safeQuantity }, menuData);

        if (validation.valid || validation.validatedItem) {
            validItems.push({ ...validation.validatedItem, quantity: safeQuantity });
            if (!validation.valid) {
                errors.push(`${validation.error} - preço corrigido`);
            }
        } else {
            invalidItems.push(item);
            errors.push(validation.error);
        }
    }

    return { items: validItems, invalid: invalidItems, errors: errors.length ? errors : null };
}

export function calculateTotal(cartItems) {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
        return total + (Number(item.price) || 0) * sanitizeQuantity(item.quantity);
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
    if (!cartItems?.length) {
        return { valid: false, errors: ['Carrinho vazio'], validatedCart: [], total: 0 };
    }

    const recalculated = recalculateCart(cartItems, menuData);
    const total = calculateTotal(recalculated.items);
    
    if (recalculated.invalid.length > 0) {
        return {
            valid: false,
            errors: recalculated.errors || ['Itens inválidos no carrinho'],
            validatedCart: recalculated.items,
            total,
            invalidItems: recalculated.invalid
        };
    }

    return { valid: true, errors: recalculated.errors, validatedCart: recalculated.items, total };
}
