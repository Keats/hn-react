import * as React from "react";
import {inject, observer} from "mobx-react";

import StoryItem from "../../molecules/story-item";
import Comment from "../../molecules/comment";
import Main from "../../templates/main";
import RootStore from "../../../stores/RootStore";

interface IStoryProps {
  id: number;
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
class Story extends React.Component<IStoryProps> {
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

    if (!story) {
      return "Loading";
    }
    const comments = commentStore.getComments(story.kids).map((c) => {
      return (
        <Comment key={c.id} collapsed={false} comment={c} level={0} />
      );
    });

    return (
      <React.Fragment>
        <StoryItem inList={false} story={story}/>
        <hr/>
        <div className="story__comments">
          {comments}
        </div>
      </React.Fragment>
    );
  }
}

export default Story;
