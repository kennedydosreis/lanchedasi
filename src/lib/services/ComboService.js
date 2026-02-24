import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import promotionsData from '../data/promotions.json';

/**
 * @typedef {Object} Promotion
 * @property {string} id
 * @property {string} name
 * @property {boolean} active
 * @property {Object} discount
 */

export class ComboService {
    /**
     * Valida se um conjunto de itens formam um combo válido
     * @param {string} promoId 
     * @param {Array} selectedItems 
     * @returns {boolean}
     */
    static validateCombo(promoId, selectedItems) {
        const promo = promotionsData.find(p => p.id === promoId);
        if (!promo || !promo.active) return false;

        // Validação básica por steps
        return promo.steps.every((step, index) => {
            const itemsInStep = selectedItems.filter(item => item.category === step.category);
            return itemsInStep.length >= step.min && itemsInStep.length <= step.max;
        });
    }

    /**
     * Calcula o valor do desconto a ser aplicado
     * @param {string} promoId
     * @param {number} currentTotal
     * @returns {number}
     */
    static calculateDiscount(promoId, currentTotal) {
        const promo = promotionsData.find(p => p.id === promoId);
        if (!promo) return 0;

        if (promo.discount.type === 'fixed_price') {
            return Math.max(0, currentTotal - promo.discount.value);
        }

        return 0;
    }

    /**
     * Registra telemetria de aplicação de combo
     * @param {string} promoId 
     */
    static logComboApplied(promoId) {
        console.log(`[Telemetry] Combo applied: ${promoId}`);
        // Aqui integraria com o LoggerService do Day 10
    }
}
