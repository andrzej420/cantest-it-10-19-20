import {test, expect} from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Event, EventsPage } from '../../pages/EventsPage';
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

test('user should be able to add event', async ({page}) => {
  const event: Event = {
    title: `new-event-${Date.now()}`,
    category: 'Art',
    price: '100',
    dateFrom: '10/20/2024',
    dateTo: '10/30/2024',
  }

  await eventsPage.addEvent(event);

  const events = await eventsPage.getEvents();

  expect.soft(events.length).toBeGreaterThan(0);
  expect(events).toContainEqual({
    name: event.title,
    tag: event.category.toLowerCase()
  })

});

// EXERCISE: Implement the add event test

// Steps:
// 1. Create method addEvent in EventsPage.ts class
// 2. In test body use first addEvent method, and then getEvents() method to get all events
// 3. Assert that events array length is greater than 0
// 4. Assert that in the events list there is an event with new event name [the one you've added].


// Selectors to get category by it's name:
// await this.page.locator('#category').click();
// await this.page.locator(`.p-dropdown-item[aria-label="${event.category}"]`).click();
