import { test, expect } from '@playwright/test';

test.describe('Fluxo de Checkout', () => {
  test.beforeEach(async ({ page }) => {
    // Acessa a página do cardápio
    await page.goto('/cardapio');
  });

  test('deve permitir preencher o checkout e validar campos obrigatórios', async ({ page }) => {
    // 1. Adiciona um item ao carrinho (ajustar seletor conforme o componente MenuItem)
    // Vamos procurar por um botão que contenha "Adicionar" ou o ícone de plus
    const addButtons = page.locator('button:has-text("Adicionar"), button:has(.fa-plus)');
    await addButtons.first().click();

    // 2. Abre o carrinho
    await page.locator('button:has(.fa-shopping-cart), .cart-toggle').click();

    // 3. Clica em Finalizar Pedido
    await page.click('button:has-text("Finalizar Pedido")');

    // 4. Verifica se o modal abriu
    await expect(page.locator('h2')).toContainText('Finalizar Pedido');

    // 5. Tenta enviar sem preencher nada e verifica se o Zod/Service barra
    await page.click('button:has-text("Enviar Pedido")');
    
    // Verifica se algum erro de validação apareceu (Zod error message)
    const errorAlert = page.locator('.validation-error');
    await expect(errorAlert).toBeVisible();

    // 6. Preenche os dados
    await page.fill('#name', 'Kennedy Teste');
    await page.fill('#phone', '92991144080');
    await page.fill('#address', 'Rua de Teste, 123, Bairro Tech');

    // 7. Seleciona pagamento
    await page.click('text=PIX');

    // 8. O botão de enviar deve estar ativo e pronto para abrir o WhatsApp
    const submitBtn = page.locator('button:has-text("Enviar Pedido")');
    await expect(submitBtn).not.toBeDisabled();
  });

  test('deve persistir dados no localStorage após preenchimento', async ({ page }) => {
    // Adiciona e abre checkout
    await page.locator('button:has-text("Adicionar")').first().click();
    await page.locator('.cart-toggle').click();
    await page.click('button:has-text("Finalizar Pedido")');

    // Preenche
    await page.fill('#name', 'Persistência Teste');
    await page.fill('#phone', '92988887777');
    await page.fill('#address', 'Endereço salvo');

    // Fecha modal (clicando no overlay ou ESC)
    await page.keyboard.press('Escape');

    // Abre de novo
    await page.click('button:has-text("Finalizar Pedido")');

    // Verifica se os valores foram recuperados do localStorage
    await expect(page.locator('#name')).toHaveValue('Persistência Teste');
    await expect(page.locator('#phone')).toHaveValue('92988887777');
  });
});
