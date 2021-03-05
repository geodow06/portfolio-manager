import "./App.css";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "history.js";
import { Provider, ReactReduxContext } from "react-redux"
import configureStore from "./redux/Store";
import routes from "RootRoutes";
import AppContext from "appContext";
import PortfolioLayout from "PortfolioLayout/PortfolioLayout";
import AuthGuard from "auth/AuthGuard";
import Auth from "auth/Auth";


const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      {/* Nesting components in Provider makes the store 
      available to any component wrapped in a connect() function) */}
      <Provider store={configureStore(history)} context={ReactReduxContext}>
        <Auth>
          <ConnectedRouter history={history} context={ReactReduxContext}>
            <AuthGuard>
              <Switch>
                <PortfolioLayout/>
              </Switch>
            </AuthGuard>
          </ConnectedRouter>
        </Auth>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
