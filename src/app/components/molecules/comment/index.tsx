import * as React from "react";
import * as classNames from "classnames";
import {inject, observer} from "mobx-react";

import {IComment} from "../../../stores/CommentStore";
import RootStore from "../../../stores/RootStore";

interface ICommentProps {
  collapsed: false;
  comment: IComment;
  level: number;
  rootStore?: RootStore;
}

@inject("rootStore")
@observer
class Comment extends React.Component<ICommentProps> {
  public render() {
    const classes = classNames("comment", `comment-${this.props.level}`, {
      "comment--collapsed": this.props.collapsed,
    });
    const comment = this.props.comment;
    const innerHTML = {__html: comment.text};

    const kids = this.props.rootStore!.commentStore.getComments(comment.kids).map((c) => {
      return (
        <Comment
          key={c.id}
          collapsed={this.props.collapsed}
          comment={c}
          level={this.props.level + 1}
        />
      );
    });

    return (
      <React.Fragment>
      <div className={classes} style={{marginLeft: `${this.props.level}rem`}}>
        <div className="comment__meta">
          <span className="comment__author">{comment.by}</span> - 1 hour ago
        </div>
        <div className="comment__content" dangerouslySetInnerHTML={innerHTML} />
      </div>
        {kids}
      </React.Fragment>
    );
  }
}

export default Comment;
