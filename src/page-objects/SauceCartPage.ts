import { Locator, Page } from "@playwright/test";

export class SauceCartPage {

    readonly page: Page
    readonly cartPage: Locator
    readonly continueShoppingButton: Locator
    readonly checkoutButton: Locator

    constructor(page: Page) {
        this.page = page
        this.cartPage = this.page.locator('.cart_list');
        this.continueShoppingButton = this.page.locator('#continue-shopping');
        this.checkoutButton = this.page.locator('#checkout');

    }

    async isLoaded() {
        await this.cartPage.waitFor({ state: 'visible' });
    }

    async verifyContinueShoppingButton() {
        return await this.continueShoppingButton.isVisible({timeout:10000});
    }

    async clickCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click({timeout: 20000});
    }
}