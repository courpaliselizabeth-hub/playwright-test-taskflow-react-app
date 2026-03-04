import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('example.com', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page before each test
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Example Domain/);
  });

  test('displays the main heading', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();
  });

  test('contains descriptive paragraph text', async ({ page }) => {
    const paragraph = page.locator('p').first();
    await expect(paragraph).toContainText('This domain is for use in documentation examples');
  });

  test('has a "Learn more" link', async ({ page }) => {
    const link = page.getByRole('link', { name: /learn more/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /iana\.org/);
  });

  test('link navigates to IANA page', async ({ page }) => {
    const link = page.getByRole('link', { name: /learn more/i });

    // Click and wait for navigation
    await Promise.all([
      page.waitForURL(/iana\.org/, { timeout: 60000 }),
      link.click(),
    ]);

    await expect(page).toHaveURL(/iana\.org/);
  });

  test('takes a screenshot of the page', async ({ page }) => {
    await page.screenshot({
      path: path.join('screenshots', 'example-homepage.png'),
      fullPage: true,
    });

    // Verify page structure is intact after screenshot
    await expect(page.locator('body')).toBeVisible();
  });

  test('page is accessible — no missing alt text on images', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in under 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('mobile viewport renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const heading = page.getByRole('heading', { name: 'Example Domain' });
    await expect(heading).toBeVisible();

    await page.screenshot({
      path: path.join('screenshots', 'example-mobile.png'),
    });
  });
});
