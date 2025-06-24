import { test, expect } from '@playwright/test';

test.describe('User Registration and Account Management', () => {
  test('User can sign up, login and delete their account', async ({ page }) => {
    // 1. Navigate to http://automationexercise.com
    await page.goto('http://automationexercise.com');    // 2. Verify that home page is visible successfully
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.locator('h1').first()).toContainText('AutomationExercise');

    // 3. Click on 'Signup / Login' button
    await page.click("text=Signup / Login");

    // 4. Verify 'New User Signup!' is visible
    await expect(page.locator("text=New User Signup!")).toBeVisible();

    // 5. Enter name and email address
    const uniqueEmail = `testuser${Date.now()}@example.com`;
    await page.fill('input[data-qa="signup-name"]', 'John Doe');
    await page.fill('input[data-qa="signup-email"]', uniqueEmail);

    // 6. Click 'Signup' button
    await page.click('button[data-qa="signup-button"]');

    // 7. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.locator("text=Enter Account Information")).toBeVisible();

    // 8. Fill details: Title, Name, Email, Password, Date of birth
    await page.check('input[value="Mr"]');
    await page.fill('input[data-qa="password"]', 'Password123!');
    
    // Select date of birth
    await page.selectOption('select[data-qa="days"]', '15');
    await page.selectOption('select[data-qa="months"]', 'June');
    await page.selectOption('select[data-qa="years"]', '1990');

    // 9. Select checkbox 'Sign up for our newsletter!'
    await page.check('input[name="newsletter"]');

    // 10. Select checkbox 'Receive special offers from our partners!'
    await page.check('input[name="optin"]');

    // 11. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.fill('input[data-qa="first_name"]', 'John');
    await page.fill('input[data-qa="last_name"]', 'Doe');
    await page.fill('input[data-qa="company"]', 'Test Company');
    await page.fill('input[data-qa="address"]', '123 Test Street');
    await page.fill('input[data-qa="address2"]', 'Apt 456');
    await page.selectOption('select[data-qa="country"]', 'United States');
    await page.fill('input[data-qa="state"]', 'California');
    await page.fill('input[data-qa="city"]', 'Los Angeles');
    await page.fill('input[data-qa="zipcode"]', '90210');
    await page.fill('input[data-qa="mobile_number"]', '+1234567890');

    // 12. Click 'Create Account button'
    await page.click('button[data-qa="create-account"]');

    // 13. Verify that 'ACCOUNT CREATED!' is visible
    await expect(page.locator("text=Account Created!")).toBeVisible();

    // 14. Click 'Continue' button
    await page.click('a[data-qa="continue-button"]');

    // 15. Verify that 'Logged in as username' is visible
    await expect(page.locator("text=Logged in as")).toBeVisible();
    await expect(page.locator("text=John Doe")).toBeVisible();

    // 16. Click 'Delete Account' button
    await page.click("text=Delete Account");

    // 17. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    await expect(page.locator("text=Account Deleted!")).toBeVisible();
    await expect(page.locator("text=Your account has been permanently deleted!")).toBeVisible();
    await page.click('a:has-text("Continue")');

    // Verify user is redirected to homepage after account deletion
    await expect(page).toHaveTitle('Automation Exercise');
    await expect(page.locator("text=Signup / Login")).toBeVisible();
  });
});
