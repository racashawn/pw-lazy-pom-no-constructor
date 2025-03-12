import { test as base, Page } from "@playwright/test";
import { setPage, clearPage } from "./globalPageContext";

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use, testInfo) => {
    setPage(page, testInfo.workerIndex); // Store the correct page before running the test
    console.log(`setPage() called for worker ${testInfo.workerIndex}`);

    await use(page); // Run the test

    clearPage(testInfo.workerIndex); // Clean up after the test
    console.log(`clearPage() called for worker ${testInfo.workerIndex}`);
  },
});

// Add a test hook to ensure `setPage()` runs before any test starts
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`beforeEach: Ensuring setPage() runs before tests`);
  setPage(page, testInfo.workerIndex);
});