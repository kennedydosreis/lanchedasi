import { get } from 'svelte/store';
import { cart } from '../stores/cart';
import { orderInfo } from '../stores/orderInfo';
import { z } from 'zod';

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
            localStorage.setItem('customer_info', JSON.stringify(info));
        }
    }

    /**
     * Recupera as informações do cliente do localStorage
     */
    static loadCustomerInfo() {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('customer_info');
            return saved ? JSON.parse(saved) : null;
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
        // 1. Validar dados
        const validation = OrderSchema.safeParse(customerData);
        if (!validation.success) {
            throw new Error(validation.error.errors[0].message);
        }

        // 2. Coletar dados do carrinho
        const currentCart = get(cart);
        const total = currentCart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);

        if (currentCart.length === 0) {
            throw new Error("Seu carrinho está vazio!");
        }

        // 3. Salvar info do cliente para próxima compra
        this.saveCustomerInfo(customerData);

        // 4. Gerar link do WhatsApp
        const phoneNumber = "5592991144080"; // Número real do Lanche da Si (ou placeholder configurado)
        const message = this.buildWhatsAppMessage(customerData, currentCart, total);
        
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
        
        return whatsappLink;
    }
}
