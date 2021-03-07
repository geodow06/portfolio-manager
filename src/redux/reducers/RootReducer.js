import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import countReducer from "./countReducer";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";

const rootReducer = history => combineReducers({
    count: countReducer,
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    router: connectRouter(history)
});

export default rootReducer;