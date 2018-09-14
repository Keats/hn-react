import * as React from "react";
import * as classNames from "classnames";

import {Params} from "router5";
import router, { Routes } from "../../../routes";

export interface ILinkProps {
  to: Routes;
  params?: Params;
  className?: string;
  options?: {reload: boolean, refresh: boolean};
}

// A component to link inside the app
class Link extends React.Component<ILinkProps, {}> {
  protected static defaultProps = {
    options: {},
    params: {},
  };

  public render() {
    const { to, params } = this.props;

    const href = router.buildPath(to, params as any);
    if (href === null) {
      // tslint:disable-next-line
      console.error("<Link> Couldn't make URL for", to, params);
    }

    const classes = classNames("link", this.props.className);
    return (
      <a className={classes} href={href} onClick={this.onClick}>
        {this.props.children}
      </a>
    );
  }

  private onClick = (event: React.MouseEvent<{}>) => {
    event.preventDefault();
    event.stopPropagation();
    const {to, params, options} = this.props;
    // TS errors without the `|| {}` despite the defaultProps
    router.navigate(to, params || {}, options || {});
  }
}

export default Link;
