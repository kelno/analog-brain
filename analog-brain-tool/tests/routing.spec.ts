import { expect, test } from '@playwright/test';

test.describe('routing', () => {
  test('selecting the default deck opens its first card route', async ({ page }) => {
    await page.goto('#/?lang=en');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page).toHaveURL(/#\/deck\/original_analog_brain\/card\/0-1$/);
    await expect(page.getByRole('heading', { name: 'Do you know what you want?' })).toBeVisible();
    await expect(page).toHaveTitle(
      'Do you know what you want? – Original Analog Brain – Analog Brain Tool',
    );
  });
});
