import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters,
} from "@microsoft/sp-listview-extensibility";

import DateCustomizer, {
  IDateCustomizerProps,
} from "./components/DateCustomizer";

export interface IDateCustomizerFieldCustomizerProperties {}

export default class DateCustomizerFieldCustomizer extends BaseFieldCustomizer<IDateCustomizerFieldCustomizerProperties> {
  // Description: This function is called when the app initializes.
  public onInit(): Promise<void> {
    return Promise.resolve();
  }

  /* Description: This function is called when the field customizer is rendered.
    - In the onRenderCell function, we create a React element for the DateCustomizer component.
    - The DateCustomizer component takes the field value (event.fieldValue) and the product title (event.listItem.getValueByName("Title")) as properties.
    - We render the React element into the DOM element that hosts the field customizer (event.domElement). 
  */
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const dateCustomizer: React.ReactElement<{}> = React.createElement(
      DateCustomizer,
      {
        // The field value is passed to the DateCustomizer component as a property.
        text: event.fieldValue,
        // The product title is passed to the DateCustomizer component as a property.
        // We use the getValueByName method to get the value of the Title field,
        //   even though we are in the ReleaseDate field customizer.
        productTitle: event.listItem.getValueByName("Title"),
      } as IDateCustomizerProps
    );

    // Render the React element into the DOM.
    ReactDOM.render(dateCustomizer, event.domElement);
  }

  // Description: This function is called when the field customizer is removed from the DOM.
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    ReactDOM.unmountComponentAtNode(event.domElement);
    super.onDisposeCell(event);
  }
}
