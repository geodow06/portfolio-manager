import { combineReducers } from "redux";
import count from "./count";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";

const RootReducer = combineReducers({
    count: count,
    login: LoginReducer,
    user: UserReducer
});

export default RootReducer;