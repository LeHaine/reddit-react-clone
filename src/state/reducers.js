import { combineReducers } from "redux";
import {
    FETCH_THREADS_BEGIN,
    FETCH_THREADS_SUCCESS,
    FETCH_THREADS_FAILURE
} from "./action-types";

const defaultState = {
    threads: [],
    loading: false,
    error: null
};

const threadReducer = (state = defaultState, action = {}) => {
    switch (action.type) {
        case FETCH_THREADS_BEGIN:
            return {
                ...state,
                loading: true
            };
        case FETCH_THREADS_SUCCESS:
            return {
                ...state,
                loading: false,
                threads: action.payload.threads
            };
        case FETCH_THREADS_FAILURE:
            return {
                ...state,
                loading: false,
                threads: []
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({ threads: threadReducer });

export default rootReducer;
