import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import styles from "./TitleFieldFieldCustomizer.module.scss";

export interface ITitleFieldFieldCustomizerProperties {}

export default class TitleFieldFieldCustomizer extends BaseFieldCustomizer<ITitleFieldFieldCustomizerProperties> {
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const starIcon = `
      <?xml version="1.0" encoding="utf-8"?>
      <svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>star</title>
      <path d="M3.488 13.184l6.272 6.112-1.472 8.608 7.712-4.064 7.712 4.064-1.472-8.608 6.272-6.112-8.64-1.248-3.872-7.808-3.872 7.808z"></path>
      </svg>
      `;
    event.domElement.innerHTML = `
      <div class="${styles.titleField}">
        ${starIcon}
        ${event.fieldValue}
      </div>
    `;
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    super.onDisposeCell(event);
  }
}
