import createRouter, {PluginFactory, Route, Router, State} from "router5";
import browserPlugin from "router5/plugins/browser";

import rootStore from "./stores";

// Tell MobX which page we're on
export function mobxRouterPlugin(router: Router) {
  return {
    onTransitionError: (toState: State) => {
      router.cancel();
    },
    onTransitionSuccess: (toState: State) => {
      rootStore.routerStore.setCurrent(toState);
    },
  };
}
(mobxRouterPlugin as PluginFactory).pluginName = "MOBX_PLUGIN";

export enum Routes {
  Home = "home",
  Story = "story",
}

const appRoutes: Array<Route> = [
  // Logged-in routes
  {name: Routes.Home, path: "/"},
  {name: Routes.Story, path: "/story/:id"},
];

// Router setup
const appRouter = createRouter(appRoutes, {defaultRoute: Routes.Home});
appRouter.usePlugin(browserPlugin({}), mobxRouterPlugin as any);
appRouter.start();

export default appRouter;
