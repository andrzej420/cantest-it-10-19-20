import { Locator, Page } from "@playwright/test";
import { getUser, Users } from "../config/users";
import { Toast } from "./components/Toast";

export class LoginPage {
  private page: Page;

  usernameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;

  header: Locator;

  toast: Toast;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');

    this.header = this.page.locator('h4');

    this.toast = new Toast(this.page);
  }

  async login(user: Users) {
    const { username, password } = getUser(user);

    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorToast() {
    // TODO: Implement
  }
}
