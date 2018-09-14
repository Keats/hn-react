import RouterStore from "./RouterStore";
import StoryStore from "./StoryStore";
import CommentStore from "./CommentStore";

export default class RootStore {
  public routerStore: RouterStore;
  public storyStore: StoryStore;
  public commentStore: CommentStore;

  constructor() {
    this.routerStore = new RouterStore({rootStore: this});
    this.storyStore = new StoryStore({rootStore: this});
    this.commentStore = new CommentStore({rootStore: this});
  }
}
