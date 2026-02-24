import { sanitizeQuantity } from '$lib/utils/CartValidator';

export class PriceService {
    /**
     * Calcula o valor total de uma lista de itens do carrinho.
     * @param {Array} cartItems - Lista de itens com preço e quantidade.
     * @returns {number} O valor total formatado numericamente.
     */
    static calculateTotal(cartItems) {
        if (!Array.isArray(cartItems)) return 0;
        
        return cartItems.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = sanitizeQuantity(item.quantity);
            return total + (price * quantity);
        }, 0);
    }

    /**
     * Calcula a quantidade total de itens no carrinho.
     * @param {Array} cartItems - Lista de itens do carrinho.
     * @returns {number} A soma de todas as quantidades.
     */
    static calculateItemCount(cartItems) {
        if (!Array.isArray(cartItems)) return 0;

        return cartItems.reduce((count, item) => {
            const quantity = sanitizeQuantity(item.quantity);
            return count + quantity;
        }, 0);
    }

    /**
     * Formata um valor numérico para o padrão de moeda BRL (R$).
     * @param {number} value - O valor a ser formatado.
     * @returns {string} O valor formatado como moeda.
     */
    static formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
}
