import axios from "axios";

const BASE_URL = 'http://0.0.0.0/api';

const DEFAULT_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}

const AUTH_HEADERS = (authToken) =>  {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        "Authorization": `Bearer ${authToken}`
    }
}

export const getGeneralAnalytics = (authToken, placeId) => axios.get(`${BASE_URL}/analytics/general/${placeId}`, {headers: AUTH_HEADERS(authToken)});
export const getProductAnalytics = (authToken, placeId) => axios.get(`${BASE_URL}/analytics/products/${placeId}`, {headers: AUTH_HEADERS(authToken)});

export const getUsersForPlace = (authToken) => axios.get(`${BASE_URL}/users/place`, {headers: AUTH_HEADERS(authToken)});
export const getCustomersForPlace = (authToken) => axios.get(`${BASE_URL}/customers/place`, {headers: AUTH_HEADERS(authToken)});
export const getPlacesForUser = (authToken) => axios.get(`${BASE_URL}/place/places`, {headers: AUTH_HEADERS(authToken)});
export const getFirstPlaceForUser = (authToken) => axios.get(`${BASE_URL}/place/first`, {headers: AUTH_HEADERS(authToken)});
export const getPlaceById = (authToken, placeId) => axios.get(`${BASE_URL}/place/show/${placeId}`, {headers: AUTH_HEADERS(authToken)});

export const createPlace = (authToken, data) => axios.post(`${BASE_URL}/place`, data,{headers: AUTH_HEADERS(authToken)});
export const updatePlace = (authToken, data, id) => axios.put(`${BASE_URL}/place/${id}`, data,{headers: AUTH_HEADERS(authToken)});
export const deletePlace = (authToken, id) => axios.delete(`${BASE_URL}/place/${id}`, {headers: AUTH_HEADERS(authToken)});

export const register = (data) => axios.post(`${BASE_URL}/register`, data,{headers: DEFAULT_HEADERS});
export const login = (data) => axios.post(`${BASE_URL}/login`, data,{headers: DEFAULT_HEADERS});
export const logout = (authToken) => axios.post(`${BASE_URL}/logout`, {},{headers: AUTH_HEADERS(authToken)});
export const getAuthUser = () => axios.get(`${BASE_URL}/authUser`, {headers: DEFAULT_HEADERS});