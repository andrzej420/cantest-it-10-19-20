import { test } from '@playwright/test';

test('text input fill', async ({ page }) => {
  await page.goto('/');

  // Target by test id
  await page.getByTestId('login-input').fill('user');

  // Target by ID
  // await page.locator('#inputgroup1').fill('user');

  // Target by TEXT
  // const text = await page.getByText('Please use the form to sign-in Cantest network').textContent();
  // console.log(text)

  await page.waitForTimeout(1);
});

test('button click', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('register-button').click();

  await page.waitForTimeout(1);
});

test.only('get input value / text', async ({page}) => {
  await page.goto('/');

  await page.getByTestId('login-input').fill('user');

  const value = await page.getByTestId('login-input').inputValue();
  console.log({value});

  const text = await page.locator('.pages-detail').textContent();
  console.log({text});

  await page.waitForTimeout(1);
});
