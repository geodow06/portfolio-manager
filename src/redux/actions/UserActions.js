import localStorageService from "services/localStorageService";

export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

export function setUser(user) {
    return dispatch => {
        localStorageService.setItem("authenticated_user", user);
        dispatch({
            type: SET_USER,
            data: user
        });
    };
}

export function removeUser() {
    return dispatch => {
        dispatch({
            type: REMOVE_USER
        });
    };
}
