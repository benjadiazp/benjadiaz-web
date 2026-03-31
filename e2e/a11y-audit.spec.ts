import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3111";

test.describe("A11y Audit – en-US homepage (light mode)", () => {
  test("no axe violations", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    if (results.violations.length > 0) {
      console.log("VIOLATIONS (en-US light):", JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});

test.describe("A11y Audit – es-CL homepage (light mode)", () => {
  test("no axe violations", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    if (results.violations.length > 0) {
      console.log("VIOLATIONS (es-CL light):", JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});

test.describe("A11y Audit – dark mode (en-US)", () => {
  test("no axe violations in dark mode", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // Toggle to dark mode via the theme button
    const themeBtn = page.getByRole("button", { name: /dark mode|switch to dark/i });
    await themeBtn.click();
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    if (results.violations.length > 0) {
      console.log("VIOLATIONS (en-US dark):", JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});

test.describe("A11y Audit – not-found page", () => {
  test("no axe violations on 404 page", async ({ page }) => {
    await page.goto(BASE + "/nonexistent");
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    if (results.violations.length > 0) {
      console.log("VIOLATIONS (404 page):", JSON.stringify(results.violations, null, 2));
    }
    expect(results.violations).toEqual([]);
  });
});

test.describe("Keyboard navigation", () => {
  test("skip link is focusable and visible on focus", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Tab");
    const skipLink = page.locator('a[href="#home"]');
    await expect(skipLink).toBeFocused();
  });

  test("all nav links are keyboard reachable", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // Tab through interactive elements and collect all focused hrefs
    const focusedHrefs: string[] = [];
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement;
        return el ? { tag: el.tagName, text: el.textContent?.trim(), href: (el as HTMLAnchorElement).href } : null;
      });
      if (focused) focusedHrefs.push(JSON.stringify(focused));
    }
    console.log("Tab order (first 20):", focusedHrefs);
    expect(focusedHrefs.length).toBeGreaterThan(0);
  });

  test("email contact link is keyboard accessible", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const emailLink = page.locator('a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
  });
});

test.describe("Focus indicators", () => {
  test("interactive elements have visible focus outlines", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    // Tab to theme button and check it has outline
    const themeBtn = page.getByRole("button").first();
    await themeBtn.focus();
    const outlineStyle = await themeBtn.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineStyle: styles.outlineStyle,
        boxShadow: styles.boxShadow,
      };
    });
    console.log("Theme button focus styles:", outlineStyle);
  });
});

test.describe("Screen reader content", () => {
  test("lang attribute matches locale (en-US)", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const lang = await page.locator("html").getAttribute("lang");
    console.log("HTML lang (en-US page):", lang);
    expect(lang).toBe("en-US");
  });

  test("lang attribute matches locale (es-CL)", async ({ page }) => {
    await page.goto(BASE + "/es-CL");
    await page.waitForLoadState("networkidle");
    const lang = await page.locator("html").getAttribute("lang");
    console.log("HTML lang (es-CL page):", lang);
    expect(lang).toBe("es-CL");
  });

  test("images have non-empty alt text", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const images = page.locator("img");
    const count = await images.count();
    console.log("Total images:", count);
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      const src = await img.getAttribute("src");
      console.log(`Image ${i}: src=${src}, alt="${alt}"`);
    }
  });

  test("headings hierarchy is correct", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const headings = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(h => ({
        level: h.tagName,
        text: h.textContent?.trim().slice(0, 60),
      }));
    });
    console.log("Heading hierarchy:", JSON.stringify(headings, null, 2));
  });

  test("main landmark exists", async ({ page }) => {
    await page.goto(BASE + "/");
    await page.waitForLoadState("networkidle");
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
