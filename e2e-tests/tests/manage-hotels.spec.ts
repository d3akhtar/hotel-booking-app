import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/"

test.beforeEach(async ({page}) => { // code to run before each test, in this, case we sign in before we do anything
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
})

test('should allow user to add hotel', async ({page}) => {
    await page.goto(UI_URL + "add-hotel")

    await expect(page.getByRole("heading", {name: "Add Hotel"})).toBeVisible();

    await page.locator("[name=name]").fill("test name")
    await page.locator("[name=city]").fill("test city")
    await page.locator("[name=country]").fill("test country")
    await page.locator("[name=description]").fill("test desc")

    await page.locator("[name=pricePerNight]").fill("1")
    await page.selectOption('select[name="starRating"]', "3") // code for select option
    await page.getByText("Budget").click()
    await page.getByLabel("Free Wifi").check() // for checkboxes
    await page.getByLabel("Parking").check() // for checkboxes

    await page.locator("[name=adultCount]").fill("1")
    await page.locator("[name=childCount]").fill("2")

    // uploading image
    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "testImageFiles", "uh.png"),
        path.join(__dirname, "testImageFiles", "varv.png")
    ])

    await page.getByRole("button", {name: "Save"}).click()

    await expect(page.getByText("Hotel added successfully")).toBeVisible()
})

test('should allow user to view hotels', async ({page}) => {
    await page.goto(UI_URL + "my-hotels")

    await expect(page.getByRole("heading", {name: "My Hotels"})).toBeVisible()
    await expect(page.getByRole("heading", {name: "test"})).toBeVisible()
    await expect(page.getByText("test desc")).toBeVisible()
    await expect(page.getByText("test city, test country")).toBeVisible()
    await expect(page.getByText("Budget")).toBeVisible()
    await expect(page.getByText("$1 per night")).toBeVisible()
    await expect(page.getByText("1 adults, 2 children")).toBeVisible()
    await expect(page.getByText("3 Star rating")).toBeVisible()
    await expect(page.getByRole("link", {name: "View Details"})).toBeVisible()
})