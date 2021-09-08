import { FETCH_PRODUCTS_SUCCESS, SET_PRODUCT_ID, SET_CATEGORY_ID, SET_PAGE_NUMBER } from "../actions/productActions";
import {setLocalData, getLocalData} from '../../util/helper'

const initState = {
    products: [],
    productid: getLocalData('productId'),
    categoryid: getLocalData('categoryId'),
    page: getLocalData('pageNumber'),
};

const productReducer = (state = initState, action) => {
    if (action.type === FETCH_PRODUCTS_SUCCESS) {
        return {
            ...state,
            products: action.payload,
        };
    }
    if (action.type === SET_PRODUCT_ID) {
        setLocalData('productId', action.payload)
        return {
            ...state,
            productid: action.payload,
        };
    }
    if (action.type === SET_CATEGORY_ID) {
        setLocalData('categoryId', action.payload)
        return {
            ...state,
            categoryid: action.payload,
        };
    }
    if (action.type === SET_PAGE_NUMBER) {
        setLocalData('pageNumber', action.payload)
        return {
            ...state,
            page: action.payload,
        };
    }
    return state;
};

export default productReducer;
