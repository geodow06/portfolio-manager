import cognitoService from "services/cognitoService";
import { setUser, removeUser } from "redux/actions/UserActions";
import { setAccountData } from "./AccountActions";
import authService from "services/authService";
import { parseCallBackUri } from "utils/auth/oAuthUtils";
import { clearSession, setReduxSession } from "redux/actions/SessionActions";

export const AUTHENTICATING = "AUTHENTICATION_LOADING";
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR";
export const LOGOUT = "LOGOUT";
  
// Initialise the OAuth sesson from a callback href
export function initAuthFromCallbackURI (callbackHref) {
  return function (dispatch) {

      const code = parseCallBackUri(callbackHref);

      return cognitoService.getToken(code)
        .then((token) => {
         
          authService.loginWithCognitoSession(token, "cognito").then(user => {
            dispatch(setUser(user));
          })
          
          dispatch(setAccountData());

          dispatch({type: AUTHENTICATION_SUCCESS})
          dispatch(setReduxSession(token))
        })

  }
}

export const attemptOAuthAuthentication = (provider) => {
  return dispatch => {
    
    dispatch({type: AUTHENTICATING});
    
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
        dispatch({type: AUTHENTICATION_ERROR});
        break;
    }
  }
}

export function loginWithUsernameAndPassword({ username, password }) {
  return dispatch => {
      dispatch({
          type: AUTHENTICATING
      });

      try {

        authService.loginWithUsernameAndPassword(username, password);
          
      } catch(error) {
          console.log(error);
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
