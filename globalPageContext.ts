import { Page } from "@playwright/test";

let currentPage: Page | null = null;

export function setPage(page: Page) {
  console.log(`✅ setPage() called with a new page instance`);
  currentPage = page;
}

export function getPage(): Page {
  if (!currentPage) {
    throw new Error("🚨 No active page instance found! Ensure 'setPage()' is called before accessing the page.");
  }
  return currentPage;
}


// Don't use this, it sometimes clears the page before the test is done
// export function clearPage() {
//   console.log(`🧹 clearPage() called, resetting page reference`);
//   currentPage = null;
// }