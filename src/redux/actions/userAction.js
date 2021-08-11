import WebService from "../../util/webService";
import constant from "../../util/constant";
import Geocode from "react-geocode";
// import { changeLanguage } from 'redux-multilanguage';
export const SET_USER = "SET_USER";
export const SET_COUNTRY = "SET_COUNTRY";
export const SET_GENDER = "SET_GENDER";
export const SET_STATE = "SET_STATE";
export const SET_SHIP_STATE = "SET_SHIP_STATE";
export const GET_CURRENT_ADDRESS = "GET_CURRENT_ADDRESS";
Geocode.setApiKey(process.env.REACT_APP_APP_MAP_API_KEY);
Geocode.setLanguage("en");
export const setUser = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SET_USER,
            payload: data,
        });
    };
};

export const getGender = (gender) => {
    return async (dispatch) => {
        try {
            let action = constant.ACTION.USER + constant.ACTION.GENDER + "?type=" + gender;
            let response = await WebService.get(action);
            dispatch({
                type: SET_GENDER,
                payload: response,
            });
        } catch (error) {}
    };
};

export const getCountry = (lang) => {
    return async (dispatch) => {
        try {
            let action = constant.ACTION.USER + constant.ACTION.COUNTRY + "?lang=" + lang;
            let response = await WebService.get(action);
            dispatch({
                type: SET_COUNTRY,
                payload: response,
            });
        } catch (error) {}
    };
};

export const getState = (code) => {
    return async (dispatch) => {
        try {
            let action = constant.ACTION.USER + constant.ACTION.ZONES + "?code=" + code;
            let response = await WebService.get(action);
            dispatch({
                type: SET_STATE,
                payload: response,
            });
        } catch (error) {}
    };
};

export const getCurrentLocation = () => {
    return async (dispatch) => {
        const location = window.navigator && window.navigator.geolocation;
        // console.log(location, 'getCurrentLocation')
        if (location) {
            location.getCurrentPosition(
                (position) => {
                    // console.log(position)
                    dispatch(getCurrentAddress(position.coords.latitude, position.coords.longitude));
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    };
};
export const getCurrentAddress = (lat, long) => {
    return async (dispatch) => {
        Geocode.fromLatLng(lat, long).then(
            (response) => {
                // const address = response.results[0].formatted_address;
                // console.log(response);
                dispatch({
                    type: GET_CURRENT_ADDRESS,
                    payload: response.results,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    };
};
