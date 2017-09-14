import isOk from './helpers/response-helper';
import checkTokenAsync from './helpers/token-helper';
import { getTalks, getTalkById } from 'api';

export const FETCHING_TALKS = 'talk/FETCHING_TALKS';
export const FETCH_TALKS_SUCCESS = 'talk/FETCH_TALKS_SUCCESS';
export const FETCH_TALKS_FAILURE = 'talk/FETCH_TALKS_FAILURE';
export const FETCHING_TALK = 'talk/FETCHING_TALK';
export const FETCH_TALK_SUCCESS = 'talk/FETCH_TALKS_SUCCESS';
export const FETCH_TALK_FAILURE = 'talk/FETCH_TALKS_FAILURE';

// State & Reducers
const initialState = {
    isFetchingTalks: false,
    talks: [],
    talk: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_TALKS:
            return {
                ...state,
                isFetchingTalks: true,
            };
        case FETCH_TALKS_SUCCESS:
            return {
                ...state,
                isFetchingTalks: false,
                talks: action.talks,
                talk: null,
                error: null,
            };
        case FETCH_TALKS_FAILURE:
            return {
                ...state,
                isFetchingTalks: false,
                error: action.error,
            };
        case FETCHING_TALK:
            return {
                ...state,
                isFetchingTalks: true,
            };
        case FETCH_TALK_SUCCESS:
            return {
                ...state,
                isFetchingTalks: false,
                talk: action.talk,
                error: null,
            };
        case FETCH_TALK_FAILURE:
            return {
                ...state,
                isFetchingTalks: false,
                error: action.error,
            };
        default:
            return state;
    }
}

export const fetchTalks = (pageNumber, limit) => {
    return async dispatch => {
        dispatch({ type: FETCHING_TALKS });

        const response = await dispatch(
            checkTokenAsync(getTalks, pageNumber, limit)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_TALKS_SUCCESS,
                talks: response.talks,
            });
        } else {
            dispatch({
                type: FETCH_TALKS_FAILURE,
                fetchingError: 'Unable to fetch the requested talks',
            });
        }
    };
};

export const fetchTalkById = id => {
    return async dispatch => {
        dispatch({ type: FETCHING_TALK });

        const response = await dispatch(
            checkTokenAsync(getTalkById, id)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_TALK_SUCCESS,
                talk: response.talk,
            });
        } else {
            dispatch({
                type: FETCH_TALK_FAILURE,
                fetchingError: 'Unable to fetch the requested talk',
            });
        }
    };
};
