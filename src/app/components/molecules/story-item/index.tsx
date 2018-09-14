import * as React from "react";

import {IStory} from "../../../stores/StoryStore";
import Link from "../../atoms/link";
import { Routes } from "../../../routes";

interface IStoriesListProps {
  story: IStory;
  inList: boolean;
}

class StoryItem extends React.Component<IStoriesListProps> {
  public render() {
    const story = this.props.story;
    const hostname = this.getHostname(story);
    const Tag = this.props.inList ? "li" : "div";

    return (
      <Tag className="story-item">
        <div className="story-item__title">
          {this.getStoryLink(story)}
          {hostname ? <span className="story-item__hostname">({hostname})</span> : null}
        </div>
        <div className="story-item__meta">
          {story.score} points by <b>{story.by}</b> 36min ago |
          <Link to={Routes.Story} params={{id: story.id}} className="story-item__comment-link">
            {story.descendants} comments
          </Link>
        </div>
      </Tag>
    );
  }

  private getStoryLink(story: IStory) {
    if (story.url) {
      return <a href={story.url} className="link">{story.title}</a>;
    }
    // Ask HN, Jobs etc
    return <Link to={Routes.Story} params={{id: story.id}}>{story.title}</Link>;
  }

  private getHostname(story: IStory): string | null {
    if (!story.url) {
      return null;
    }
    const a  = document.createElement("a");
    a.href = story.url;
    return a.hostname;
  }
}

export default StoryItem;
