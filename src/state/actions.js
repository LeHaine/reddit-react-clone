import { CALL_API } from "../middleware/api";
import {
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    VOTE_REQUEST,
    VOTE_SUCCESS,
    VOTE_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE
} from "./action-types";

export const fetchPosts = () => {
    return {
        [CALL_API]: {
            method: "GET",
            endpoint: "post",
            types: [FETCH_POSTS_BEGIN, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE]
        }
    };
};

export const vote = (postId, dir) => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: "vote",
            data: {
                flag: dir,
                post: {
                    id: postId
                }
            },
            types: [VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE]
        }
    };
};

export const login = (username, password) => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: "login",
            data: {
                username: username,
                password: password
            },
            types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
        }
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT_REQUEST });
        localStorage.removeItem("token");
        dispatch({ type: LOGOUT_SUCCESS });
    };
};

export const signup = creds => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: "account",
            data: {
                username: creds.username,
                password: creds.password
            },
            types: [SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE]
        }
    };
};
