import { setUserData } from "redux/actions/UserActions";
import authService from "services/authService";
import { push } from "connected-react-router";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_LOADING = "LOGIN_LOADING";

export function loginWithUsernameAndPassword({ username, password }) {
    return dispatch => {
        dispatch({
            type: LOGIN_LOADING
        });

        try {
            let user = authService.loginWithUsernameAndPassword(username, password);
            
            dispatch(setUserData(user));

            dispatch(push({ pathname: "/"}));

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