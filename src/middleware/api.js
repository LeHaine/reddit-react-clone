import axios from "axios";

const BASE_URL = "http://localhost:8086/";

const callApi = (method, headers, data, endpoint) => {
    let token = localStorage.getItem("token") || null;
    let config = {};

    if (token) {
        config = {
            headers: { Authorization: `${token}` }
        };
    }
    if (typeof headers !== "undefined") {
        config.headers = {
            ...config.headers,
            headers
        };
    }
    config.method = method;
    if (method === "POST") {
        config.data = JSON.stringify(data);
        config.headers = {
            ...config.headers,
            "Content-Type": "application/json"
        };
    }
    config.url = BASE_URL + endpoint;
    return axios(config)
        .then(response => {
            return response;
        })
        .catch(err => console.log(err));
};

export const CALL_API = Symbol("Call API");

export default store => next => action => {
    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === "undefined") {
        return next(action);
    }

    let { method, headers, data, endpoint, types } = callAPI;

    const [requestType, successType, errorType] = types;

    store.dispatch({ type: requestType });

    return callApi(method, headers, data, endpoint).then(
        response =>
            next({
                response,
                type: successType
            }),
        error =>
            next({
                error: error.message || "There was an error.",
                type: errorType
            })
    );
};
