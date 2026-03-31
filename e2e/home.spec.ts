import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Home – hero section", () => {
  test("h1 renders with site owner's name", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Benjamín Díaz");
  });

  test("hero h2 subtitle is visible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("CTA button links to /about", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // "Learn more about me →"
    const ctaLink = page.getByRole("link", { name: /learn more about me/i });
    await expect(ctaLink).toBeVisible();
    const href = await ctaLink.getAttribute("href");
    expect(href).toMatch(/\/about$/);
  });
});

test.describe("Home – sections", () => {
  test("projects section is visible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("section#projects")).toBeVisible();
  });

  test("blog section is visible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("section#blog")).toBeVisible();
  });

  test("contact section is visible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("section#contact")).toBeVisible();
  });

  test("contact email link is visible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
  });

  test("at least one social link is present", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // Links section renders github/linkedin/etc.
    const githubLink = page.locator('a[href*="github.com"]').first();
    await expect(githubLink).toBeVisible();
  });
});

test.describe("Home – featured content", () => {
  test("featured project card renders in projects section", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const projectsSection = page.locator("section#projects");
    // drizip is featured, should appear
    await expect(projectsSection.getByText("Drizip SpA")).toBeVisible();
  });

  test("view all projects link is present", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const viewAll = page.locator("section#projects").getByRole("link", { name: /view all/i });
    await expect(viewAll).toBeVisible();
    const href = await viewAll.getAttribute("href");
    expect(href).toMatch(/\/projects$/);
  });
});
