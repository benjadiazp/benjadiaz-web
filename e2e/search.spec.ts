import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3111";

test.describe("Search – dialog open/close", () => {
  test("search button opens dialog", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("Ctrl+K opens search dialog", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("Escape closes search dialog", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("clicking outside dialog closes it", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    // Click on the backdrop (outside the dialog box)
    await page.mouse.click(10, 10);
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});

test.describe("Search – querying", () => {
  test("input is focused when dialog opens", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    const input = page.locator('input[type="text"]');
    await expect(input).toBeFocused();
  });

  test("typing 'Drizip' shows a matching result", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("dialog").locator('input[type="text"]').fill("Drizip");
    // Drizip SpA should appear as a result
    await expect(page.getByRole("dialog").getByText("Drizip SpA")).toBeVisible();
  });

  test("typing a non-matching query shows no results message", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("dialog").locator('input[type="text"]').fill("zzz-no-match-xyz");
    await expect(page.getByRole("dialog").getByText("No results found.")).toBeVisible();
  });

  test("results are grouped (shows Projects group label)", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("dialog").locator('input[type="text"]').fill("Drizip");
    await expect(page.getByRole("dialog").getByText("Projects")).toBeVisible();
  });

  test("clicking a result navigates and closes dialog", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Search" }).click();
    await page.getByRole("dialog").locator('input[type="text"]').fill("Drizip");
    await page.getByRole("dialog").getByText("Drizip SpA").click();
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain("/projects/drizip");
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });
});
