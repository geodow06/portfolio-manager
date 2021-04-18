export const SET_PRICES = "SET_PRICES";
export const SET_PRICES_LOADING = "SET_PRICES_LOADING";
export const SET_PRICES_SUCCESS = "SET_PRICES_SUCCESS";
export const SET_PRICES_ERROR = "SET_PRICES_ERROR";

export const setPrices = (prices = {}) => {
    return dispatch => {
        dispatch({
            type: SET_PRICES_LOADING
        });

        try {
            dispatch({
                type: SET_PRICES,
                payload: prices
            });

            dispatch({
                type: SET_PRICES_SUCCESS
            });
        } catch(error) {

            console.log(error);
            return dispatch({
                type: SET_PRICES_ERROR,
                payload: error
            });
        }
    };
};

