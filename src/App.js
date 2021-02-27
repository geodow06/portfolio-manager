import "./App.css";
import { Router, Route } from "react-router";
import Home from "components/Home.js"
import history from "history.js";
import { Provider } from "react-redux"
import { Store } from "./redux/Store"; 
function App() {

  return (
    // Nesting components in Provider makes the store 
    // available to any component wrapped in a connect() function
    <Provider store={Store}>
      <div className="App">
        <Router history={history}>
          <Route exactpath="/" component={Home}/>
          <Route path="/home" component={Home}/>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
