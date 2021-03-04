import { SET_USER_DATA, LOGOUT_USER, REMOVE_USER_DATA } from "redux/actions/UserActions";

const initialState = {username: "UnauthenticatedUser", token: "dummy"};

const userReducer = function(state = initialState, action) {
    if (action.type === SET_USER_DATA) {
        return {
            ...state,
            ...action.data
        };
    }

    if(action.type === REMOVE_USER_DATA) {
        return {
          ...state
        };
    }
    
    if (action.type === LOGOUT_USER) {
        return {
            state
        };
    }

    return state;
}

export default userReducer;