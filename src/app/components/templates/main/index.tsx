import * as React from "react";

class Main extends React.PureComponent<{}> {
  public render() {
    return (
      <div className="main-ui">
        <div className="main-ui__container">
          <header><b>HackerNews</b></header>

          <div className="main-ui__content">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
