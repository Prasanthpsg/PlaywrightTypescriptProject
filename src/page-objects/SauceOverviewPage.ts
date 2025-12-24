import { Locator, Page } from "@playwright/test";

export class SauceOverviewPage {

    readonly page: Page;
    readonly overviewtitle: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly priceTotal: Locator;
    readonly finishButton: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.overviewtitle = this.page.locator('.title');
        this.paymentInfo = this.page.locator('div[data-test="payment-info-value"]');
        this.shippingInfo = this.page.locator('div[data-test="shipping-info-value"]');
        this.priceTotal = this.page.locator('div[data-test="subtotal-label"]');
        this.finishButton = this.page.locator('#finish');
    }

    async isLoaded() {
        await this.overviewtitle.waitFor({ state: 'visible' });
    }

    async validateOverviewTitle() {
        return await this.overviewtitle.textContent();
    }

    async getPaymentInformation() {
        return await this.paymentInfo.textContent();
    }

    async getShippingInformation() {
        return await this.shippingInfo.textContent();
    }

    async getTotalPrice() {
        return await this.priceTotal.textContent();
    }

    async clickFinish() {
        await this.finishButton.waitFor({ state: 'visible' });
        await this.finishButton.click();
    }

}