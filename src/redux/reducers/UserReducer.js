import { SET_USER, REMOVE_USER } from "redux/actions/UserActions";

const initialState = {};

const userReducer = function( state = initialState, action = {} ) {
    if (action.type === SET_USER) {
        return {
            ...state,
            ...action.data
        };
    }

    if(action.type === REMOVE_USER) {
        return initialState;
    }
    
    return state;
}

export default userReducer;