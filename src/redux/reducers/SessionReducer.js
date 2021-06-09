import { AUTHENTICATING_SESSION, CLEAR_SESSION, INVALID_SESSION, SESSION_AUTHENTICATED, SET_SESSION } from 'redux/actions/SessionActions';
import localStorageService from 'services/localStorageService';

const initialState = {
  isLoggedIn: false,
  authenticated: false,
  authenticating: false
}

const session = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING_SESSION:
      console.log("attempting")
      return {
        ...state,
        isLoggedIn: false,
        authenticated: false,
        authenticating: true
      };

    case SET_SESSION:
      return Object.assign({},
        action.session,
        { 
          isLoggedIn: true, 
          authenticated: true,
          authenticating: false
        });

    case CLEAR_SESSION:
      return initialState;

    case SESSION_AUTHENTICATED:
      return {
        ...state.authenticated,
        isLoggedIn: true,
        authenticated: true,
        authenticating: false
      };
    // case INVALID_SESSION:
    //   return {
    //     ...state
    //   }
    default:
      return state;
  }
}

export default session