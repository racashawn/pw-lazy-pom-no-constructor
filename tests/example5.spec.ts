import { test } from "../setup";
import { homePage } from "../page-objects/homePage";
import { getStartedPage } from "../page-objects/getStartedPage";
import { apiPage } from "../page-objects/apiPage";

test("test1", async () => {
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
  await apiPage().clickChromium();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
  await apiPage().clickChromium();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
  await apiPage().clickChromium();
});

test("test2", async () => {
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  await apiPage().isOnApiPage();
});

test("test4", async () => {
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  //   await getPage().pause()
  await apiPage().isOnApiPage();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  //   await getPage().pause()
  await apiPage().isOnApiPage();
  await homePage().navigateToHomepage();
  await getStartedPage().getStarted();
  await getStartedPage().clickApiLink();
  //   await getPage().pause()
  await apiPage().isOnApiPage();
});
