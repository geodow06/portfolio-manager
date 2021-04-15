import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import AccountReducer from "./AccountReducer";

const rootReducer = history => combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    account: AccountReducer,
    router: connectRouter(history)
});

export default rootReducer;