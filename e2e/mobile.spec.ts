import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

// Use a mobile viewport for all tests in this file
test.use({ viewport: { width: 375, height: 812 } });

test.describe("Mobile – hamburger menu", () => {
  test("desktop nav is not visible on mobile", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // The desktop nav container has `hidden md:flex` — it should not be visible
    const desktopNav = page.locator(".hidden.md\\:flex").first();
    await expect(desktopNav).not.toBeVisible();
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const hamburger = page.getByRole("button", { name: "Open menu" });
    await expect(hamburger).toBeVisible();
  });

  test("clicking hamburger opens the mobile menu", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open menu" }).click();
    // MobileMenu renders nav links — check for Projects link
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Blog" })).toBeVisible();
    await expect(page.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("Escape key closes the mobile menu", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    await expect(page.getByRole("link", { name: "Projects" })).not.toBeVisible();
  });

  test("clicking a nav link in mobile menu navigates correctly", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "About" }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/about");
  });

  test("hamburger button label changes to 'Close menu' when open", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open menu" }).click();
    // After opening, the button aria-label should be "Close menu"
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  });
});

test.describe("Mobile – search", () => {
  test("search is accessible via mobile menu", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Open menu" }).click();
    // MobileMenu has a search button
    await page.getByRole("button", { name: /search/i }).first().click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });
});
