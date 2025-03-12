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
