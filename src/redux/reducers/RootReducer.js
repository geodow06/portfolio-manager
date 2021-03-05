import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import countReducer from "./countReducer";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";

const rootReducer = history => combineReducers({
    count: countReducer,
    login: LoginReducer,
    user: UserReducer,
    router: connectRouter(history)
});

export default rootReducer;