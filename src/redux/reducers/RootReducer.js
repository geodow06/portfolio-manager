import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import AccountReducer from "./AccountReducer";
import PriceReducer from "./PriceReducer";
import SessionReducer from "./SessionReducer";

const rootReducer = history => combineReducers({
    login: LoginReducer,
    user: UserReducer,
    layout: LayoutReducer,
    account: AccountReducer,
    price: PriceReducer,
    session: SessionReducer,
    router: connectRouter(history),
    
});

export default rootReducer;