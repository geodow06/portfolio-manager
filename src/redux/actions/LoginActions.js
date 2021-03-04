import history from "history.js";
import { setUserData } from "redux/actions/UserActions";
import authService from "services/authService";

export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginWithUsernameAndPassword({ username, password }) {
    return dispatch => {
        dispatch({
            type: LOGIN_LOADING
        });

        // TODO add AuthService to return authenticatedUser
        // Currently set current token to pass Authentication correct 
        try {
            let user = authService.loginWithUsernameAndPassword(username, password);
            
            dispatch(setUserData(user));
            
            history.push({
                pathname: "/"
            });

            return dispatch({
                type: LOGIN_SUCCESS
            });
        } catch(error) {
            console.log(error)
            return dispatch({
                type: LOGIN_ERROR,
                payload: error
            });
        }
    };
}