import { test, expect } from '@playwright/test';

test('login correcto', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/');
    
    await page.getByRole('link', { name: 'Log in' }).click();

    await page.locator('#loginusername').fill('a');
    await page.locator('#loginpassword').fill('a');

    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});