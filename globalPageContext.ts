import { Page, test } from "@playwright/test";

const pageInstances = new Map<string, Page>();

export function setPage(page: Page, testId: string) {
  // console.log(`[globalPageContext] Storing page for test ${testId}`);
  pageInstances.set(testId, page);
  
}

export function getPage(): Page {
  const testId = test.info().testId;
  // console.log(`[globalPageContext] Retrieving page for test ${testId}`);

  if (!pageInstances.has(testId)) {
    console.error(`[globalPageContext] ERROR: No page found for test ${testId}!`);
  } else {
    console.log(`[globalPageContext] Successfully retrieved page for test ${testId}`);
  }

  const page = pageInstances.get(testId);
  if (!page) {
    throw new Error("Page is not set. Call setPage(page) first.");
  }
  console.log(pageInstances.size)
  return page;
}

export function clearPage(testId: string) {
  console.log(`[globalPageContext] Clearing page for test ${testId}`);
  pageInstances.delete(testId);
}

