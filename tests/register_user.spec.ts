import { test, expect } from '@playwright/test';
import { generateTestData } from './utils/helpers';

test.describe('Register User', () => {
  test('should complete full user registration and deletion workflow', async ({ page }) => {
    // Test will be built incrementally step by step
    
    await test.step('Navigate to home page and verify visibility', async () => {
      // Navigate to the automation exercise website
      await page.goto('http://automationexercise.com');
      await page.waitForLoadState('domcontentloaded');
      
      // Verify that home page is visible successfully
      await expect(page).toHaveURL('https://automationexercise.com/');
      await expect(page.getByRole('heading', { name: 'AutomationExercise' }).first()).toBeVisible();
    });

    await test.step('Navigate to signup/login page', async () => {
      // Click on 'Signup / Login' button
      await page.getByRole('link', { name: ' Signup / Login' }).click();
      
      // Verify 'New User Signup!' is visible
      await expect(page).toHaveURL('https://automationexercise.com/login');
      await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();
    });

    await test.step('Enter signup information', async () => {
      // Generate unique test data
      const testData = generateTestData();
      
      // Enter name and email address
      await page.getByRole('textbox', { name: 'Name' }).fill(testData.name);
      await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(testData.email);
      
      // Click 'Signup' button
      await page.getByRole('button', { name: 'Signup' }).click();
      
      // Verify that 'ENTER ACCOUNT INFORMATION' is visible
      await expect(page).toHaveURL('https://automationexercise.com/signup');
      await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();
    });

    await test.step('Fill account information', async () => {
      // Generate unique test data for account details
      const testData = generateTestData();
      
      // Fill title, name, email, password and date of birth
      await page.getByLabel('Mr.').check();
      await page.getByLabel('Password *').fill(testData.password);
      await page.locator('#days').selectOption('15');
      await page.locator('#months').selectOption('January');
      await page.locator('#years').selectOption('1990');
      
      // Select checkboxes for newsletter and special offers
      await page.getByLabel('Sign up for our newsletter!').check();
      await page.getByLabel('Receive special offers from our partners!').check();
    });

    await test.step('Fill address information', async () => {
      // Generate unique test data for address details
      const testData = generateTestData();
      
      // Fill address information
      await page.getByLabel('First name *').fill(testData.firstName);
      await page.getByLabel('Last name *').fill(testData.lastName);
      await page.getByLabel('Company', { exact: true }).fill(testData.company);
      await page.getByLabel('Address * (Street address, P.O. Box, Company name, etc.)').fill(testData.address);
      await page.getByLabel('Address 2').fill(testData.address2);
      await page.locator('#country').selectOption('United States');
      await page.getByLabel('State *').fill(testData.state);
      await page.getByLabel('City *').fill(testData.city);
      await page.locator('#zipcode').fill(testData.zipcode);
      await page.getByLabel('Mobile Number *').fill(testData.mobile);
      
      // Click 'Create Account' button
      await page.getByRole('button', { name: 'Create Account' }).click();
    });

    await test.step('Verify account creation and login', async () => {
      // Verify that 'ACCOUNT CREATED!' is visible
      await expect(page).toHaveURL('https://automationexercise.com/account_created');
      await expect(page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');
      
      // Click 'Continue' button
      await page.getByRole('link', { name: 'Continue' }).click();
      
      // Verify that user is logged in successfully
      await expect(page).toHaveURL('https://automationexercise.com/');
      await expect(page.locator('text=Logged in as')).toBeVisible();
    });

    await test.step('Delete account and verify', async () => {
      // Click 'Delete Account' button
      await page.getByRole('link', { name: ' Delete Account' }).click();
      
      // Verify that 'ACCOUNT DELETED!' is visible
      await expect(page).toHaveURL('https://automationexercise.com/delete_account');
      await expect(page.locator('h2[data-qa="account-deleted"]')).toContainText('Account Deleted!');
      
      // Click 'Continue' button
      await page.getByRole('link', { name: 'Continue' }).click();
    });
  });
});
