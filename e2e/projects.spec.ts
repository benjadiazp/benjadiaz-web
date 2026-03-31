import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Projects – listing page", () => {
  test("renders at least one project card", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    // Each card has an h2 with the project title
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("project title links to detail page", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    // Drizip SpA should be listed
    await expect(page.getByRole("link", { name: "Drizip SpA" }).first()).toBeVisible();
  });

  test("tag filter buttons are rendered", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    // "All" button exists
    await expect(page.getByRole("button", { name: "All" }).first()).toBeVisible();
    // At least one tag button (React is a tag on drizip)
    await expect(page.getByRole("button", { name: "React" })).toBeVisible();
  });

  test("clicking a tag button filters the project list", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    const allCards = await page.locator("h2 a").count();
    // Click a tag that not all projects have — 'Meteor' only on drizip
    await page.getByRole("button", { name: "Meteor" }).click();
    await page.waitForTimeout(200);
    const filteredCards = await page.locator("h2 a").count();
    expect(filteredCards).toBeLessThanOrEqual(allCards);
    expect(filteredCards).toBeGreaterThan(0);
  });

  test("clicking All resets the filter", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    const allCards = await page.locator("h2 a").count();
    await page.getByRole("button", { name: "Meteor" }).click();
    await page.waitForTimeout(200);
    // Click "All" (first one, since BlogGrid also has All)
    await page.getByRole("button", { name: "All" }).first().click();
    await page.waitForTimeout(200);
    const resetCards = await page.locator("h2 a").count();
    expect(resetCards).toBe(allCards);
  });

  test("clicking project card navigates to detail page", async ({ page }) => {
    await page.goto(BASE + "/projects");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: "Drizip SpA" }).first().click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/projects/drizip");
  });
});

test.describe("Projects – detail page", () => {
  test("detail page renders h1 with project title", async ({ page }) => {
    await page.goto(BASE + "/projects/drizip");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Drizip SpA");
  });

  test("detail page has main landmark", async ({ page }) => {
    await page.goto(BASE + "/projects/drizip");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("back to projects link exists", async ({ page }) => {
    await page.goto(BASE + "/projects/drizip");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("link", { name: /back to projects/i })).toBeVisible();
  });

  test("back to projects link navigates to /projects", async ({ page }) => {
    await page.goto(BASE + "/projects/drizip");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /back to projects/i }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/projects");
    expect(page.url()).not.toContain("/drizip");
  });

  test("unknown project slug shows 404", async ({ page }) => {
    await page.goto(BASE + "/projects/nonexistent-slug-xyz");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").filter({ hasText: "404" })).toBeVisible();
  });
});
