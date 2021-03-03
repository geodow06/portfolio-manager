import history from "history.js";
import { setUserData } from "redux/actions/UserActions";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function loginWithUsernameAndPassword() {
    return dispatch => {
        
        // TODO add AuthService to return authenticatedUser
        let authenticatedUser = {username:"JohnDoe06", token:"dummy"}

        dispatch(setUserData(authenticatedUser));

        history.push({ pathname:"/" });

        dispatch({
            type: LOGIN_SUCCESS
        });
    }
}