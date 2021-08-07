import { getToken } from "services/cognitoService";
import { setUser, removeUser } from "redux/actions/UserActions";
import { setAccountData } from "./AccountActions";
import authService from "services/authService";
import { parseCallBackUri } from "utils";
import { clearSession, setReduxSession } from "redux/actions/SessionActions";

export const AUTHENTICATING = "AUTHENTICATION_LOADING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const LOGOUT = "LOGOUT";
  
// Initialise the OAuth sesson from a callback href
export function initAuthFromCallbackURI (callbackHref) {
  return async dispatch => {
    let code;
    try {
      code = parseCallBackUri(callbackHref);
    } catch(error) {
      console.log(error);
      return dispatch({
        type: AUTHENTICATION_ERROR,
        payload: error
      });
    }
    
    return getToken(code)
      .then((token) => {
        
        authService.loginWithCognitoSession(token, "cognito").then(user => {
          dispatch(setUser(user));
        })
        
        dispatch(setAccountData());

        dispatch({
          type: AUTHENTICATION_SUCCESS
        });

        dispatch(setReduxSession(token));
      });
  };
}

export const attemptOAuthAuthentication = (provider) => {
  return dispatch => {
    dispatch({type: AUTHENTICATING});
    
    switch(provider){
      case "cognito":
        window.location.assign(process.env.REACT_APP_COGNITO_AUTHORIZE);
        break;
      case "google":
        // Do something
        break;
      case"facebook":
        // Do something 
        break;

      default:
        return dispatch({
          type: AUTHENTICATION_ERROR,
          payload: "Invalid OAuth provider"
        });
    }
  };
}

export function loginWithUsernameAndPassword({ username, password }) {
  return dispatch => {
      dispatch({
          type: AUTHENTICATING
      });

      try {

        authService.loginWithUsernameAndPassword(username, password);
          
      } catch(error) {
          return dispatch({
            type: AUTHENTICATION_ERROR,
            payload: error
          });
      }
  };
}

export function logout() {
    return dispatch => {
        dispatch(clearSession());
        dispatch(removeUser());
        dispatch({type: LOGOUT});
    };
}
