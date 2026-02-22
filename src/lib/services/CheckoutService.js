import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { orderInfo } from '../stores/orderInfo';
import { z } from 'zod';
import LoggerService from './LoggerService';

/**
 * Esquema de validação para os dados do pedido
 */
export const OrderSchema = z.object({
    name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
    phone: z.string().min(10, "Informe um telefone válido (DDD + Número)"),
    address: z.string().min(5, "Informe o endereço completo"),
    paymentMethod: z.enum(['dinheiro', 'pix', 'cartao']),
    change: z.string().optional()
});

export class CheckoutService {
    /**
     * Salva as informações do cliente no localStorage
     */
    static saveCustomerInfo(info) {
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('customer_info', JSON.stringify(info));
                LoggerService.info('Informações do cliente salvas no localStorage');
            } catch (e) {
                LoggerService.warn('Falha ao salvar info no localStorage', { error: e.message });
            }
        }
    }

    /**
     * Recupera as informações do cliente do localStorage
     */
    static loadCustomerInfo() {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('customer_info');
                if (saved) {
                    LoggerService.info('Informações do cliente recuperadas com sucesso');
                    return JSON.parse(saved);
                }
            } catch (e) {
                LoggerService.warn('Falha ao ler info do localStorage', { error: e.message });
            }
        }
        return null;
    }

    /**
     * Formata a mensagem para o WhatsApp
     */
    static buildWhatsAppMessage(customer, items, total) {
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
            message += `- ${item.quantity}x ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*`;
        
        return encodeURIComponent(message);
    }

    /**
     * Finaliza o pedido e redireciona para o WhatsApp
     */
    static async processOrder(customerData) {
        LoggerService.info('Iniciando processamento de pedido', { 
            itemsCount: get(cart).length,
            paymentMethod: customerData.paymentMethod 
        });

        // 1. Validar dados
        const validation = OrderSchema.safeParse(customerData);
        if (!validation.success) {
            const firstError = validation.error.errors[0];
            LoggerService.warn('Falha na validação do checkout', { 
                field: firstError.path[0],
                message: firstError.message
            });
            throw new Error(firstError.message);
        }

        // 2. Coletar dados do carrinho
        const currentCart = get(cart);
        const total = currentCart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);

        if (currentCart.length === 0) {
            LoggerService.error('Tentativa de checkout com carrinho vazio');
            throw new Error("Seu carrinho está vazio!");
        }

        // 3. Salvar info do cliente para próxima compra
        this.saveCustomerInfo(customerData);

        // 4. Gerar link do WhatsApp
        const phoneNumber = "5592991144080"; // Número real do Lanche da Si
        const message = this.buildWhatsAppMessage(customerData, currentCart, total);
        
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
        
        LoggerService.info('Pedido processado com sucesso, redirecionando para WhatsApp');
        return whatsappLink;
    }
}
