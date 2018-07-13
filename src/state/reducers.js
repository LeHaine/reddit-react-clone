import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import * as Action from "./action-types";

const fetchDataDefaultState = {
    data: null,
    loading: false,
    error: null
};

const fetchDataReducer = (state = fetchDataDefaultState, action = {}) => {
    switch (action.type) {
        case Action.FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Action.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.response.data
            };
        case Action.FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                data: null
            };
        default:
            return state;
    }
};

const doPostDefaultState = {
    data: null,
    success: false,
    loading: false,
    error: null
};

const doPostReducer = (state = doPostDefaultState, action = {}) => {
    switch (action.type) {
        case Action.DO_POST_REQUEST:
            return {
                ...state,
                loading: true
            };
        case Action.DO_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.response.data
            };
        case Action.DO_POST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
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

const rootReducer = combineReducers({
    fetch: fetchDataReducer,
    post: doPostReducer,
    auth: authReducer,
    form: reduxFormReducer
});

export default rootReducer;
