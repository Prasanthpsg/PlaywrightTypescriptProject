import { test } from '@playwright/test'
import { SauceLogin } from '../src/page-objects/SauceLogin'
import { SauceHomePage } from '../src/page-objects/SauceHomePage';
import { SauceCartPage } from '../src/page-objects/SauceCartPage';
import { SauceCheckoutPage } from '../src/page-objects/SauceCheckoutPage';

test('Check out validation', async ({ page }) => {

    const sauceLogin = new SauceLogin(page);
    await sauceLogin.goTo();
    await sauceLogin.login();

    const sauceHomePage = new SauceHomePage(page);
    await sauceHomePage.isLoaded();
    await sauceHomePage.addBackpackToCart();
    await sauceHomePage.addBikeLightToCart();
    await sauceHomePage.goToCart();

    const sauceCartPage = new SauceCartPage(page);
    await sauceCartPage.isLoaded();
    await sauceCartPage.verifyContinueShoppingButton();
    await sauceCartPage.clickCheckout();

    const sauceCheckoutPage = new SauceCheckoutPage(page);
    await sauceCheckoutPage.isLoaded();
    await sauceCheckoutPage.validateCheckoutTitle();
    await sauceCheckoutPage.enterCheckoutInformation();
    await sauceCheckoutPage.clickContinue();



})

