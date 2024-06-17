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