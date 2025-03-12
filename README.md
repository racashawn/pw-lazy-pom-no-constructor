
# 🎭 Playwright Lazy POM - No Constructor

🚀 A TypeScript-based Playwright automation framework that eliminates the need for constructors in Page Objects and automatically lazy-loads pages while maintaining parallel execution safety.

## 📌 Key Features

- ✅ No constructors needed in Page Objects
- ✅ Lazy instantiation – Pages are only created when accessed
- ✅ Fully parallel-safe – Works with multiple test workers
- ✅ Automatic session handling – Supports storageState for authentication
- ✅ Simplified test syntax – No need to pass page manually
```
/project-root
 ├── /pageObjects          # Page Object Model (POM) classes
 │    ├── HomePage.ts
 │    ├── DashboardPage.ts
 │    ├── TestConfigurationPage.ts
 ├── /tests                # Test files
 │    ├── example.spec.ts
 ├── globalPageContext.ts  # Manages Playwright pages per test worker
 ├── lazyPage.ts           # Lazy page loader
 ├── setup.ts              # Playwright fixture setup
 ├── README.md             # This file
 ├── playwright.config.ts  # Playwright configuration
 ├── package.json          # Dependencies
```

## Global Page Context
The globalPageContext.ts file manages page instances for parallel test execution:
```
// filepath: [globalPageContext.ts](http://_vscodecontentref_/7)
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
```

## Setup File
The setup.ts file extends Playwright's test object to manage page instances:
```
import { test as base, Page } from "@playwright/test";
import { setPage, clearPage } from "./globalPageContext";

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use, testInfo) => {
    setPage(page, testInfo.workerIndex); // ✅ Store the correct page before running the test
    console.log(`✅ setPage() called for worker ${testInfo.workerIndex}`);

    await use(page); // ✅ Run the test

    clearPage(testInfo.workerIndex); // ✅ Clean up after the test
    console.log(`🧹 clearPage() called for worker ${testInfo.workerIndex}`);
  },
});

// ✅ Add a test hook to ensure `setPage()` runs before any test starts
test.beforeEach(async ({ page }, testInfo) => {
  console.log(`🔥 beforeEach: Ensuring setPage() runs before tests`);
  setPage(page, testInfo.workerIndex);
});
```

## Page Objects
Page objects are defined in the page-objects directory. Here is an example of the InstallationPage class:
```
import { lazyPage } from "../lazyPage";
import { getPage } from "../globalPageContext";

class InstallationPage {

  //locators
  testConfigurationLink = () => getPage().getByRole("link", { name: "Test configuration" });
  introductionLink = () => getPage().getByRole("link", { name: "Introduction", exact: true });
  installPwLink = () => getPage().getByRole("link", { name: "Installing Playwright", exact: true });
  whatsInstalled = () => getPage().getByRole("link", { name: "What's Installed" }).nth(2);
  //etc



  //methods
  clickOnAllLinks = async () => { //fat arrow function
    await this.introductionLink().click();
    await this.installPwLink().click();
    await this.whatsInstalled().click();
    await getPage().getByRole("link", { name: "What's Installed" }).nth(2); //example of not using a locator
    //etc
  };


  async goToTestConfiguration() { //normal function declaration
    await this.testConfigurationLink().click();
  }
}

export const installationPage = lazyPage(InstallationPage);
```

## Test example:
```
import { test } from "../setup";
import { homePage } from "../page-objects/homePage";
import { installationPage } from "../page-objects/installationPage";
import { testConfigurationPage } from "../page-objects/testConfigurationPage";

test("Test 1", async () => {
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
});

test("Test2", async () => {
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await testConfigurationPage().checkHeaderVisibility();
});
```
## clone it:
```
https://github.com/racashawn/pw-lazy-pom-no-constructor.git
```
