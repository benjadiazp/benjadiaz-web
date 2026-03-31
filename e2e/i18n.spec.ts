import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("i18n – html lang attribute", () => {
  test("en-US page has lang='en-US'", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en-US");
  });

  test("es-CL page has lang='es-CL'", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es-CL");
  });
});

test.describe("i18n – language switching", () => {
  test("clicking ES button on home navigates to /es-CL", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // LanguageSwitch ES button aria-label: "Switch language to ES"
    await page.getByRole("button", { name: "Switch language to ES" }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/es-CL");
  });

  test("clicking EN button on es-CL navigates back to /", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    // LanguageSwitch EN button aria-label: "Switch language to EN"
    await page.getByRole("button", { name: "Switch language to EN" }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).not.toContain("/es-CL");
  });

  test("navigation still works after switching to es-CL", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    await page.goto(BASE + "/es-CL/projects");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es-CL");
  });

  test("language switch persists on subpages", async ({ page }) => {
    await page.goto(BASE + "/about");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Switch language to ES" }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/es-CL");
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("es-CL");
  });
});
