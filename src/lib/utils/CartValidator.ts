import { findItemById } from './loadMenu.js';
import type { MenuItem, MenuData } from '$lib/types/menu';

/**
 * Interface para item no carrinho
 */
export interface CartItem extends MenuItem {
  quantity: number;
}

/**
 * Interface para resultado de validação de item
 */
export interface ValidationResult {
  valid: boolean;
  error: string | null;
  validatedItem: CartItem | null;
}

/**
 * Interface para resultado de recálculo do carrinho
 */
export interface RecalculateResult {
  items: CartItem[];
  invalid: CartItem[];
  errors: string[] | null;
}

/**
 * Interface para resultado de validação de checkout
 */
export interface CheckoutValidationResult {
  valid: boolean;
  errors: string[] | null;
  validatedCart: CartItem[];
  total: number;
  invalidItems?: CartItem[];
}

/**
 * Interface para resultado de truncamento de mensagem
 */
export interface TruncateResult {
  message: string;
  truncated: boolean;
}

export function validateItem(item: Partial<CartItem>, menuData: MenuData): ValidationResult {
    if (!item?.id) {
        return { valid: false, error: 'Item inválido: ID ausente', validatedItem: null };
    }

    const menuItem = findItemById(menuData, item.id);
    if (!menuItem) {
        return { valid: false, error: `Item não encontrado no cardápio: ${item.id}`, validatedItem: null };
    }

    const validatedItem: CartItem = {
        ...item,
        ...menuItem,
        quantity: item.quantity || 1
    };

    if (item.price !== undefined && item.price !== menuItem.price) {
        console.warn(`Price mismatch for ${item.id}: cart=${item.price}, menu=${menuItem.price}`);
        return { valid: false, error: `Preço incorreto para ${menuItem.name}`, validatedItem };
    }

    return { valid: true, error: null, validatedItem };
}

const MIN_QTY = 1;
const MAX_QTY = 10;

export function sanitizeQuantity(qty: number | string): number {
    const num = Number(qty);
    if (isNaN(num)) return MIN_QTY;
    if (!isFinite(num)) return num > 0 ? MAX_QTY : MIN_QTY;
    return Math.max(MIN_QTY, Math.min(MAX_QTY, Math.floor(num)));
}

export function recalculateCart(cartItems: Partial<CartItem>[], menuData: MenuData): RecalculateResult {
    if (!Array.isArray(cartItems)) {
        return { items: [], invalid: [], errors: ['Carrinho inválido'] };
    }

    const validItems: CartItem[] = [];
    const invalidItems: CartItem[] = [];
    const errors: string[] = [];

    for (const item of cartItems) {
        const safeQuantity = sanitizeQuantity(item.quantity || 1);
        const validation = validateItem({ ...item, quantity: safeQuantity }, menuData);

        if (validation.valid || validation.validatedItem) {
            validItems.push({ ...validation.validatedItem!, quantity: safeQuantity });
            if (!validation.valid) {
                errors.push(`${validation.error} - preço corrigido`);
            }
        } else {
            invalidItems.push(item as CartItem);
            errors.push(validation.error!);
        }
    }

    return { items: validItems, invalid: invalidItems, errors: errors.length ? errors : null };
}

export function calculateTotal(cartItems: CartItem[]): number {
    if (!Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => {
        return total + (Number(item.price) || 0) * sanitizeQuantity(item.quantity);
    }, 0);
}

export function truncateWhatsAppMessage(message: string, maxChars: number = 1800): TruncateResult {
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

export function validateCartForCheckout(cartItems: Partial<CartItem>[], menuData: MenuData): CheckoutValidationResult {
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
