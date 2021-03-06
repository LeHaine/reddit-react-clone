import { CALL_API } from "../middleware/api";
import * as Action from "./action-types";
import * as Reducer from "./reducer-types";

export const fetchData = (endpoint, name = "") => {
    return {
        [CALL_API]: {
            method: "GET",
            endpoint: endpoint,
            types: [
                Action.FETCH_DATA_REQUEST + "_" + name,
                Action.FETCH_DATA_SUCCESS + "_" + name,
                Action.FETCH_DATA_FAILURE + "_" + name
            ]
        }
    };
};

export const doPost = (endpoint, data, name = "") => {
    return {
        [CALL_API]: {
            method: "POST",
            endpoint: endpoint,
            data: data,
            types: [
                Action.DO_POST_REQUEST + "_" + name,
                Action.DO_POST_SUCCESS + "_" + name,
                Action.DO_POST_FAILURE + "_" + name
            ]
        }
    };
};

export const fetchPost = id => {
    return fetchData("post/" + id, Reducer.POST);
};

export const fetchPosts = (page = 0) => {
    return fetchData("post?page=" + page, Reducer.POSTS);
};

export const fetchComments = (postId, page = 0) => {
    return fetchData(
        "post/comments/toplevel/" + postId + "?page=" + page,
        Reducer.COMMENTS
    );
};

export const signup = creds => {
    return doPost(
        "account",
        {
            username: creds.username,
            password: creds.password
        },
        Reducer.SIGNUP
    );
};

export const postVote = (postId, dir) => {
    return doPost(
        "vote/post",
        {
            flag: dir,
            post: {
                id: postId
            }
        },
        Reducer.VOTE
    );
};

export const commentVote = (commentId, dir) => {
    return doPost(
        "vote/comment",
        {
            flag: dir,
            comment: {
                id: commentId
            }
        },
        Reducer.VOTE
    );
};

export const comment = (id, text, type) => {
    let name;
    if (type === "post") {
        name = "post";
    } else if (type === "comment") {
        name = "parent";
    }
    return doPost(
        "comment?type=" + type,
        {
            text: text,
            [name]: {
                id: id
            }
        },
        Reducer.COMMENT
    );
};

export const createPost = data => {
    return doPost("post", data, Reducer.POST);
};

export const createSub = data => {
    return doPost("sub", data, Reducer.SUB);
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
