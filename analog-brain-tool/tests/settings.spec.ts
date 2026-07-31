import { expect, test } from '@playwright/test';

test('loads settings when the options menu opens', async ({ page }) => {
  await page.goto('#/?lang=en');

  await page.getByRole('button', { name: 'Other options' }).click();

  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  await expect(page.getByText('External deck data source:', { exact: true })).toBeVisible();
  await expect(page.getByRole('textbox')).toBeVisible();
});
