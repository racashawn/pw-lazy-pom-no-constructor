
# 🎭 [EXPERIMENT] Playwright Lazy POM 

🚀 An experiment of a TypeScript-based Playwright automation framework that eliminates the need for constructors in Page Objects and automatically lazy-loads pages while maintaining parallel execution safety.

## 📌 Key Features

- ✅ No constructors needed in Page Objects
- ✅ Lazy instantiation – Pages are only created when accessed
- ✅ Fully parallel-safe – Works with multiple test workers
- ✅ Simplified test syntax – No need to pass page manually
```
/project-root
 ├── /pageObjects          # Page Object Model (POM) classes
 │    ├── HomePage.ts
 │    ├── DashboardPage.ts
 │    ├── TestConfigurationPage.ts
 ├── /tests                # Test files
 │    ├── example.spec.ts
      ├── others
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

```

## Page Objects
Page objects are defined in the page-objects directory. Here is an example of the InstallationPage class:
```
import { lazyPage } from "../lazyPage";
import { getPage } from "../globalPageContext";

class InstallationPage {

  //locators can be defined as properties for sections of the page
  sidePanel = {
    testConfigurationLink: () => getPage().getByRole("link", { name: "Test configuration" }),
    introductionLink: () => getPage().getByRole("link", { name: "Introduction", exact: true }),
    installPwLink: () => getPage().getByRole("link", { name: "Installing Playwright", exact: true }),
    whatsInstalled: () => getPage().getByRole("link", { name: "What's Installed" }).nth(2)
  };

  //or as members of the class as function expression
  testConfigurationLink = () => getPage().getByRole("link", { name: "Test configuration" });
  //etc


  //methods
  clickOnAllLinks = async () => { 
    await this.sidePanel.introductionLink().click();
    await this.sidePanel.whatsInstalled().click();
    await this.sidePanel.installPwLink().click();
    await getPage().getByRole("link", { name: "What's Installed" }).nth(2).click(); //example of not using a locator
    //etc
  };

  async goToTestConfiguration() { //normal function declaration
    await this.sidePanel.testConfigurationLink().click();
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
