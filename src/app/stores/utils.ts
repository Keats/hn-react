// Base class for all the stores, will set up the rootStore everywhere
// In this file to avoid circular dependencies
import RootStore from "./RootStore";

export class Store {
  protected rootStore: RootStore;

  constructor(data: any) {
    this.rootStore = data.rootStore;
  }
}
