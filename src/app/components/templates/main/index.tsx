import * as React from "react";

import Link from "../../atoms/link";
import { Routes } from "../../../routes";

class Main extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="main-ui">
        <div className="main-ui__container">
          <header><b><Link to={Routes.Home}>HackerNews</Link></b></header>

          <div className="main-ui__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
