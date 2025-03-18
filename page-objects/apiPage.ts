import { expect } from "@playwright/test";
import { getPage } from "../globalPageContext";
import { lazyPage } from "../lazyPage";

class ApiPage {
  navbarHeading = () => getPage().getByRole("heading", { name: "Playwright Library" });
  properties = () => ({
    chromium: () => getPage().getByRole("link", { name: "chromium", exact: true }),
    device: () => getPage().getByRole("link", { name: "devices", exact: true }),
    errors: () => getPage().getByRole("link", { name: "errors", exact: true }),
    firefox: () => getPage().getByRole("link", { name: "firefox", exact: true }),
    request: () => getPage().getByRole("link", { name: "request", exact: true }),
    selectors: () => getPage().getByRole("link", { name: "selectors", exact: true }),
    webkit: () => getPage().getByRole("link", { name: "webkit", exact: true }),
  });

  async isOnApiPage() {
    await this.navbarHeading().waitFor({ state: "attached" });
    await this.navbarHeading().waitFor({ state: "visible" });
    await expect(this.navbarHeading()).toBeVisible();
  }

  async clickChromium() {
    await this.properties().chromium().click();
  }
  async clickAllPropertiesLinks() {
    await this.properties().chromium().click();
    await this.properties().device().click();
    await this.properties().errors().click();
    await this.properties().firefox().click();
    await this.properties().request().click();
    await this.properties().selectors().click();
    await this.properties().webkit().click();
  }
}

export const apiPage = lazyPage(ApiPage);
