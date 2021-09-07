import WebService from "../../util/webService";
import constant from "../../util/constant";

export const FETCH_CATEGOTIES_SUCCESS = "FETCH_CATEGOTIES_SUCCESS";

// fetch products
export const fetchCategories = (defaultStore, currentLanguageCode) => {
    return async dispatch => {
        let action =
            constant.ACTION.CATEGORY + constant.ACTION.CATEGORYHIERARCHYLIST + "?count=20&page=0&store=" + defaultStore + "&lang=" + currentLanguageCode;
        try {
            let response = await WebService.get(action);
            dispatch({
                type: FETCH_CATEGOTIES_SUCCESS,
                payload: response
            });
        } catch (error) {
        }
    };
};
