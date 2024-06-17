import { test, expect } from '@playwright/test';

// no real best way to name test, but a convention is to use a "should" or "should not" approach
const UI_URL = "http://localhost:5173/"

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get sign in button
  await page.getByRole("link", {
    name: "Sign In"
  }).click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("a@a.com");
  await page.locator("[name=password]").fill("123123")

  await page.getByRole("button", {name: "Sign In"}).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible(); // check if toaster pops up

  // Check header links
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
});

test('should not allow user to register', async ({page}) => {
  await page.goto(UI_URL)

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();

  // Click link to go to register page
  await page.getByRole("link", { name: "Create one here" }).click()

  // Expect a title that says Create An Account
  await expect(page.getByRole("heading", { name: "Create An Account"})).toBeVisible();

  await page.locator("[name=email]").fill("test1@t.com");
  await page.locator("[name=password]").fill("123123");
  await page.locator("[name=firstName]").fill("a");
  await page.locator("[name=lastName]").fill("a");
  await page.locator("[name=confirmPassword]").fill("123123");

  // register account
  await page.getByRole("button", {name: "Create Account"}).click();

  // check if toast error shows up
  await expect(page.getByText("User already exists")).toBeVisible();
})

test('should allow user to register', async({ page }) => {
  const testEmail = `test_register_${Math.floor(Math.random() * 900000) + 10000}@test.com`
  await page.goto(UI_URL)

  // get sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { name: "Sign In"})).toBeVisible();

  // Click link to go to register page
  await page.getByRole("link", { name: "Create one here" }).click()

  // Expect a title that says Create An Account
  await expect(page.getByRole("heading", { name: "Create An Account"})).toBeVisible();

  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("123123");
  await page.locator("[name=firstName]").fill("a");
  await page.locator("[name=lastName]").fill("a");
  await page.locator("[name=confirmPassword]").fill("123123");

  // register account
  await page.getByRole("button", {name: "Create Account"}).click();

  // Check header links, should be same as the ones you see after you log in
  await expect(page.getByRole("link", {name: "My Bookings"})).toBeVisible();
  await expect(page.getByRole("link", {name: "My Hotels"})).toBeVisible();
  await expect(page.getByRole("button", {name: "Sign Out"})).toBeVisible();
})