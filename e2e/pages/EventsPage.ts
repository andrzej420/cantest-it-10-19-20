import { Locator, Page } from "@playwright/test";

export class EventsPage {
  private page: Page;

  usernameText: Locator;
  logoutButton: Locator;

  searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameText = this.page.getByTestId('username-text');
    this.logoutButton = this.page.getByTestId('logout-button');

    this.searchInput = this.page.getByTestId('search-input');
  }

  async searchEvent(event: string) {
    await this.searchInput.fill(event);
  }

  async getEvents(waitForEvents: boolean = true) {
    const events = [];

    if (waitForEvents) {
      await this.page.locator('.p-dataview-content .card').first().waitFor();
    }

    const cards = await this.page.locator('.p-dataview-content .card').all();

    for (const card of cards) {
      const tag = await card.locator('.pi-tag ~ span').textContent();
      const name = await card.locator('.text-xl').textContent();

      events.push({
        tag,
        name
      });
    }

    return events;
  }

  async addEvent(event: Event) {
    await this.page.getByTestId('add-event-button').click();

    await this.page.locator('#name').fill(event.title);

    await this.page.locator('#category').click();
    await this.page.locator(`.p-dropdown-item[aria-label="${event.category}"]`).click();

    // Clear input field and then type price value
    await this.page.locator('#price input').fill('');
    await this.page.locator('#price input').type(event.price);

    await this.page.locator('#dateFrom').fill(event.dateFrom);
    await this.page.locator('#dateTo').fill(event.dateTo);

    await this.page.getByTestId('save-event-button').click();
  }
}

export type Event = {
  title: string;
  category: "Concert" | "Festival" | "Party" | "Art";
  price: string;
  dateFrom: string;
  dateTo: string;
}
