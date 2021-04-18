const SET_PRICES = "SET_PRICES";
const SET_PRICES_LOADING = "SET_PRICES_LOADING";
const SET_PRICES_SUCCESS = "SET_PRICES_SUCCESS";
const SET_PRICES_ERROR = "SET_PRICES_ERROR";

export const setPrices = () => {
    return dispatch => {

        dispatch({
            type: SET_PRICES_LOADING
        });

        try {

            // Return from prices service
            const prices = {}

            dispatch({
                type: SET_PRICES,
                payload: prices
            });

            dispatch({
                type: SET_PRICES_SUCCESS,
            })
        } catch(error) {

            console.log(error);
            return dispatch({
                type: SET_PRICES_ERROR,
                payload: error
            });
        }
    }
};

