import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { z } from 'zod';
import LoggerService from './LoggerService';
import { UserRepository } from '../repositories/UserRepository';
import type { CustomerInfo, CartItem } from '$lib/types/models';

export const OrderSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    phone: z.string().min(10, "Informe um telefone válido (DDD + Número)"),
    address: z.string().min(5, "Informe o endereço completo"),
    paymentMethod: z.enum(['dinheiro', 'pix', 'cartao']),
    change: z.string().optional()
});

export class CheckoutService {
    static generateIdempotencyKey(customer: CustomerInfo, items: CartItem[]): string {
        const payload = JSON.stringify({
            phone: customer.phone,
            items: items.map(i => ({ id: i.id, q: i.quantity })),
            minute: Math.floor(Date.now() / 60000)
        });
        
        let hash = 0;
        for (let i = 0; i < payload.length; i++) {
            hash = ((hash << 5) - hash) + payload.charCodeAt(i);
            hash |= 0;
        }
        return `order_${Math.abs(hash)}_${Math.floor(Date.now() / 60000)}`;
    }

    static saveCustomerInfo(info: CustomerInfo): void {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('customer_info', JSON.stringify(info));
                LoggerService.info('Informações do cliente salvas no localStorage');
            } catch (e: any) {
                LoggerService.warn('Falha ao salvar info no localStorage', { error: e.message });
            }
        }
    }

    static loadCustomerInfo(): CustomerInfo | null {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('customer_info');
                if (saved) {
                    LoggerService.info('Informações do cliente recuperadas com sucesso');
                    return JSON.parse(saved);
                }
            } catch (e: any) {
                LoggerService.warn('Falha ao ler info do localStorage', { error: e.message });
            }
        }
        return null;
    }

    static buildWhatsAppMessage(customer: CustomerInfo, items: CartItem[], total: number): string {
        let message = `*Novo Pedido - Lanche da Si*\n\n`;
        message += `*Cliente:* ${customer.name}\n`;
        message += `*Telefone:* ${customer.phone}\n`;
        message += `*Endereço:* ${customer.address}\n`;
        message += `*Pagamento:* ${customer.paymentMethod.toUpperCase()}\n`;
        
        if (customer.paymentMethod === 'dinheiro' && customer.change) {
            message += `*Troco para:* ${customer.change}\n`;
        }
        
        message += `\n*Itens:*\n`;
        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} (R$ ${item.price.toFixed(2)})\n`;
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*`;
        
        return encodeURIComponent(message);
    }

    static async processOrder(customerData: CustomerInfo): Promise<string> {
        const currentCart = get(cart);
        const idempotencyKey = this.generateIdempotencyKey(customerData, currentCart);

        if (typeof window !== 'undefined') {
            const lastKey = sessionStorage.getItem('last_order_key');
            if (lastKey === idempotencyKey) {
                LoggerService.warn('Tentativa de pedido duplicado bloqueada (Idempotência)', { key: idempotencyKey });
                throw new Error("Este pedido já está sendo processado. Verifique seu WhatsApp.");
            }
            sessionStorage.setItem('last_order_key', idempotencyKey);
        }

        LoggerService.info('Iniciando processamento de pedido', { 
            itemsCount: currentCart.length,
            paymentMethod: customerData.paymentMethod,
            key: idempotencyKey
        });

        const validation = OrderSchema.safeParse(customerData);
        if (!validation.success) {
            const firstError = validation.error.errors[0];
            LoggerService.warn('Falha na validação do checkout', { 
                field: firstError.path[0],
                message: firstError.message
            });
            throw new Error(firstError.message);
        }

        const total = currentCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        if (currentCart.length === 0) {
            LoggerService.error('Checkout com carrinho vazio');
            throw new Error("Seu carrinho está vazio!");
        }

        this.saveCustomerInfo(customerData);
        UserRepository.saveUser({ name: customerData.name, phone: customerData.phone });

        const phoneNumber = "5592991144080";
        const message = this.buildWhatsAppMessage(customerData, currentCart, total);
        
        LoggerService.info('Pedido processado com sucesso');
        return `https://wa.me/${phoneNumber}?text=${message}`;
    }
}
