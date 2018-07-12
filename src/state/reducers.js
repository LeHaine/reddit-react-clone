import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import * as Action from "./action-types";

const postDefaultState = {
    posts: [],
    loading: false,
    error: null
};

const postReducer = (state = postDefaultState, action = {}) => {
    switch (action.type) {
        case Action.FETCH_POSTS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case Action.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.response.data.content
            };
        case Action.FETCH_POSTS_FAILURE:
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
    username: localStorage.getItem("username"),
    error: ""
};

const authReducer = (state = authDefaultState, action = {}) => {
    switch (action.type) {
        case Action.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                username: ""
            };
        case Action.LOGIN_SUCCESS:
            localStorage.setItem(
                "token",
                action.response.headers.authorization
            );
            localStorage.setItem("username", action.response.data.username);
            return {
                ...state,
                loading: false,
                isAuthed: true,
                username: action.response.data.username,
                error: ""
            };
        case Action.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthed: false,
                username: "",
                error: action.error
            };
        case Action.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Action.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthed: false,
                username: ""
            };

        default:
            return state;
    }
};

const signupDefault = {
    success: false,
    loading: false,
    error: null
};

const signupReducer = (state = signupDefault, action = {}) => {
    switch (action.type) {
        case Action.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Action.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            };
        case Action.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

const creaePostDefault = {
    post: null,
    success: false,
    loading: false,
    error: null
};

const createPostReducer = (state = creaePostDefault, action = {}) => {
    switch (action.type) {
        case Action.CREATE_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Action.CREATE_POST_SUCCESS:
            console.log(action);
            return {
                ...state,
                loading: false,
                success: true,
                post: action.response.data
            };
        case Action.CREATE_POST_FAILURE:
            console.log(action);
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
    post: createPostReducer,
    form: reduxFormReducer
});

export default rootReducer;
