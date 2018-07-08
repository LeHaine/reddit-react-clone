import axios from "axios";
import {
    FETCH_THREADS_BEGIN,
    FETCH_THREADS_SUCCESS,
    FETCH_THREADS_FAILURE
} from "./action-types";
const baseUrl = "http://localhost:8086/";

export const fetchThreadsBegin = () => ({
    type: FETCH_THREADS_BEGIN
});

export const fetchThreadsSuccess = threads => ({
    type: FETCH_THREADS_SUCCESS,
    payload: { threads }
});

export const fetchThreadsFailure = error => ({
    type: FETCH_THREADS_FAILURE,
    payload: { error }
});

export const fetchThreads = () => {
    return dispatch => {
        dispatch(fetchThreadsBegin(true));
        axios
            .get(baseUrl + "threads")
            .then(response => {
                console.log(response.data.content);
                dispatch(fetchThreadsSuccess(response.data.content));
            })
            .catch(error => {
                dispatch(fetchThreadsFailure(error));
            });
    };
};
