import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Navigation – page loading", () => {
  test("home page loads with main landmark", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test("about page loads", async ({ page }) => {
    await page.goto(BASE + "/about");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("projects page loads", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("blog page loads", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Navigation – es-CL locale pages load", () => {
  test("es-CL home loads", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main#main-content")).toBeVisible();
  });

  test("es-CL about loads", async ({ page }) => {
    await page.goto(BASE + "/es-CL/about");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("es-CL projects loads", async ({ page }) => {
    await page.goto(BASE + "/es-CL/projects");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("es-CL blog loads", async ({ page }) => {
    await page.goto(BASE + "/es-CL/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });
});

test.describe("Navigation – 404 handling", () => {
  test("unknown route shows 404 UI", async ({ page }) => {
    await page.goto(BASE + "/nonexistent-page-xyz");
    await page.waitForLoadState("networkidle");
    // The NotFound page renders an h1 "404"
    await expect(page.locator("h1").filter({ hasText: "404" })).toBeVisible();
  });
});

test.describe("Navigation – header links", () => {
  test("site name link navigates to home", async ({ page }) => {
    await page.goto(BASE + "/about");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: "Benjamín Díaz" }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toMatch(/localhost:3111\/?$/);
  });

  test("about page back-home link returns to home", async ({ page }) => {
    await page.goto(BASE + "/about");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /back home/i }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toMatch(/localhost:3111\/?$/);
  });
});
