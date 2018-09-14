import * as React from "react";
import {inject, observer} from "mobx-react";
import DevTools from "mobx-react-devtools";

import Main from "../../templates/main";
import StoryItem from "../../molecules/story-item";
import RootStore from "../../../stores/RootStore";

@inject("rootStore")
@observer
class StoriesList extends React.Component<{rootStore?: RootStore}> {
  public componentWillMount() {
    this.props.rootStore!.storyStore.fetchTopStories();
  }

  public render() {
    return (
      <Main>
        {this.renderBody()}
        <DevTools />
      </Main>
    );
  }

  private renderBody() {
    const storyStore = this.props.rootStore!.storyStore;

    if (!storyStore.isPageLoaded()) {
      return "Loading";
    }

    const stories = this.props.rootStore!.storyStore.stories;

    return (
      <ol>{storyStore.topStories.slice(0, 30).map((t, i) => {
        return <StoryItem key={t} story={stories.get(t)!}/>;
      })}</ol>
    );
  }
}

export default StoriesList;
