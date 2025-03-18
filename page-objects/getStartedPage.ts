import { expect } from "@playwright/test";
import { getPage } from "../globalPageContext";
import { lazyPage } from "../lazyPage";

class GetStartedPage {
  navbarApi = () => getPage().locator('a[href="/docs/api/class-playwright"]');

  async getStarted() {
    await getPage().getByRole("link", { name: "Get started" }).click();
  }

  async clickAllLinks() {
    await getPage().getByRole("link", { name: "Introduction", exact: true }).click();
    await getPage().getByRole("link", { name: "Installing Playwright", exact: true }).click();
    await getPage().getByRole("link", { name: "What's Installed" }).nth(2).click();
    await getPage().getByRole("link", { name: "Running the Example Test", exact: true }).click();
    await expect(getPage().getByRole("img", { name: "tests running in command line" })).toBeVisible();
  }

  async clickApiLink() {
    await this.navbarApi().waitFor({ state: "attached" });
    await this.navbarApi().waitFor({ state: "visible" });
    await this.navbarApi().click({ force: true });
  }
}

export const getStartedPage = lazyPage(GetStartedPage);
