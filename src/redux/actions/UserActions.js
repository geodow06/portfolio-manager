import authService from "services/authService";
import { push } from "connected-react-router";

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

        dispatch(push({pathname: "/session/signin"}));

        dispatch({
            type: LOGOUT_USER
        });
    }
}