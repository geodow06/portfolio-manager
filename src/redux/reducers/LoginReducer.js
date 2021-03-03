import { LOGIN_SUCCESS } from "redux/actions/LoginActions";

const initialState = {
    success: false,
}

const LoginReducer = function(state = initialState, action) {
    if(action.type === LOGIN_SUCCESS) {
        return {
            success: true
        };
    }
    return state;
}

export default LoginReducer;