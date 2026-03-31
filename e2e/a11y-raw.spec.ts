import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = "http://localhost:3111";

// Capture raw DOM and violations regardless of app errors
test("capture page DOM and violations – en-US", async ({ page }) => {
  await page.goto(BASE + "/");
  // Wait for React client hydration
  await page.waitForTimeout(3000);

  const title = await page.title();
  const lang = await page.locator("html").getAttribute("lang");
  const bodyHTML = await page.locator("body").innerHTML();
  console.log("PAGE TITLE:", title);
  console.log("HTML LANG:", lang);
  console.log("BODY (first 2000 chars):", bodyHTML.slice(0, 2000));

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  console.log("VIOLATIONS COUNT:", results.violations.length);
  results.violations.forEach(v => {
    console.log(`\n--- VIOLATION: ${v.id} (${v.impact}) ---`);
    console.log("Description:", v.description);
    v.nodes.forEach(n => console.log("  Node:", n.html.slice(0, 200)));
  });
});

test("capture page DOM after hydration – check client render", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.waitForTimeout(5000);

  // Screenshot
  await page.screenshot({ path: "e2e/screenshots/homepage-light.png", fullPage: true });

  const interactiveEls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("button, a, input, textarea, select, [tabindex]")).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 50),
      href: (el as HTMLAnchorElement).href,
      ariaLabel: el.getAttribute("aria-label"),
      ariaHidden: el.getAttribute("aria-hidden"),
      tabindex: el.getAttribute("tabindex"),
      role: el.getAttribute("role"),
    }));
  });
  console.log("INTERACTIVE ELEMENTS:", JSON.stringify(interactiveEls, null, 2));

  const headings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map(h => ({
      level: h.tagName,
      text: h.textContent?.trim().slice(0, 80),
    }));
  });
  console.log("HEADINGS:", JSON.stringify(headings, null, 2));

  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("img")).map(img => ({
      src: img.src?.slice(0, 80),
      alt: img.alt,
      role: img.getAttribute("role"),
    }));
  });
  console.log("IMAGES:", JSON.stringify(images, null, 2));

  const landmarks = await page.evaluate(() => {
    const tags = ["header", "nav", "main", "footer", "section", "article", "aside"];
    return tags.flatMap(tag =>
      Array.from(document.querySelectorAll(tag)).map(el => ({
        tag,
        ariaLabel: el.getAttribute("aria-label"),
        ariaLabelledby: el.getAttribute("aria-labelledby"),
        id: el.id,
        children: el.childElementCount,
      }))
    );
  });
  console.log("LANDMARKS:", JSON.stringify(landmarks, null, 2));
});

test("capture dark mode DOM", async ({ page }) => {
  await page.goto(BASE + "/");
  await page.waitForTimeout(4000);

  // Try to find and click theme toggle
  const buttons = page.locator("button");
  const count = await buttons.count();
  console.log("Button count:", count);
  for (let i = 0; i < count; i++) {
    const btn = buttons.nth(i);
    const text = await btn.textContent();
    const ariaLabel = await btn.getAttribute("aria-label");
    console.log(`Button ${i}: text="${text?.trim()}", aria-label="${ariaLabel}"`);
  }

  // Screenshot dark mode
  await page.screenshot({ path: "e2e/screenshots/homepage-dark.png", fullPage: true });
});
