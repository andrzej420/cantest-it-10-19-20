import { test, expect } from '@playwright/test';
import { Users, getUser } from '../../config/users';
import { LoginPage } from '../../pages/LoginPage';
import { EventsPage } from '../../pages/EventsPage';

let loginPage: LoginPage;
let eventsPage: EventsPage;

test.beforeEach(async ({page}) => {
  await page.goto('/login');

  loginPage = new LoginPage(page);
  eventsPage = new EventsPage(page);
})

test.describe('LOGIN', async () => {
  test.beforeEach(async ({page}) => {  
    await loginPage.login(Users.EventManager);
  });
  
  test('user should be able to login', async ({ page }) => {
    const { name } = getUser(Users.EventManager);
  
    await expect(eventsPage.usernameText).toHaveText(name);
  });

  test('user should be able to logout', async ({ page }) => {
    await eventsPage.usernameText.click();
    await eventsPage.logoutButton.click();

    await expect.soft(page).toHaveURL('/login');
    await expect.soft(loginPage.header).toHaveText('Welcome');
  });
})

test('empty password should reject login', async ({page}) => {
  const { username } = getUser(Users.EventManager);

  await loginPage.usernameInput.fill(username);
  await loginPage.loginButton.click();

  const toast = await loginPage.toast.getDetails();

  expect.soft(toast.title).toBe('Error');
  expect.soft(toast.description).toBe('Invalid data');
})
