import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Theme – toggle", () => {
  test("default theme is light (no 'dark' class on html)", async ({ page }) => {
    // Clear any persisted theme from storage first
    await page.goto(BASE + "/");
    await page.evaluate(() => localStorage.removeItem("theme"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    const htmlClass = await page.locator("html").getAttribute("class");
    // next-themes sets 'light' or 'dark' class; should not be dark
    expect(htmlClass).not.toContain("dark");
  });

  test("clicking theme toggle switches to dark mode", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.evaluate(() => localStorage.setItem("theme", "light"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    // When in light mode, the button shows "Dark mode 🌙" (labels.dark)
    await page.getByRole("button", { name: /dark mode/i }).click();
    await page.waitForTimeout(300);
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toContain("dark");
  });

  test("clicking theme toggle again switches back to light", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.evaluate(() => localStorage.setItem("theme", "dark"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    // When in dark mode, the button shows "Light mode 🌞" (labels.light)
    await page.getByRole("button", { name: /light mode/i }).click();
    await page.waitForTimeout(300);
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).not.toContain("dark");
  });

  test("dark mode persists after navigating to another page", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.evaluate(() => localStorage.setItem("theme", "light"));
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: /dark mode/i }).click();
    await page.waitForTimeout(300);
    // Navigate to about
    await page.goto(BASE + "/about");
    await page.waitForLoadState("networkidle");
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toContain("dark");
  });
});
