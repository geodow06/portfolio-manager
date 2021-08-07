import "styles/_app.scss";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "history.js";
import { Provider, ReactReduxContext } from "react-redux"
import configureStore from "./redux/store";
import routes from "rootRoutes";
import AppContext from "appContext";
import PortfolioLayout from "portfolioLayout/PortfolioLayout";
import AuthGuard from "auth/AuthGuard";
import Theme from "portfolioLayout/Theme/Theme";
import Auth from "auth/Auth";


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      {/* Nesting components in Provider makes the store 
      available to any component wrapped in a connect() function) */}
      <Provider store={configureStore(history)} context={ReactReduxContext}>
        {/* Theme component to pass style and setting to children */}
        <Theme>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            {/* Auth component ensures a valid session */}
            <Auth>
              {/* AuthGuard checks current user is authorized to access route */}
              <AuthGuard>
                <Switch>
                  <PortfolioLayout/>
                </Switch>
              </AuthGuard>
            </Auth>
          </ConnectedRouter>
        </Theme>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
