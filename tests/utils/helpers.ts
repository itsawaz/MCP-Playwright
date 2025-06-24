import { Page, expect } from '@playwright/test';

/**
 * Utility functions for common Playwright operations
 */

/**
 * Wait for an element to be visible and return it
 */
export async function waitForElement(page: Page, selector: string, timeout = 30000) {
  await page.waitForSelector(selector, { state: 'visible', timeout });
  return page.locator(selector);
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ 
    path: `test-results/screenshots/${name}-${Date.now()}.png`,
    fullPage: true 
  });
}

/**
 * Fill a form field and verify the value
 */
export async function fillAndVerify(page: Page, selector: string, value: string) {
  await page.fill(selector, value);
  await expect(page.locator(selector)).toHaveValue(value);
}

/**
 * Click and wait for navigation
 */
export async function clickAndWaitForNav(page: Page, selector: string) {
  await Promise.all([
    page.waitForLoadState('networkidle'),
    page.click(selector)
  ]);
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(page: Page, urlPattern: string | RegExp) {
  return page.waitForResponse(response => 
    response.url().match(urlPattern) !== null && response.status() === 200
  );
}

/**
 * Get element text content
 */
export async function getElementText(page: Page, selector: string): Promise<string> {
  const element = await waitForElement(page, selector);
  return await element.textContent() || '';
}

/**
 * Check if element exists
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  try {
    await page.waitForSelector(selector, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
