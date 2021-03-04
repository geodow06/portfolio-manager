import "./App.css";
import { Router, Switch } from "react-router-dom";
import history from "history.js";
import { Provider } from "react-redux"
import { Store } from "./redux/Store";
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
      <Provider store={Store}>
        <Auth>
          {/* BrowserRouter ignoreshistory prop */}
          <Router history={history}>
            <AuthGuard>
              <Switch>
                <PortfolioLayout/>
              </Switch>
            </AuthGuard>
          </Router>
        </Auth>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
