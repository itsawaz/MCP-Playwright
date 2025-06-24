import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // Navigate to a page
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // Expect an element "to be visible".
  await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
