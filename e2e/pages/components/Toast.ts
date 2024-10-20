import { Locator, Page } from "@playwright/test";

export class Toast {
  private page: Page;

  title: Locator;
  detail: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = this.page.locator('.p-toast-summary');
    this.detail = this.page.locator('.p-toast-detail');
  }

  async getDetails() {
    return {
      title: await this.title.textContent(),
      description: await this.detail.textContent(),
    }
  }
}
