import { Page, test } from "@playwright/test";

const pageInstances = new Map<number, Page>();

export function setPage(page: Page, workerIndex: number) {
  console.log(`✅ Setting page for worker ${workerIndex}`);
  pageInstances.set(workerIndex, page);
}

export function getPage(): Page {
  const workerIndex = test.info().workerIndex;
  console.log(`🔹 Getting page for worker ${workerIndex}`);
  
  const page = pageInstances.get(workerIndex);
  if (!page) {
    console.error(`❌ ERROR: No page found for worker ${workerIndex}!`);
    throw new Error("❌ Page is not set. Call setPage(page) first.");
  }

  return page;
}

export function clearPage(workerIndex: number) {
  console.log(`🧹 Clearing page for worker ${workerIndex}`);
  pageInstances.delete(workerIndex);
}