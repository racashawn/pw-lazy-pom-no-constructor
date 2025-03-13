import { test as base, Page, BrowserContext } from "@playwright/test";
import { setPage, clearPage } from "./globalPageContext";

export const test = base.extend<{ page: Page; context: BrowserContext }>({
  context: async ({ browser }, use) => {
    // console.log("Creating a new browser context...");
    const context = await browser.newContext();
    await use(context);
    // console.log("Browser context closed.");
  },

  page: async ({ context }, use, testInfo) => {
    // console.log(`Creating a new page for test ${testInfo.testId}...`);
    const page = await context.newPage();
    await use(page);
  },
});

// Ensures `setPage()` runs before every test
test.beforeEach(async ({ page }, testInfo) => {
  // console.log(`Before Each: Ensuring setPage() runs for test ${testInfo.testId}`);
  setPage(page, testInfo.testId);
});

// Ensures `clearPage()` runs after every test
test.afterEach(async ({}, testInfo) => {
  // console.log(`After Each: Ensuring clearPage() runs for test ${testInfo.testId}`);
  clearPage(testInfo.testId);
});
