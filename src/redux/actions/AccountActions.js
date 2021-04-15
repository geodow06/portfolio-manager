import accountDataService from "services/accountDataService";

export const SET_ACCOUNT_DATA = "SET_ACCOUNT_DATA";

export function setAccountData() {
    return dispatch => {
        // Get the account data from local storage or API
        let data = accountDataService.getAccountData();
        accountDataService.setSessionAccountData(data);
        dispatch({
            type: SET_ACCOUNT_DATA,
            data: data
        });
    };
}