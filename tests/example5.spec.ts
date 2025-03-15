import { test } from "../setup";
import { homePage } from "../page-objects/homePage";
import { installationPage } from "../page-objects/installationPage";
import { testConfigurationPage } from "../page-objects/testConfigurationPage";

test.beforeEach(async () => {
  console.log("Before each test");
});

test("Test 1", async () => {
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
});

test("Test2", async () => {
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await testConfigurationPage().checkHeaderVisibility();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await testConfigurationPage().checkHeaderVisibility();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await testConfigurationPage().checkHeaderVisibility();
});

test("Test 3", async () => {
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
  await homePage().navigateToHomepage();
  await homePage().clickGetStarted();
  await installationPage().clickOnAllLinks();
});
