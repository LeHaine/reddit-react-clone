import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
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

const postDefaultState = {
    posts: [],
    loading: false,
    error: null
};

const postReducer = (state = postDefaultState, action = {}) => {
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
                posts: action.response.data.content
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

const authDefaultState = {
    isAuthed: localStorage.getItem("token") ? true : false,
    loading: false,
    error: ""
};

const authReducer = (state = authDefaultState, action = {}) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            localStorage.setItem(
                "token",
                action.response.headers.authorization
            );
            return {
                ...state,
                loading: false,
                isAuthed: true,
                error: ""
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthed: false,
                error: action.error
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthed: false
            };

        default:
            return state;
    }
};

const signupDefault = {
    loading: false,
    error: null
};

const signupReducer = (state = signupDefault, action = {}) => {
    switch (action.type) {
        case FETCH_POSTS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case FETCH_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    posts: postReducer,
    auth: authReducer,
    signup: signupReducer,
    form: reduxFormReducer
});

export default rootReducer;
