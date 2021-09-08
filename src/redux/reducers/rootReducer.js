import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";
import storeReducer from "./storeReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import contentReducer from "./contentReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import { getLocalData } from "../../util/helper";

const rootReducer = combineReducers({
    multilanguage: createMultilanguageReducer({ currentLanguageCode: getLocalData('currentLanguageCode') ? getLocalData('currentLanguageCode') : "es" }),
    // currencyData: currencyReducer,
    productData: productReducer,
    categoryData: categoryReducer,
    merchantData: storeReducer,
    cartData: cartReducer,
    loading: loaderReducer,
    userData: userReducer,
    content: contentReducer,
});

export default rootReducer;
