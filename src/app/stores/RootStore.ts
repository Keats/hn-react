import RouterStore from "./RouterStore";
import StoryStore from "./StoryStore";

export default class RootStore {
  public routerStore: RouterStore;
  public storyStore: StoryStore;

  constructor() {
    this.routerStore = new RouterStore({rootStore: this});
    this.storyStore = new StoryStore({rootStore: this});
  }
}
