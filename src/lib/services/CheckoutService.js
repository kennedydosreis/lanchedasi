import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { z } from 'zod';
import LoggerService from './LoggerService';
import { UserRepository } from '../repositories/UserRepository.js';

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
     * Gera uma chave de idempotência para o pedido
     * Baseada no conteúdo do carrinho e timestamp (minuto atual)
     */
    static generateIdempotencyKey(customer, items) {
        const payload = JSON.stringify({
            phone: customer.phone,
            items: items.map(i => ({ id: i.id, q: i.quantity })),
            minute: Math.floor(Date.now() / 60000) // Válida por 1 minuto
        });
        
        // Simples hash para string (substituindo crypto para compatibilidade total)
        let hash = 0;
        for (let i = 0; i < payload.length; i++) {
            hash = ((hash << 5) - hash) + payload.charCodeAt(i);
            hash |= 0;
        }
        return `order_${Math.abs(hash)}_${Math.floor(Date.now() / 60000)}`;
    }

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
            // Suporte a nome/nome e preco/price para compatibilidade de transição
            const name = item.name || item.nome;
            const price = item.price || item.preco;
            message += `- ${item.quantity}x ${name} (R$ ${price.toFixed(2)})\n`;
        });

        message += `\n*Total: R$ ${total.toFixed(2)}*`;
        
        return encodeURIComponent(message);
    }

    /**
     * Finaliza o pedido e redireciona para o WhatsApp
     */
    static async processOrder(customerData) {
        const currentCart = get(cart);
        const idempotencyKey = this.generateIdempotencyKey(customerData, currentCart);

        // Proteção contra cliques duplos (debounce básico via storage)
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
        const total = currentCart.reduce((sum, item) => {
            const price = item.price || item.preco;
            return sum + (price * item.quantity);
        }, 0);

        if (currentCart.length === 0) {
            LoggerService.error('Tentativa de checkout com carrinho vazio');
            throw new Error("Seu carrinho está vazio!");
        }

        // 3. Salvar info do cliente para próxima compra
        this.saveCustomerInfo(customerData);
        UserRepository.saveUser({
            name: customerData.name,
            phone: customerData.phone
        });

        // 4. Gerar link do WhatsApp
        const phoneNumber = "5592991144080"; // Número real do Lanche da Si
        const message = this.buildWhatsAppMessage(customerData, currentCart, total);
        
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
        
        LoggerService.info('Pedido processado com sucesso, redirecionando para WhatsApp');
        return whatsappLink;
    }
}
