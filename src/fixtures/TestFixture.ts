import { test as base } from '@playwright/test';
import { SauceLogin } from '../page-objects/SauceLogin';
import { SauceHomePage } from '../page-objects/SauceHomePage';
import { SauceCartPage } from '../page-objects/SauceCartPage';
import { SauceCheckoutPage } from '../page-objects/SauceCheckoutPage';
import { SauceOverviewPage } from '../page-objects/SauceOverviewPage';
import { SauceConfirmationPage } from '../page-objects/SauceConfirmationPage';


export const test = base.extend<{
    saveLogs: void;
    sauceLogin: SauceLogin;
    sauceHomePage: SauceHomePage;
    sauceCartPage: SauceCartPage;
    sauceCheckoutPage: SauceCheckoutPage;
    sauceOverviewPage: SauceOverviewPage;
    sauceConfirmationPage: SauceConfirmationPage;


}>({
    saveLogs: [async ({ }, use) => {
        console.log('Global before is running...');

        await use();

        console.log('Global afterEach is running...');
    },
    { auto: true }],
    sauceLogin: async ({ page }, use) => {
        const sauceLogin = new SauceLogin(page);
        console.log('Sauce lab login fixture started...');
        await sauceLogin.goTo();
        await sauceLogin.login();
        await use(sauceLogin);
    },
    sauceHomePage: async ({ page }, use) => {
        const sauceHomePage = new SauceHomePage(page);
         console.log('Sauce lab home page fixture started...');
        await use(sauceHomePage);
    },
    sauceCartPage: async ({ page }, use) => {
        const sauceCartPage = new SauceCartPage(page);
         console.log('Sauce lab cart page fixture started...');
        await use(sauceCartPage);
    },
    sauceCheckoutPage: async ({ page }, use) => {
        const sauceCheckoutPage = new SauceCheckoutPage(page);
         console.log('Sauce lab checkout page fixture started...');
        await use(sauceCheckoutPage);
    },
    sauceOverviewPage: async ({ page }, use) => {
        const sauceOverviewPage = new SauceOverviewPage(page);
         console.log('Sauce lab login over view page started...');
        await use(sauceOverviewPage);
    },
    sauceConfirmationPage: async ({ page }, use) => {
        const sauceConfirmationPage = new SauceConfirmationPage(page);
         console.log('Sauce lab login confirmation page started...');
        await use(sauceConfirmationPage);
    },

});

export { expect } from '@playwright/test';