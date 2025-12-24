import {test} from '../src/fixtures/TestFixture'

test('Check out validation', async ({ sauceLogin, sauceHomePage, sauceCartPage, sauceCheckoutPage, sauceOverviewPage, sauceConfirmationPage }) => {

  //  const sauceHomePage = new SauceHomePage(page);
    await sauceHomePage.isLoaded();
    await sauceHomePage.addBackpackToCart();
    await sauceHomePage.addBikeLightToCart();
    await sauceHomePage.verifyBackPackRemove(); //verification step
    await sauceHomePage.goToCart();

 //   const sauceCartPage = new SauceCartPage(page);
    await sauceCartPage.isLoaded();
    await sauceCartPage.verifyContinueShoppingButton();
    await sauceCartPage.clickCheckout();

  //  const sauceCheckoutPage = new SauceCheckoutPage(page);
    await sauceCheckoutPage.isLoaded();
    await sauceCheckoutPage.validateCheckoutTitle();
    await sauceCheckoutPage.enterCheckoutInformation();
    await sauceCheckoutPage.clickContinue();

    await sauceOverviewPage.clickFinish();

    await sauceConfirmationPage.isLoaded();
    await sauceConfirmationPage.getConfirmationMessage();


})

test('home page validation', async ({sauceLogin, sauceHomePage, sauceCartPage }) => {

    await sauceHomePage.isLoaded();
    await sauceHomePage.addBackpackToCart();
    await sauceHomePage.addBikeLightToCart();
    await sauceHomePage.verifyBackPackRemove(); 
    await sauceHomePage.goToCart();

    await sauceCartPage.isLoaded();
    await sauceCartPage.verifyContinueShoppingButton();
    await sauceCartPage.clickCheckout();
})

test('login - auth.json validation', async ({ sauceLogin, sauceHomePage, sauceCartPage }) => {

    await sauceHomePage.isLoaded();
    await sauceHomePage.addBackpackToCart();
    await sauceHomePage.addBikeLightToCart();
    await sauceHomePage.verifyBackPackRemove(); 
    await sauceHomePage.goToCart();

    await sauceCartPage.isLoaded();
    await sauceCartPage.verifyContinueShoppingButton();
    await sauceCartPage.clickCheckout();
})

