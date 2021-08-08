import { 
    AUTHENTICATING, 
    AUTHENTICATION_ERROR,
    AUTHENTICATION_SUCCESS,
    LOGOUT
  } from 'redux/actions/AuthActions';
  
  const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    authenticationFailed: false
  }
  
  const session = ( state = initialState, action = {} ) => {
    switch (action.type) {
      case AUTHENTICATING:
        return {
          ...state,
          isAuthenticated: false,
          loading: true
        };
  
      case AUTHENTICATION_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          loading:false
        }
      
    case LOGOUT:
        return {
            ...initialState,
            isAuthenticated: false,
            loading: false
        }

      case AUTHENTICATION_ERROR:
        return {
          ...initialState,
          error: action.payload,
          authenticationFailed: true,
          loading: false
        };
  
      default:
        return state;
    }
  }
  
  export default session