import { SET_USER_DATA, LOGOUT_USER } from "redux/actions/UserActions";

const initialState = {};

const userReducer = function(state = initialState, action) {
    if (action.type === SET_USER_DATA) {
        return {
            ...state,
            ...action.data
        };
    }
    
    if (action.type === LOGOUT_USER) {
        return {
            ...state
        };
    }

    return state;
}

export default userReducer;