import { getPage } from "../globalPageContext";
import { lazyPage } from "../lazyPage";

class HomePage {
  //locators
  getStartedButton = () => getPage().getByRole("link", { name: "Get started" });
  //etc locators

  //methods
  async navigateToHomepage() {
    await getPage().goto("https://playwright.dev/");
  }

  async clickGetStarted() {
    await this.getStartedButton().click();
  }
}

//export with lazyPage(), run in debug step by step to see lazyPage() and workerIndex (parallelism fully working)
export const homePage = lazyPage(HomePage);
