import { 
    SET_PRICES,
    SET_PRICES_LOADING,
    SET_PRICES_SUCCESS,
    SET_PRICES_ERROR 
} from "redux/actions/PriceActions";

const initialState = {
    loading: false,
    success: false,
    error: {},
    prices: {}
};

const PriceReducer = ( state = initialState, action = {} ) => {
    
    switch (action.type) {
        case SET_PRICES_LOADING: {
            return {
                ...state,
                loading: true
            };
        } case SET_PRICES: {
            return {
                ...state,
                prices: action.payload
            };
        } case SET_PRICES_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true
            };
        } case SET_PRICES_ERROR: {
            return {
                ...state,
                success: false,
                loading: false,
                error: action.payload
            };
        } default: {
            return state;
        }
    }
};

export default PriceReducer;