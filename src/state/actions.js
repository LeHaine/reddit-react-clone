import { CALL_API } from "../middleware/api";
import * as Action from "./action-types";

export const fetchData = endpoint => {
    return {
        [CALL_API]: {
            method: "GET",
            endpoint: endpoint,
            types: [
                Action.FETCH_DATA_REQUEST,
                Action.FETCH_DATA_SUCCESS,
                Action.FETCH_DATA_FAILURE
            ]
        }
    };
};

export const doPost = (endpoint, data) => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: endpoint,
            data: data,
            types: [
                Action.DO_POST_REQUEST,
                Action.DO_POST_SUCCESS,
                Action.DO_POST_FAILURE
            ]
        }
    };
};

export const fetchPost = id => {
    return fetchData("post/" + id);
};

export const fetchPosts = () => {
    return fetchData("post");
};

export const signup = creds => {
    return doPost("account", {
        username: creds.username,
        password: creds.password
    });
};

export const vote = (postId, dir) => {
    return doPost("vote", {
        flag: dir,
        post: {
            id: postId
        }
    });
};

export const createPost = data => {
    return doPost("post", data);
};

export const createSub = data => {
    return doPost("sub", data);
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
