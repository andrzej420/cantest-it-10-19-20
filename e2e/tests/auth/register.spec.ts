import { test, expect } from "@playwright/test";
import { Users, getUser, User } from "../../config/users";
import { RegisterPage } from "../../pages/RegisterPage";
import { EventsPage } from "../../pages/EventsPage";
import { chromium } from "playwright";
import { LoginPage } from "../../pages/LoginPage";


let registerPage: RegisterPage;
let eventsPage: EventsPage;
let credentials = (Math.random() + 1).toString(36).substring(7);
const regUser: User = {
  username: credentials,
  password: credentials,
  name: 'e2eRegistartion user'
};
//setting random credentials - using the same value in each form field



test.beforeEach(async ({ page }) => {
  await page.goto("/register");
  registerPage = new RegisterPage(page);
});

//regural registaration and login on registered data

test.describe("REGISTER", async () => {
  test("User should be able to create new account and login", async ({ page }) => {
    await registerPage.registeration(
      credentials,credentials,credentials,credentials,'55',false
    );
    await page.waitForTimeout(19);
    let loginPage = new LoginPage(page);
    await loginPage.login(regUser)
    await page.waitForTimeout(19);

  });

  // test("user should be able to login with registered account", async ({
  //   page,
  // }) => {
  //   await loginPage.login(Users.EventManager);
  // });
});
