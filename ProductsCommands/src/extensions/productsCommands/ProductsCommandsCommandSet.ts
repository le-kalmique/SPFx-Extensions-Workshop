import { Log } from "@microsoft/sp-core-library";
import {
  BaseListViewCommandSet,
  // Command,
  IListViewCommandSetExecuteEventParameters,
  ListViewStateChangedEventArgs,
} from "@microsoft/sp-listview-extensibility";
import { Dialog } from "@microsoft/sp-dialog";
import { sp } from "@pnp/sp/presets/all";

export interface IProductsCommandsCommandSetProperties {}
const LOG_SOURCE: string = "ProductsCommandsCommandSet";

export default class ProductsCommandsCommandSet extends BaseListViewCommandSet<IProductsCommandsCommandSetProperties> {
  // Description: This method is called when the command set is initialized
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, "Initialized ProductsCommandsCommandSet");

    // Check if the command exists
    // If it does, we hide it by default
    const compareCommand = this.tryGetCommand("COMPARE_THE_VOLUME");
    if (compareCommand) {
      compareCommand.visible = false;
    }

    // Subscribe to the list view state changed event
    // We do this once, when the command set is initialized
    this.context.listView.listViewStateChangedEvent.add(
      this,
      this._onListViewStateChanged
    );

    return Promise.resolve();
  }

  // Description: This method is called when one of the commands is executed (e.g. when the user clicks on a command)
  // The event parameter contains information about the command that was executed
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case "COMPARE_THE_VOLUME":
        this._compareProducts(event.selectedRows);
        break;
      case "UPDATE_RELEASE_DATE":
        this._updateReleaseDate(event.selectedRows);
        break;
      default:
        throw new Error("Unknown command");
    }
  }

  /* Description: This method updates the ReleaseDate column of the selected product.
      1. First, we create a private method called _updateReleaseDate. It takes a parameter of type any, which is the selected product.
      2. We create a variable called productId that will store the ID of the selected product. We use the getValueByName method to get the value of the ID column.
      3. We create a variable called newReleaseDate that will store the current date.
      4. We use PnP library to send a request to update the ReleaseDate column of the selected product.
      5. We use the location.reload method to refresh the page.
  */
  private _updateReleaseDate = (product: any): void => {
    const productId = product[0].getValueByName("ID");
    const newReleaseDate = new Date();

    sp.web.lists
      .getByTitle("Products")
      .items.getById(productId)
      .update({
        ReleaseDate: newReleaseDate,
      })
      .then(() => {
        location.reload();
      })
      .catch(console.error);
  };

  /* Description: This method compares the CustomerRating column of two products and displays a message box with the results.
      1. First, we create a private method called _compareProducts. It takes a parameter of type any, which is the products we are comparing.
      2. We create two variables that will store the values of the CustomerRating column. We use the getValueByName method to get the values for the columns.
      3. We create a variable called results that will store the final message.
      4. We create an if statement to compare the two values of the CustomerRating column. Based on which product is better, we create a message using the Title column and store it in the results variable.
      5. We use the Dialog.alert method to display a message box with the results. 
  */
  private _compareProducts = (product: any): void => {
    const firstRating = product[0].getValueByName("CustomerRating");
    const secondRating = product[1].getValueByName("CustomerRating");
    let results = "";

    if (firstRating > secondRating) {
      results = `${product[0].getValueByName(
        "Title"
      )} is better than ${product[1].getValueByName("Title")}`;
    } else if (firstRating < secondRating) {
      results = `${product[1].getValueByName(
        "Title"
      )} is better than ${product[0].getValueByName("Title")}`;
    }

    Dialog.alert(results).catch(console.error);
  };

  // Description: This method is called when the list view state changes
  // (e.g. when the user changes the sort order, filters or selection)
  private _onListViewStateChanged = (
    args: ListViewStateChangedEventArgs
  ): void => {
    Log.info(LOG_SOURCE, "List view state changed");

    // Check if the command exists
    const compareCommand = this.tryGetCommand("COMPARE_THE_VOLUME");
    if (compareCommand) {
      // Set the visibility of the command based on the current selection
      // (e.g. show the command if two items are selected)
      compareCommand.visible = this.context.listView.selectedRows?.length === 2;
    }

    this.raiseOnChange();
  };
}
