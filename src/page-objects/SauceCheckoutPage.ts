import { Locator, Page } from "@playwright/test";

export class SauceCheckoutPage {

    readonly page: Page
    readonly title: Locator
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('.title');
        this.firstNameInput = this.page.locator('#first-name');
        this.lastNameInput = this.page.locator('#last-name');
        this.postalCodeInput = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
    }

    async isLoaded() {
        await this.title.waitFor({state:'visible'});
    }

    async validateCheckoutTitle() {
       return await this.title.textContent();
    }

    async enterCheckoutInformation() {
        await this.firstNameInput.fill(`${process.env.NAME}`);
        await this.lastNameInput.fill(`${process.env.POSTAL}`);
        await this.postalCodeInput.fill(`${process.env.CITY}`);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}