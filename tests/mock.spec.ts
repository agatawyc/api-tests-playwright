import { expect, test } from '@playwright/test';

test('Should mock response', async ({ page }) => {
  await page.route('**/api/v1/fruits', async (route) => {
    const response = await route.fetch();
    const json = await response.json();
    json.push({ name: 'Pomelo', id: 213 });
    await route.fulfill({ response, json });
  });
  await page.goto('https://demo.playwright.dev/api-mocking/');
  await expect(page.getByText('Pomelo', { exact: true })).toBeVisible();
});
