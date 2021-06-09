import authService from "services/authService";

export const SET_USER_DATA = "SET_USER_DATA";
export const REMOVE_USER_DATA = "REMOVE_USER_DATE";

export function setUserData(user) {
    return dispatch => {
        authService.setUser(user)
        dispatch({
            type: SET_USER_DATA,
            data: user
        });
    };
}
