import * as React from "react";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";

import StoryItem from "../../molecules/story-item";
import Comment from "../../molecules/comment";
import Input from "../../atoms/input";
import Spinner from "../../atoms/spinner";
import Main from "../../templates/main";
import RootStore from "../../../stores/RootStore";
import {IStory} from "../../../stores/StoryStore";

interface IStoryProps {
  id: number;
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
class Story extends React.Component<IStoryProps> {
  @observable private location: string = "";
  @observable private position: string = "";

  public componentWillMount() {
    const rootStore = this.props.rootStore!;
    // we are going to miss new top-level comments that way, we should
    // use some kind of cache instead and evict stories from the store
    // if they are somehow recent but it has been X minutes since the last fetch
    const story = rootStore.storyStore.stories.get(this.props.id);
    if (!story) {
      rootStore.storyStore.fetchStory(this.props.id)
        .then((s) => rootStore.commentStore.fetchComments(s.kids));
    } else {
      rootStore.commentStore.fetchComments(story.kids);
    }
  }

  public render() {
    return (
      <Main>
        <div className="story">
          {this.renderBody()}
        </div>
      </Main>
    );
  }

  private renderBody() {
    const storyStore = this.props.rootStore!.storyStore;
    const commentStore = this.props.rootStore!.commentStore;
    const story = storyStore.stories.get(this.props.id);

    // Ideally we would wait for all comments to be loaded but there are bugs in the API
    // so we can't really do that (like with item id 16285482 which returns null on the API
    // but a real comment on the site)
    if (!story) {
      return <Spinner/>;
    }

    const comments = commentStore.getComments(story.kids)
      .filter((c) => {
        if (this.location === "") {
          return true;
        }
        return c.text.search(new RegExp(this.location, "i")) > -1;
      })
      .filter((c) => {
        if (this.position === "") {
          return true;
        }
        return c.text.search(new RegExp(this.position, "i")) > -1;
      })
      .map((c) => {
        return (
          <Comment key={c.id} collapsed={false} comment={c} level={0}/>
        );
      });

    return (
      <React.Fragment>
        <StoryItem inList={false} story={story}/>
        <hr/>
        {this.renderSearch(story)}
        <div className="story__comments">
          {comments}
        </div>
      </React.Fragment>
    );
  }

  private renderSearch(story: IStory) {
    if (story.title.indexOf("Ask HN: Who is hiring?") === -1) {
      return null;
    }

    return (
      <div className="story__whos-hiring">
        <Input label="Position" name="position" onChange={this.updatePosition}/>
        <Input label="Location" name="location" onChange={this.updateLocation}/>
        <hr/>
      </div>
    );
  }

  @action
  private updateLocation = (e: React.KeyboardEvent<any>) => {
    this.location = (e.target as any).value;
  }

  @action
  private updatePosition = (e: React.KeyboardEvent<any>) => {
    this.position = (e.target as any).value;
  }
}

export default Story;
