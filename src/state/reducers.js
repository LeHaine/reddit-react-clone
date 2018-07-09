import { combineReducers } from "redux";
import {
    FETCH_POSTS_BEGIN,
    FETCH_POSTS_SUCCESS,
    FETCH_POSTS_FAILURE
} from "./action-types";

const defaultState = {
    posts: [],
    loading: false,
    error: null
};

const postReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case FETCH_POSTS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                posts: []
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({ posts: postReducer });

export default rootReducer;
