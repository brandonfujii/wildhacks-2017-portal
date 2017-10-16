import isOk from './helpers/response-helper';
import checkError from './helpers/error-helper';
import checkTokenAsync from './helpers/token-helper';
import { displayBanner } from 'modules/banner';
import { 
    getApplication, 
    updateApplication, 
    bulkJudgeApplications, 
    getAcceptedCount,
    updateRsvp
} from 'api';

export const FETCHING_APP = 'app/FETCHING_APP';
export const FETCH_APP_SUCCESS = 'app/FETCH_APP_SUCCESS';
export const FETCH_APP_FAILURE = 'app/FETCH_APP_FAILURE';
export const UPDATE_REQUESTED = 'app/UPDATE_REQUESTED';
export const UPDATE_SUCCESS = 'app/UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'app/UPDATE_FAILURE';
export const JUDGE_APP_SUCCESS = 'app/JUDGE_APP_SUCCESS';
export const JUDGE_APP_FAILURE = 'app/JUDGE_APP_FAILURE';
export const RSVP_SUCCESS = 'app/RSVP_SUCCESS';
export const RSVP_FAILURE = 'app/RSVP_FAILURE'
export const FETCH_ACCEPTED_COUNT_SUCCESS = 'app/FETCH_ACCEPTED_COUNT_SUCCESS';
export const FETCH_ACCEPTED_COUNT_FAILURE = 'app/FETCH_ACCEPTED_COUNT_FAILURE';

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
                app: action.app,
                isRequestingUpdate: false,
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                isRequestingUpdate: false,
                error: action.error,
            };
        case FETCH_ACCEPTED_COUNT_SUCCESS:
            return {
                ...state,
                acceptCount: action.count
            }
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
            checkError(dispatch, response);
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
                app: response.result.application,
            });
        } else {
            checkError(dispatch, response);

            dispatch({
                type: UPDATE_FAILURE,
                error: 'Something went wrong! Application could not be saved',
            });
        }
    }
};

export const judgeApplications = (decision, applicationIds) => {
    return async dispatch => {
        const response = await dispatch(
            checkTokenAsync(bulkJudgeApplications, decision, applicationIds)
        );

        if (isOk(response)) {
            dispatch({ type: JUDGE_APP_SUCCESS });
            dispatch(displayBanner('Successfully judged selected applications', 5000));
        } else {
            checkError(dispatch, response);

            dispatch({
                type: JUDGE_APP_FAILURE,
            });
        }
    }
};

export const rsvp = rsvpStatus => {
    return async dispatch => {
        const response = await dispatch(
            checkTokenAsync(updateRsvp, rsvpStatus)
        );

        if (isOk(response)) {
            dispatch({ type: RSVP_SUCCESS });
            dispatch(displayBanner('Thanks for RSVP\'ing!', 5000));
        } else {
            checkError(dispatch, response);
            dispatch({ type: RSVP_FAILURE });
        }
    }
};

export const getAcceptCount = () => {
    return async dispatch => {
        const response = await dispatch(
            checkTokenAsync(getAcceptedCount)
        );

        if (isOk(response)) {
            dispatch({ type: FETCH_ACCEPTED_COUNT_SUCCESS, count: response.count });
        } else {
            checkError(dispatch, response);

            dispatch({
                type: FETCH_ACCEPTED_COUNT_FAILURE,
            });
        }
    }
}