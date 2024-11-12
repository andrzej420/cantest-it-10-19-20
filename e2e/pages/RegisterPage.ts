import { Locator, Page } from "@playwright/test";
import { getUser, Users } from "../config/users";
import { Toast } from "./components/Toast";
import {test, expect} from '@playwright/test';


export class RegisterPage {
  private page: Page;

  loginInput: Locator;
  passwordInput: Locator;
  nameInput: Locator;
  lastnameInput: Locator;
  ageImput: Locator;

  header: Locator;
  registerButton: Locator;

  toast: Toast;

  constructor(page: Page) {
    this.page = page;
    
    this.loginInput = this.page.locator('#inputgroup1');
    this.passwordInput = this.page.locator('#inputgroup2');
    this.nameInput = this.page.locator('#inputgroup3');
    this.lastnameInput = this.page.locator('#inputgroup4');
    this.ageImput = this.page.locator('#inputgroup5');

    this.registerButton = this.page.getByRole('button', { name: /Register/i });
  
    //this.toast = new Toast(this.page);
  }

  async registeration(login: string, password: string, nameInput: string, lastName: string, age: string, duplicate: boolean) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.nameInput.fill(nameInput);
    await this.lastnameInput.fill(lastName);
    await this.ageImput.fill(age);
    await this.registerButton.click();
    //await this.waitForTimeout(1);
  }

  async getErrorToast() {
    // TODO: Implement
  }
}
