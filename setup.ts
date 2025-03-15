import { test as base, Page } from "@playwright/test";
import { setPage } from "./globalPageContext";

// Extend the base test fixture with our page handling
export const test = base.extend<{ page: Page }>({
  page: async ({ browser }, use) => {
    await use(await browser.newPage());
  },
});

// Set the page instance before each test
test.beforeEach(async ({ page }) => setPage(page));
