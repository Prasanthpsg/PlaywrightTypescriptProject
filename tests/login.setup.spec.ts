import {test, expect} from '@playwright/test'
import { SauceLogin } from '../src/page-objects/SauceLogin'
import fs from 'fs';

test('Sauce lab login', async({page})=>{

    const sauceLogin = new SauceLogin(page);
    await sauceLogin.goTo();
    await sauceLogin.login();

    await expect(page.locator('.inventory_list')).toBeVisible();

    await page.context().storageState({ path: 'auth.json' });

    console.log(' Auth state saved to auth.json');


})