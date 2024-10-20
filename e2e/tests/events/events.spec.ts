import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EventsPage } from '../../pages/EventsPage';
import { Users } from '../../config/users';

let loginPage: LoginPage;
let eventsPage: EventsPage;

test.beforeEach(async ({page}) => {
  await page.goto('/login');

  loginPage = new LoginPage(page);
  eventsPage = new EventsPage(page);

  await loginPage.login(Users.EventManager);
});

test('user should be able to use search', async ({page}) => {
  await eventsPage.searchEvent('Asian');

  const events = await eventsPage.getEvents();

  expect.soft(events.length).toBeGreaterThan(0);
  for (let i = 0; i < events.length; i++) {
    expect.soft(events[i].name).toContain('Asian');
  }
});
