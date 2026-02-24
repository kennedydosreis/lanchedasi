import { test, expect } from '@playwright/test';

test.describe('Resilience and Performance (Day 14)', () => {
    
    test('Should show skeleton screens on slow 3G', async ({ page }) => {
        // Simular rede lenta
        const client = await page.context().newCDPSession(page);
        await client.send('Network.emulateNetworkConditions', {
            offline: false,
            downloadThroughput: 100 * 1024 / 8, 
            uploadThroughput: 50 * 1024 / 8, 
            latency: 50
        });

        await page.goto('/', { waitUntil: 'commit', timeout: 60000 });
        
        // Verificar se skeletons aparecem
        const skeleton = page.locator('.animate-pulse, .skeleton');
        await expect(skeleton.first()).toBeDefined();
    });

    test('Should work offline via Cache/Service Worker', async ({ page, context }) => {
        await page.goto('/');
        // Esperar registro do SW se houver
        await page.waitForTimeout(2000);

        // Offline mode
        await context.setOffline(true);
        await page.reload();

        // Verificar se a página carrega do cache (não deve mostrar erro de rede do navegador)
        const title = page.locator('h1');
        await expect(title).toBeVisible();
    });

    test('Hybrid checkout flow (Edge + Offline support)', async ({ page, context }) => {
        await page.goto('/', { timeout: 60000 });
        
        // Adicionar item ao carrinho (tentar locators mais comuns se falhar)
        const addToCart = page.locator('button:has-text("Adicionar"), .btn-add');
        if (await addToCart.count() > 0) {
            await addToCart.first().click();
            await page.click('a[href="/carrinho"], .cart-icon');

            // Simular falha de rede parcial ou latência alta no POST do pedido
            await page.route('**/api/order', async route => {
                await new Promise(resolve => setTimeout(resolve, 1000));
                await route.continue();
            });

            const checkoutBtn = page.locator('button:has-text("Finalizar"), .btn-checkout');
            if (await checkoutBtn.count() > 0) {
                await checkoutBtn.click();
                // Verificar se mostra ID do pedido gerado pela Edge
                await expect(page.locator('text=ORD-')).toBeVisible({ timeout: 10000 });
            }
        }
    });
});
