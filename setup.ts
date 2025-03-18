import { test as base, Page } from "@playwright/test";
import { setPage } from "./globalPageContext";

// Extend the base test fixture with our page handling
export const test = base.extend<{ setupPage: void }>({
  setupPage: [async ({ page }, use) => {
    console.log("[setup.ts] Automatically setting up page instance");
    setPage(page);
    await use();
    console.log("[setup.ts] Automatically closing page instance");
    await page.close();
  }, { auto: true }],
});
