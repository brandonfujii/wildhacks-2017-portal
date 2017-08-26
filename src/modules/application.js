import checkTokenAsync from './token-helper';
import { updateApplication } from 'api';

export const UPDATE_REQUESTED = 'app/UPDATE_REQUESTED';
export const UPDATE_SUCCESS = 'app/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'app/UPDATE_FAILURE';

// State & Reducers
const initialState = {
    isRequestingUpdate: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
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

export const updateApp = (fields = {}) => {
    return async dispatch => {
        dispatch({ type: UPDATE_REQUESTED });

        const response = await dispatch(
            checkTokenAsync(updateApplication, fields)
        );

        if (response.application) {
            dispatch({
                type: UPDATE_SUCCESS,
                app: response.application,
            });

        } else {
            dispatch({
                type: UPDATE_FAILURE,
                error: 'Something went wrong! Application could not be saved',
            });
        }
    }
};
