import axios from "axios";
import {
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from "./action-types";
const baseUrl = "http://localhost:8086/";

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
            .get(baseUrl + "post")
            .then(response => {
                dispatch(fetchPostsSuccess(response.data.content));
            })
            .catch(error => {
                dispatch(fetchPostsFailure(error));
            });
    };
};
