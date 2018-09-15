import {Store} from "./utils";
import {observable, runInAction} from "mobx";

import {getItem} from "../api";

export interface IComment {
  id: number;
  text: string;
  // username of the author
  by: string;
  // creation date (timestamp)
  time: number;
  // direct descendant comments
  kids: Array<number> | undefined;
  parent: number;
}

export default class CommentStore extends Store {
  @observable public comments = observable.map<number, IComment>({});

  // Fetch a comment and all its kids recursively
  public async fetchComment(id: number) {
    const comment = await getItem<IComment>(id);
    runInAction("Fetching Comment", () => {
      this.comments.set(id, comment);
    });

    if (comment.kids && comment.kids.length > 0) {
      this.fetchComments(comment.kids);
    }
  }

  public async fetchComments(ids: Array<number>) {
    for (const id of ids) {
      this.fetchComment(id);
    }
  }

  public getComments(ids: Array<number> | undefined): Array<IComment> {
    if (ids === undefined) {
      return [];
    }

    return ids
      .map((id) => this.comments.get(id)!)  // not really, but to please TS
      .filter((n) => n && n.text)  // don't display deleted/removed messages
      .sort((a, b) => b.time - a.time);
  }
}
