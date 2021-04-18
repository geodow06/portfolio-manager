import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import AccountReducer from "./AccountReducer";
import PriceReducer from "./PriceReducer";

const rootReducer = history => combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    account: AccountReducer,
    price: PriceReducer,
    router: connectRouter(history)
});

export default rootReducer;