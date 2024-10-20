import {test, expect} from '@playwright/test';

test('heading to have text Welcome', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('h4')).toHaveText('Welcome');
});

test('heading is not Welcome', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('h4')).not.toHaveText('Hello');
});

test.fixme('soft assertion', async ({page}) => {
  await page.goto('/');

  // kontynuje dalsze testy pomimo bledu
  await expect.soft(page.locator('h4')).toHaveText('Hello'); // fail
  await expect.soft(page.locator('h4')).toHaveText('Hi!'); // fail
  await expect.soft(page.locator('h4')).toHaveText('Welcome'); // pass

  await page.waitForTimeout(1);
});

test.skip('custom message', async ({page}) => {
  await page.goto('/');

  await expect(page.locator('h4'), 'Heading should be Welcome').toHaveText('Hello');
});
