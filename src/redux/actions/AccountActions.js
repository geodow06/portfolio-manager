import accountDataService from "services/accountDataService";

export const SET_ACCOUNT_DATA = "SET_ACCOUNT_DATA";

export async function setAccountData() {
    let data = await accountDataService.getAccountData();
    return dispatch => {
        dispatch({
            type: SET_ACCOUNT_DATA,
            data: data
        });
    };
}