import {action, observable} from "mobx";
import {State} from "router5";
import {Store} from "./utils";

export default class RouterStore extends Store {
  @observable public current: State | null = null;

  @action
  public setCurrent(state: State) {
    this.current = state;
  }
}
