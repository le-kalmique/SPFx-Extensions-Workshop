declare interface IProductsCommandsCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'ProductsCommandsCommandSetStrings' {
  const strings: IProductsCommandsCommandSetStrings;
  export = strings;
}
