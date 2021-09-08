export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const SET_PRODUCT_ID = "SET_PRODUCT_ID";
export const SET_CATEGORY_ID = "SET_CATEGORY_ID";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";

// fetch products
export const fetchProducts = (products) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: products,
        });
    };
};
export const setProductID = (productID) => {
    return (dispatch) => {
        dispatch({
            type: SET_PRODUCT_ID,
            payload: productID,
        });
    };
};
export const setCategoryID = (categoryID) => {
    return (dispatch) => {
        dispatch({
            type: SET_CATEGORY_ID,
            payload: categoryID,
        });
    };
};
export const setPageNumber = (page) => {
    return (dispatch) => {
        dispatch({
            type: SET_PAGE_NUMBER,
            payload: page,
        });
    };
};
