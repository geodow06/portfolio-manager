import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import AccountReducer from "./AccountReducer";
import PriceReducer from "./PriceReducer";
import SessionReducer from "./SessionReducer";
import AuthReducer from "./AuthReducer";

const rootReducer = history => combineReducers({
    user: UserReducer,
    layout: LayoutReducer,
    account: AccountReducer,
    price: PriceReducer,
    session: SessionReducer,
    auth: AuthReducer,
    router: connectRouter(history),
    
});

export default rootReducer;