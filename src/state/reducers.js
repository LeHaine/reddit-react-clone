import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import * as Action from "./action-types";
import * as Reducer from "./reducer-types";

const fetchDataDefaultState = {
    data: null,
    loading: false,
    error: null
};

const createFetchDataReducer = (name = "") => {
    return (state = fetchDataDefaultState, action = {}) => {
        switch (action.type) {
            case Action.FETCH_DATA_REQUEST + "_" + name:
                return {
                    ...state,
                    loading: true
                };
            case Action.FETCH_DATA_SUCCESS + "_" + name:
                return {
                    ...state,
                    loading: false,
                    data: action.response.data
                };
            case Action.FETCH_DATA_FAILURE + "_" + name:
                return {
                    ...state,
                    loading: false,
                    data: null
                };
            default:
                return state;
        }
    };
};

const fetchDataPaginatedDefaultState = {
    data: [],
    loading: false,
    error: null,
    pagesFetched: [],
    page: 0,
    lastPage: 0
};
const createFetchPaginatedDataReducer = (name = "") => {
    return (state = fetchDataPaginatedDefaultState, action = {}) => {
        switch (action.type) {
            case Action.FETCH_DATA_REQUEST + "_" + name:
                return {
                    ...state,
                    loading: true
                };
            case Action.FETCH_DATA_SUCCESS + "_" + name:
                return {
                    ...state,
                    loading: false,
                    data: [...state.data, ...action.response.data.content],
                    pagesFetched: [
                        ...state.pagesFetched,
                        action.response.data.pageable.pageNumber
                    ],
                    page: action.response.data.pageable.pageNumber,
                    lastPage: action.response.data.totalPages
                };
            case Action.FETCH_DATA_FAILURE + "_" + name:
                return {
                    ...state,
                    loading: false,
                    data: []
                };
            default:
                return state;
        }
    };
};

const doPostDefaultState = {
    data: null,
    success: false,
    loading: false,
    error: null
};

const createDoPostReducer = (name = "") => {
    return (state = doPostDefaultState, action = {}) => {
        switch (action.type) {
            case Action.DO_POST_REQUEST + "_" + name:
                return {
                    ...state,
                    loading: true
                };
            case Action.DO_POST_SUCCESS + "_" + name:
                return {
                    ...state,
                    loading: false,
                    success: true,
                    data: action.response.data
                };
            case Action.DO_POST_FAILURE + "_" + name:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
            default:
                return state;
        }
    };
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

const fetch = combineReducers({
    posts: createFetchPaginatedDataReducer(Reducer.POSTS),
    post: createFetchDataReducer(Reducer.POST)
});

const post = combineReducers({
    post: createDoPostReducer(Reducer.POST),
    vote: createDoPostReducer(Reducer.VOTE),
    signup: createDoPostReducer(Reducer.SIGNUP),
    sub: createDoPostReducer(Reducer.SUB)
});
const rootReducer = combineReducers({
    fetch: fetch,
    post: post,
    auth: authReducer,
    form: reduxFormReducer
});

export default rootReducer;
