import { combineReducers } from "redux";
import count from "./count";

const RootReducer = combineReducers({
    count: count
})

export default RootReducer;