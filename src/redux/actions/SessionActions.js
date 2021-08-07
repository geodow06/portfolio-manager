import { push } from "connected-react-router";
import localStorageService from "services/localStorageService";

export const CLEAR_SESSION = "CLEAR_SESSION";
export const SET_SESSION = "SET_SESSION";
export const INVALID_SESSION = "INVALID_SESSION";
export const SET_SESSION_SUCCESS = "SET_SESSION_SUCCESS";

export const clearSession = () => {
  return dispatch => {
    localStorageService.clearLocalStorage();

    dispatch({type: CLEAR_SESSION})
    dispatch(push({pathname: "/session/signin"}));
  }
}

export const setReduxSession = (token) => {
  return dispatch => {
    try {
      // set token
      dispatch({type: SET_SESSION, token})
      dispatch({type: SET_SESSION_SUCCESS})
    } catch (error) {
      dispatch({type: INVALID_SESSION, error})
    }
    
  }
}

