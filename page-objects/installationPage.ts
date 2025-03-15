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

  //or as member of the class
  testConfigurationLink = () => getPage().getByRole("link", { name: "Test configuration" });
  //etc



  //methods
  clickOnAllLinks = async () => { //fat arrow function
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
