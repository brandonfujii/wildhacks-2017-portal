import { push } from 'react-router-redux';
import isOk from './helpers/response-helper';
import checkTokenAsync from './helpers/token-helper';
import { getApplication, updateApplication } from 'api';

export const FETCHING_APP = 'app/FETCHING_APP';
export const FETCH_APP_SUCCESS = 'app/FETCH_APP_SUCCESS';
export const FETCH_APP_FAILURE = 'app/FETCH_APP_FAILURE';
export const UPDATE_REQUESTED = 'app/UPDATE_REQUESTED';
export const UPDATE_SUCCESS = 'app/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'app/UPDATE_FAILURE';

// State & Reducers
const initialState = {
    isRequestingUpdate: false,
    app: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_APP_SUCCESS:
            return {
                ...state,
                app: action.app,
            };
        case FETCH_APP_FAILURE:
            return {
                ...state,
                app: null
            };
        case UPDATE_REQUESTED:
            return {
                ...state,
                isRequestingUpdate: true,
                error: null,
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                isRequestingUpdate: false,
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                isRequestingUpdate: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export const getApp = () => {
    return async dispatch => {
        dispatch({ type: FETCHING_APP });

        const response = await dispatch(
            checkTokenAsync(getApplication)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_APP_SUCCESS,
                app: response.application,
            });
        } else {
            dispatch({
                type: FETCH_APP_FAILURE
            });
        }

    }
};

export const updateApp = (fields = {}) => {
    return async dispatch => {
        dispatch({ type: UPDATE_REQUESTED });

        const response = await dispatch(
            checkTokenAsync(updateApplication, fields)
        );

        if (isOk(response)) {
            dispatch({
                type: UPDATE_SUCCESS,
                app: response.application,
            });

        } else {
            if (response.statusCode === 401) dispatch(push('/logout'));

            dispatch({
                type: UPDATE_FAILURE,
                error: 'Something went wrong! Application could not be saved',
            });
        }
    }
};