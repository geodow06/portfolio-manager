export const SET_USER_DATA = "SET_USER_DATA";
export const LOGOUT_USER = "LOGOUT_USER";

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
        dispatch({
            type: LOGOUT_USER
        });
    }
}