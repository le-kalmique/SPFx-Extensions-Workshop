import { Log } from "@microsoft/sp-core-library";
import {
  BaseApplicationCustomizer,
  PlaceholderName,
} from "@microsoft/sp-application-base";

import headerHtml from "./markdown/header.html";
import * as strings from "TestCustomizerApplicationCustomizerStrings";
import styles from "./styles/footer.module.scss";
import { Dialog } from "@microsoft/sp-dialog";

const LOG_SOURCE: string = "TestCustomizerApplicationCustomizer";

export interface ITestCustomizerApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TestCustomizerApplicationCustomizer extends BaseApplicationCustomizer<ITestCustomizerApplicationCustomizerProperties> {
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    Dialog.alert("Dialog action!").catch(console.error);

    this._renderTopPlaceholder();
    this._renderBottomPlaceholder();

    document
      .querySelector("[data-automationid='SiteHeader']")
      .setAttribute("style", "display: none;");

    return Promise.resolve();
  }

  private _renderTopPlaceholder(): void {
    const topPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Top
    );
    if (!topPlaceholder) {
      console.error("The expected placeholder (Top) was not found.");
      return;
    }
    topPlaceholder.domElement.innerHTML = headerHtml;
  }

  private _renderBottomPlaceholder(): void {
    const bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
      PlaceholderName.Bottom
    );
    if (!bottomPlaceholder) {
      console.error("The expected placeholder (Bottom) was not found.");
      return;
    }
    bottomPlaceholder.domElement.innerHTML = `
      <footer class=${styles.footer}>
        <p>Footer</p>
      </footer>
    `;
  }
}
