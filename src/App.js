import "./App.css";
import { Router } from "react-router-dom";
import history from "history.js";
import { Provider } from "react-redux"
import { Store } from "./redux/Store";
import routes from "RootRoutes";
import AppContext from "appContext";
import PortfolioLayout from "PortfolioLayout/PortfolioLayout";

const App = () => {
  return (
    <AppContext.Provider value={{ routes }}>
      {/* Nesting components in Provider makes the store 
      available to any component wrapped in a connect() function) */}
      <Provider store={Store}>
        <Router history={history}>
            <PortfolioLayout/>
        </Router>
      </Provider>
    </AppContext.Provider>
  );
};

export default App;
