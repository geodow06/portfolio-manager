import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/RootReducer"
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";

const initialState = {};

const configureStore = history => {

    const middlewares = [
        thunk,
        routerMiddleware(history)
    
    ];

    return createStore(
        rootReducer(history),
        initialState,
        compose(
            applyMiddleware(...middlewares)
        )
    )
}

export default configureStore;