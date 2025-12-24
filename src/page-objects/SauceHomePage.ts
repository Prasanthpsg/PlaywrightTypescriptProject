import { expect, Locator, Page } from "@playwright/test";

export class SauceHomePage{
   readonly page: Page;
   readonly inventoryContainer : Locator;
   readonly sauceLabsBackpack : Locator;
    readonly sauceLabsBikelight : Locator;
    readonly shoppingCartLink: Locator;
    readonly sauceLabsBackpackRemove: Locator;

    constructor(page:Page){
        this.page=page;
        this.inventoryContainer = this.page.locator('.inventory_container');
        this.sauceLabsBackpack = this.page.locator('#add-to-cart-sauce-labs-backpack');
        this.sauceLabsBikelight = this.page.locator('#add-to-cart-sauce-labs-bike-light');
         this.shoppingCartLink = this.page.locator('.shopping_cart_link');
         this.sauceLabsBackpackRemove = page.locator('#remove-sauce-labs-backpack');
    }

    async isLoaded(){
        await this.inventoryContainer.waitFor({ state: 'visible'});
    }

     async addBackpackToCart() {
        await this.sauceLabsBackpack.click();
    }

    async addBikeLightToCart() {
        await this.sauceLabsBikelight.click();
    }

     async goToCart() {
        await this.shoppingCartLink.waitFor({ state: 'visible' });
        await this.shoppingCartLink.click();
    }

    async verifyBackPackRemove(){
       await expect (this.sauceLabsBackpackRemove).toHaveText('Remove');
    }

}