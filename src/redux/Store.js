import { createStore } from "redux";
import RootReducer from "./reducers/RootReducer"

const initialState = {};


export const Store = createStore(
    RootReducer,
    initialState
    );