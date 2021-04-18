import { SET_ACCOUNT_DATA } from "redux/actions/AccountActions";

const initialState = {};

const AccountReducer = (state = initialState, action) => {
    
    if (action.type === SET_ACCOUNT_DATA) {
        return {
            ...state,
            ...action.data
        };
    }

    return state;
}

export default AccountReducer;