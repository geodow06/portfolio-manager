import { 
  CLEAR_SESSION, 
  INVALID_SESSION, 
  SET_SESSION,
  SET_SESSION_SUCCESS
} from 'redux/actions/SessionActions';

const initialState = {
  token: null,
  success: false,
  loading: false,
  error: null
}

const session = ( state = initialState, action = {} ) => {
  switch (action.type) {
  
    case SET_SESSION:
      return {
        ...initialState,
        token: action.data,
        loading: true
      }

    case CLEAR_SESSION:
      return initialState;

    case INVALID_SESSION:
      // Do something?
      return {
        ...initialState,
        error: action.data
      }
      
    case SET_SESSION_SUCCESS:
      return {
        ...state,
        success: true
      }
    
    default:
      return state;
  }
}

export default session