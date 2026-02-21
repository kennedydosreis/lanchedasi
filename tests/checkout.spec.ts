import { test, expect } from '@playwright/test';

test('deve permitir realizar um pedido completo até o WhatsApp', async ({ page }) => {
  await page.goto('/');

  // Adicionar primeiro item ao carrinho
  const addButtons = page.locator('button:has-text("Adicionar")');
  await addButtons.first().click();

  // Abrir o carrinho/checkout
  const cartButton = page.locator('button:has-text("🛒")');
  await cartButton.click();

  // Verificar se o modal de checkout abriu
  await expect(page.locator('h2:has-text("Checkout")')).toBeVisible();

  // Preencher formulário
  await page.fill('input[placeholder*="Nome"]', 'Cliente Teste');
  await page.fill('input[placeholder*="Telefone"]', '11999999999');
  await page.fill('input[placeholder*="Rua"]', 'Rua de Teste');
  await page.fill('input[placeholder*="Número"]', '123');
  await page.fill('input[placeholder*="Bairro"]', 'Bairro Teste');

  // Selecionar forma de pagamento
  await page.click('text=Dinheiro');

  // Validar se o botão de enviar está ativo e clicar
  const sendButton = page.locator('button:has-text("Enviar Pedido via WhatsApp")');
  await expect(sendButton).toBeEnabled();
  
  // Como o link do WhatsApp abre em outra aba ou tenta abrir o app, 
  // vamos apenas verificar se o link gerado parece correto
  const href = await sendButton.getAttribute('href');
  expect(href).toContain('wa.me');
  expect(href).toContain('Cliente%20Teste');
});
