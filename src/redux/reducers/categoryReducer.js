import { FETCH_CATEGOTIES_SUCCESS } from "../actions/categoryActions";

const initState = {
    categories: [],
};

const categoryReducer = (state = initState, action) => {
    if (action.type === FETCH_CATEGOTIES_SUCCESS) {
        return {
            ...state,
            categories: action.payload,
        };
    }
    return state;
};

export default categoryReducer;
