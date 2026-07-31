import { expect, test } from '@playwright/test';

const deckId = 'original_analog_brain';
const getCardPath = (cardId: string) => `/deck/${deckId}/card/${cardId}`;
const firstCardPath = getCardPath('0-1');
const routeUrl = (path: string) => new RegExp(`#${path}$`);

test.describe('routing', () => {
  test('selecting the default deck opens its first card route', async ({ page }) => {
    await page.goto('#/?lang=en');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page).toHaveURL(routeUrl(firstCardPath));
    await expect(page.getByRole('heading', { name: 'Do you know what you want?' })).toBeVisible();
    await expect(page).toHaveTitle(
      'Do you know what you want? – Original Analog Brain – Analog Brain Tool',
    );
  });

  test('a deck-only route redirects to its first card', async ({ page }) => {
    await page.goto(`#/deck/${deckId}?lang=en`);

    await expect(page).toHaveURL(routeUrl(firstCardPath));
    await expect(page.getByRole('heading', { name: 'Do you know what you want?' })).toBeVisible();
  });

  test('card choices are links backed by browser history', async ({ page }) => {
    await page.goto('#/?lang=en');
    await page.getByRole('button', { name: 'Start' }).click();

    const yesChoice = page.getByRole('listitem').filter({ hasText: 'Yes' });
    const nextCardLink = yesChoice.getByRole('link');

    await expect(nextCardLink).toHaveAttribute('href', routeUrl(getCardPath('0-2')));
    await nextCardLink.click();

    await expect(page).toHaveURL(routeUrl(getCardPath('0-2')));
    await expect(page.getByRole('heading', { name: 'What do you want to do?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();

    await page.getByRole('button', { name: 'Previous' }).click();

    await expect(page).toHaveURL(routeUrl(firstCardPath));
    await expect(page.getByRole('heading', { name: 'Do you know what you want?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();

    await page.goForward();

    await expect(page).toHaveURL(routeUrl(getCardPath('0-2')));
    await expect(page.getByRole('heading', { name: 'What do you want to do?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeEnabled();
  });

  test('an unknown route offers a way back to deck selection', async ({ page }) => {
    await page.goto('#/not-a-route?lang=en');

    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
    await page.getByRole('link', { name: 'Back to deck selection' }).click();

    await expect(page).toHaveURL(/#\/$/);
    await expect(page.getByRole('heading', { name: 'Original Analog Brain' })).toBeVisible();
  });

  test('a missing deck is a recoverable route', async ({ page }) => {
    await page.goto('#/deck/missing-deck/card/0-1?lang=en');

    await expect(page.getByRole('heading', { name: 'Deck not found' })).toBeVisible();
    await expect(page.getByText("No deck named 'missing-deck' is available")).toBeVisible();
    await page.getByRole('link', { name: 'Back to deck selection' }).click();

    await expect(page).toHaveURL(/#\/$/);
  });

  test('a missing card is a recoverable route', async ({ page }) => {
    await page.goto(`#${getCardPath('missing-card')}?lang=en`);

    await expect(page.getByRole('heading', { name: 'Card not found' })).toBeVisible();
    await expect(
      page.getByText("No card named 'missing-card' exists in Original Analog Brain."),
    ).toBeVisible();
    await page.getByRole('link', { name: 'Back to deck selection' }).click();

    await expect(page).toHaveURL(/#\/$/);
  });

  test('sharing a card includes the active route and language', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'share', {
        configurable: true,
        value: async (data: { url?: string }) => {
          sessionStorage.setItem('sharedUrl', String(data.url));
        },
      });
    });
    await page.goto(`#${firstCardPath}?lang=en`);

    await page.getByRole('button', { name: 'Share this card' }).click();

    await expect
      .poll(() => page.evaluate(() => sessionStorage.getItem('sharedUrl')))
      .toBe(`http://127.0.0.1:4173/analog-brain/#${firstCardPath}?lang=en`);
  });
});
