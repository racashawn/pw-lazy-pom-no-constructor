import { lazyPage } from "../lazyPage";
import { getPage } from "../globalPageContext";

class TestConfigurationPage {
  header = () => getPage().getByRole("heading", { name: "Test configuration" });

  async checkHeaderVisibility() {
    await this.header().isVisible();
  }
}
export const testConfigurationPage = lazyPage(TestConfigurationPage);
