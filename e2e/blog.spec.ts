import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Blog – listing page", () => {
  test("renders at least one article card", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("article title link is visible", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    // hello-world is the only article, type "blog" → label "Articles"
    await expect(
      page.getByRole("link", { name: /Hello World: Building My Portfolio/i }).first()
    ).toBeVisible();
  });

  test("type filter tabs are rendered", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    // "All" type tab exists
    await expect(page.getByRole("button", { name: "All" }).first()).toBeVisible();
    // "Articles" tab exists (only type with content)
    await expect(page.getByRole("button", { name: "Articles" })).toBeVisible();
  });

  test("clicking Articles type tab keeps articles visible", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Articles" }).click();
    await page.waitForTimeout(200);
    await expect(
      page.getByRole("link", { name: /Hello World/i }).first()
    ).toBeVisible();
  });

  test("clicking All type tab resets filter", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Articles" }).click();
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "All" }).first().click();
    await page.waitForTimeout(200);
    await expect(page.locator("h2").first()).toBeVisible();
  });

  test("tag filter pills are visible for current results", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    // hello-world has tags: Next.js, TypeScript, Tailwind CSS
    await expect(page.getByRole("button", { name: "Next.js" })).toBeVisible();
  });

  test("clicking an article card navigates to detail page", async ({ page }) => {
    await page.goto(BASE + "/blog");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /Hello World: Building My Portfolio/i }).first().click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/blog/hello-world");
  });
});

test.describe("Blog – detail page", () => {
  test("detail page renders h1 with article title", async ({ page }) => {
    await page.goto(BASE + "/blog/hello-world");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Hello World");
  });

  test("detail page has main landmark", async ({ page }) => {
    await page.goto(BASE + "/blog/hello-world");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("main")).toBeVisible();
  });

  test("back to blog link exists", async ({ page }) => {
    await page.goto(BASE + "/blog/hello-world");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("link", { name: /back to blog/i })).toBeVisible();
  });

  test("back to blog link navigates to /blog", async ({ page }) => {
    await page.goto(BASE + "/blog/hello-world");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: /back to blog/i }).click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/blog");
    expect(page.url()).not.toContain("/hello-world");
  });

  test("article date is displayed", async ({ page }) => {
    await page.goto(BASE + "/blog/hello-world");
    await page.waitForLoadState("networkidle");
    // Date renders as "March 31, 2026" via toLocaleDateString
    await expect(page.getByText("2026")).toBeVisible();
  });

  test("unknown article slug shows 404", async ({ page }) => {
    await page.goto(BASE + "/blog/nonexistent-slug-xyz");
    await page.waitForLoadState("networkidle");
    await expect(page.locator("h1").filter({ hasText: "404" })).toBeVisible();
  });
});
