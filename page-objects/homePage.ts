import { lazyPage } from "../lazyPage";
import { getPage } from "../globalPageContext";

class HomePage {
  async navigateToHomepage() {
    await getPage().goto("https://playwright.dev/");
  }
}

export const homePage = lazyPage(HomePage);
