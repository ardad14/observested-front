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

export const getUsers = (authToken) => axios.get(`${BASE_URL}/users`, {headers: AUTH_HEADERS(authToken)});
export const getUser = (id, authToken) => axios.get(`${BASE_URL}/users/${id}`, {headers: AUTH_HEADERS(authToken)});
export const storeUser = (data, authToken) => axios.post(`${BASE_URL}/users`, data, {headers: AUTH_HEADERS(authToken)});
export const updateUser = (data, authToken) => axios.put(`${BASE_URL}/users`, data, {headers: AUTH_HEADERS(authToken)});
export const deleteUser = (id, authToken) => axios.delete(`${BASE_URL}/users/${id}`, {headers: AUTH_HEADERS(authToken)});


export const getAnnouncements = (authToken) => axios.get(`${BASE_URL}/announcements`, {headers: AUTH_HEADERS(authToken)});
export const getAnnouncement = (id, authToken) => axios.get(`${BASE_URL}/announcements/${id}`, {headers: AUTH_HEADERS(authToken)});
export const storeAnnouncement = (data, authToken) => axios.post(`${BASE_URL}/announcements`, data, {headers: AUTH_HEADERS(authToken)});
export const updateAnnouncement = (data, authToken) => axios.put(`${BASE_URL}/announcements`, data, {headers: AUTH_HEADERS(authToken)});
export const deleteAnnouncement = (id, authToken) => axios.delete(`${BASE_URL}/announcements/${id}`, {headers: AUTH_HEADERS(authToken)});

export const register = (data) => axios.post(`${BASE_URL}/register`, data,{headers: DEFAULT_HEADERS});
export const login = (data) => axios.post(`${BASE_URL}/login`, data,{headers: DEFAULT_HEADERS});
export const logout = (authToken) => axios.post(`${BASE_URL}/logout`, {},{headers: AUTH_HEADERS(authToken)});
export const getAuthUser = () => axios.get(`${BASE_URL}/authUser`, {headers: DEFAULT_HEADERS});