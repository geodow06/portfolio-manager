import cognitoService from "services/cognitoService";
import { setUserData } from "redux/actions/UserActions";
import { setAccountData } from "./AccountActions";
import authService from "services/authService";
import { push } from "connected-react-router";
import localStorageService from "services/localStorageService";
import { parseCallBackUri } from 'utils/auth/oAuthUtils';

export const CLEAR_SESSION = "CLEAR_SESSION";
export const SET_SESSION = "SET_SESSION";
export const AUTHENTICATING_SESSION = "AUTHENTICATING_SESSION";
export const INVALID_SESSION = "INVALID_SESSION";
export const SESSION_AUTHENTICATED = "SESSION_AUTHENTICATED";

export const clearSession = () => {
  return dispatch => {
    localStorageService.clearSession();

    dispatch({type: CLEAR_SESSION})
    dispatch(push({pathname: "/session/signin"}));
  }
}
  
// Initialise the Cognito sesson from a callback href
export function initSessionFromCallbackURI (callbackHref) {
  return function (dispatch) {

      const code = parseCallBackUri(callbackHref);

      return cognitoService.getToken(code)
        .then((token) => {

          // Upons successful login set user details in state and local storage
          // dispatch(setUserData(user));
          authService.loginWithTokenNew(token).then(user => {
            dispatch(setUserData(user));
          })
          
          dispatch(setAccountData());
          
          dispatch({type: SET_SESSION, token});
        })

  }
}

export const attemptOAuthAuthentication = (provider) => {
  return dispatch => {
    
    dispatch({type: AUTHENTICATING_SESSION});
    
    switch(provider){
      case "cognito":
        window.location.assign(`https://geodow.auth.eu-west-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_COGNITO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_COGNITO_CALLBACK_URL}`);
        break;
      case "google":
        // Do something
        break;

      case"facebook":
        // Do something 
        break;

      default:
        dispatch({type: INVALID_SESSION});
        break;
    }
  }
}
