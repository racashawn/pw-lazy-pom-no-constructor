
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
```

## Setup File
The setup.ts file extends Playwright's test object to manage page instances:
```
import { test as base, Page } from "@playwright/test";
import { setPage } from "./globalPageContext";

export const test = base.extend<{ page: Page }>({
  page: async ({ browser }, use) => {
    const page = await browser.newPage();
    console.log("🔥 [setup.ts] Setting up new page instance");
    await use(page);
  },


});

test.beforeEach(async ({ page }) => {
  console.log(`🔥 [setup.ts] Creating new page for test: ${test.info().title}`);
  setPage(page);
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
