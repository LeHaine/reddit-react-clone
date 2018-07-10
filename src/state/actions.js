import axios from "axios";
import {
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS
} from "./action-types";
const baseUrl = "http://localhost:8086";

export const fetchPostsBegin = () => ({
    type: FETCH_POSTS_BEGIN
});

export const fetchPostsSuccess = posts => ({
    type: FETCH_POSTS_SUCCESS,
    payload: { posts }
});

export const fetchPostsFailure = error => ({
    type: FETCH_POSTS_FAILURE,
    payload: { error }
});

export const fetchPosts = () => {
    return dispatch => {
        dispatch(fetchPostsBegin(true));
        axios
            .get(baseUrl + "/post")
            .then(response => {
                dispatch(fetchPostsSuccess(response.data.content));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error));
            });
    };
};

export const loginRequest = () => ({
    type: LOGIN_REQUEST
});

export const loginSuccess = token => ({
    type: LOGIN_SUCCESS,
    payload: token
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    payload: { error }
});

export const logoutRequest = () => ({
    type: LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS
});

export const login = (username, password) => {
    return dispatch => {
        dispatch(loginRequest());
        axios
            .post(baseUrl + "/login", {
                username: username,
                password: password
            })
            .then(response => {
                localStorage.setItem("token", response.headers.authorization);
                dispatch(loginSuccess(response.headers.authorization));
            })
            .catch(error => {
                dispatch(loginFailure(error));
            });
    };
};

export const logout = () => {
    return dispatch => {
        dispatch(logoutRequest());
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
    };
};
