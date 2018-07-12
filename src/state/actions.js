import { CALL_API } from "../middleware/api";
import * as Action from "./action-types";

export const fetchPosts = () => {
    return {
        [CALL_API]: {
            method: "GET",
            endpoint: "post",
            types: [
                Action.FETCH_POSTS_BEGIN,
                Action.FETCH_POSTS_SUCCESS,
                Action.FETCH_POSTS_FAILURE
            ]
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
            types: [
                Action.VOTE_REQUEST,
                Action.VOTE_SUCCESS,
                Action.VOTE_FAILURE
            ]
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
            types: [
                Action.LOGIN_REQUEST,
                Action.LOGIN_SUCCESS,
                Action.LOGIN_FAILURE
            ]
        }
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({ type: Action.LOGOUT_REQUEST });
        localStorage.removeItem("token");
        dispatch({ type: Action.LOGOUT_SUCCESS });
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
            types: [
                Action.SIGNUP_REQUEST,
                Action.SIGNUP_SUCCESS,
                Action.SIGNUP_FAILURE
            ]
        }
    };
};

export const createPost = data => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: "post",
            data: data,
            types: [
                Action.CREATE_POST_REQUEST,
                Action.CREATE_POST_SUCCESS,
                Action.CREATE_POST_FAILURE
            ]
        }
    };
};
