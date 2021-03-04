import authService from "services/authService";
import history from "history.js";

export const SET_USER_DATA = "SET_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";
export const REMOVE_USER_DATA = "REMOVE_USER_DATE";

export function setUserData(user) {
    return dispatch => {
        dispatch({
            type: SET_USER_DATA,
            data: user
        });
    }
}

export function logoutUser() {
    return dispatch => {
        authService.logout();

        history.push({
            pathname: "/session/signin"
        });

        dispatch({
            type: LOGOUT_USER
        });
    }
}