import * as React from "react";
import * as ReactDOM from "react-dom";
import { configure } from "mobx";
import { inject, observer, Provider as MobxProvider } from "mobx-react";

import rootStore from "./stores";
import RootStore from "./stores/RootStore";
import { Routes } from "./routes";
import StoriesList from "./components/pages/stories-list";
import Story from "./components/pages/story";

// MobX strict mode
configure({
  enforceActions: "observed",
});
// To hook Sass in webpack
import "../style/app.scss";

@inject("rootStore")
@observer
class App extends React.Component<{rootStore?: RootStore}, {}> {
  public render() {
    const currentRoute = this.props.rootStore!.routerStore.current;
    if (!currentRoute) {
      return null;
    }

    let component = null;
    switch (currentRoute.name as Routes) {
      case Routes.Home:
        component = <StoriesList />;
        break;
      case Routes.Story:
        component = <Story id={currentRoute.params.id} />;
        break;
      default:
        throw new Error("unknown route: " + currentRoute);
    }

    return (
      <React.Fragment>
        {component}
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <MobxProvider rootStore={rootStore}>
    <App/>
  </MobxProvider>,
  document.getElementById("app"),
);
