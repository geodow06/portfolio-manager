import { SET_USER_DATA, REMOVE_USER_DATA } from "redux/actions/UserActions";

const initialState = {};

const userReducer = function( state = initialState, action = {} ) {
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
    
    return state;
}

export default userReducer;