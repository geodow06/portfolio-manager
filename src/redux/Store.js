import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer"
import thunk from "redux-thunk";

const initialState = {};

const middlewares = [thunk];

export const Store = createStore(
    RootReducer,
    initialState,
    compose(
        applyMiddleware(...middlewares)
    )
);