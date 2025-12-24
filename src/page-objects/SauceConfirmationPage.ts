import { Locator, Page } from "@playwright/test";

export class SauceConfirmationPage {

    readonly page: Page;
    readonly confirmationTitle: Locator;
    readonly confirmationMessage: Locator;
    readonly confirmationSubMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.confirmationTitle = this.page.locator('.title');
        this.confirmationMessage = this.page.locator('.complete-header');
        this.confirmationSubMessage = this.page.locator('.complete-text');
    }

    async isLoaded() {
        await this.confirmationTitle.waitFor({ state: 'visible' });
    }

    async getConfirmationMessage() {
        return await this.confirmationMessage.textContent();
    }

    async getConfirmationSubMessage() {
        return await this.confirmationSubMessage.textContent();
    }

}