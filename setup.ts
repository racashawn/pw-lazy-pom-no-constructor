import { test as base, Page } from "@playwright/test";
import { setPage } from "./globalPageContext";

export const test = base.extend<{ page: Page }>({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    console.log("🔥 [setup.ts] Setting up new page instance");
    setPage(page); // ✅ Ensures the page is globally available
    await use(page);
    // clearPage(); // ✅ Ensures no test carries over a stale page reference
  },
});

test.beforeEach(async ({ page }) => {
  console.log(`🔥 [setup.ts] Before each test: Setting page instance`);
  setPage(page); // ✅ Ensures the page is globally available before each test runs
});

// test.afterEach(() => {
//   console.log(`🧹 [setup.ts] After each test: Clearing page instance`);
//   clearPage(); // ✅ Ensures no test carries over a stale page reference
// });