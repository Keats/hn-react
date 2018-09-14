import {Store} from "./utils";
import {action, observable} from "mobx";

import {getItem, getTopStories} from "../api";

interface IStory {
  id: number;
  score: number;
  title: string;
  url: string;
  // Ask HN/Job have a text
  text: string | null;
  // username of the author
  by: string;
  // creation date (timestamp)
  time: number;
  // direct descendant comments
  kids: Array<number>;
  // Number of comments
  descendants: number;
}

export default class StoryStore extends Store {
  @observable public stories = observable.map<number, IStory>({});
  @observable public topStories: Array<number> = [];

  public async fetchStory(id: number) {
    const story = await getItem<IStory>(id);
    action("Fetching story", () => {
      this.stories.set(id, story);
    });
  }

  // Fetch all the data required to display the list of top stories:
  // first the stories id and then fetch each of them
  // HN display 30 stories per page, we'll do the same
  public async fetchTopStories() {
    const topStories = await getTopStories();
    action("Fetching top stories", () => {
      this.topStories = topStories;
    });
    // the api returns up to 500 ids, no need to be worried about out of bounds
    for (let i = 0; i < 30; i++) {
      this.fetchStory(topStories[i]);
    }
  }
}
