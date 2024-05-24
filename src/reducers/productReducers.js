// reducer takes in the current state and an action of what we want to do with the state

import products from "../products";
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from "../constants/productConstants";
// have different reducer to update lists of components
export const productListReducer = (state = { products: [] },action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true,products: [] }; // update the object

        case PRODUCT_LIST_SUCCESS:
            return { loading: false,products: action.payload };

        case PRODUCT_LIST_FAIL:
            return { loading: false,error: action.payload };

        default:
            return state;
    }
};

export const productDetailsReducer = (state = { products: { reviews: [] } },action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true,...state }; // update the object

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false,product: action.payload };

        case PRODUCT_DETAILS_FAIL:
            return { loading: false,error: action.payload };

        default:
            return state;
    }
};