import * as React from "react";
import * as classNames from "classnames";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";

import {IComment} from "../../../stores/CommentStore";
import RootStore from "../../../stores/RootStore";
import {timeAgo} from "../../../utils";

const MAX_NESTING_LEVEL = 9;

interface ICommentProps {
  collapsed: boolean;
  comment: IComment;
  level: number;
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
class Comment extends React.Component<ICommentProps> {
  @observable private childrenToggled = false;

  public render() {
    const classes = classNames("comment", `comment-${this.props.level}`, {
      "comment--collapsed": this.props.collapsed,
    });
    const comment = this.props.comment;
    const innerHTML = {__html: comment.text};
    const level = Math.min(this.props.level, MAX_NESTING_LEVEL);

    const kids = this.props.rootStore!.commentStore.getComments(comment.kids).map((c) => {
      return (
        <Comment
          key={c.id}
          collapsed={this.props.collapsed || this.childrenToggled}
          comment={c}
          level={level + 1}
        />
      );
    });

    return (
      <React.Fragment>
        <div className={classes} style={{marginLeft: `${level}rem`}}>
          <div className="comment__meta">
            <span className="comment__author">{comment.by}</span> - {timeAgo(comment.time)}
          </div>
          <div className="comment__content" dangerouslySetInnerHTML={innerHTML}/>
          {this.renderChildrenToggle(comment)}
        </div>
        {kids}
      </React.Fragment>
    );
  }

  private renderChildrenToggle(comment: IComment) {
    if (!comment.kids) {
      return null;
    }

    const numComments = comment.kids.length;
    return (
      <div className="comment__collapse" onClick={this.toggleChildrenVisibility}>
        {this.childrenToggled ? "Expand" : "Collapse"} {numComments} comment{numComments === 1 ? "" : "s"}
      </div>
    );
  }

  @action.bound
  private toggleChildrenVisibility = () => {
    this.childrenToggled = !this.childrenToggled;
  }
}

export default Comment;
