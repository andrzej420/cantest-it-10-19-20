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
}
