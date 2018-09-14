import RouterStore from "./RouterStore";

export default class RootStore {
  public routerStore: RouterStore;

  constructor() {
    this.routerStore = new RouterStore({rootStore: this});
  }
}
