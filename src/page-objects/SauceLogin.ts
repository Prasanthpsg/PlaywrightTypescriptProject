import { Locator, Page } from "@playwright/test";

export class SauceLogin {

    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#login-button');
    }

    async goTo(){
        await this.page.goto(`${process.env.URL}`, {timeout:15000})
    }

     async login() {
        await this.usernameInput.fill(`${process.env.USERNAME}`);
        await this.passwordInput.fill(`${process.env.PASSWORD}`);
        await this.loginButton.click();
    }
}