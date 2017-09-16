import isOk from './helpers/response-helper';
import checkTokenAsync from './helpers/token-helper';
import { getTalks, getTalkById, createTalk, upvoteTalkById, downvoteTalkById } from 'api';

export const FETCHING_TALKS = 'talk/FETCHING_TALKS';
export const FETCH_TALKS_SUCCESS = 'talk/FETCH_TALKS_SUCCESS';
export const FETCH_TALKS_FAILURE = 'talk/FETCH_TALKS_FAILURE';
export const FETCHING_TALK = 'talk/FETCHING_TALK';
export const FETCH_TALK_SUCCESS = 'talk/FETCH_TALKS_SUCCESS';
export const FETCH_TALK_FAILURE = 'talk/FETCH_TALKS_FAILURE';
export const SUBMITTING_TALK = 'talk/SUBMITTING_TALK';
export const SUBMIT_TALK_SUCCESS = 'talk/SUBMIT_TALK_SUCCESS';
export const SUBMIT_TALK_FAILURE = 'talk/SUBMIT_TALK_FAILURE';
export const UPVOTING_TALK = 'talk/UPVOTING_TALK';
export const UPVOTE_SUCCESS = 'talk/UPVOTE_SUCCESS';
export const UPVOTE_FAILURE = 'talk/UPVOTE_FAILURE';
export const DOWNVOTING_TALK = 'talk/DOWNVOTING_TALK';
export const DOWNVOTE_SUCCESS = 'talk/DOWNVOTE_SUCCESS';
export const DOWNVOTE_FAILURE = 'talk/DOWNVOTE_FAILURE';
export const REHYDRATING_TALKS = 'talk/REHYDRATING_TALKS';

// State & Reducers
const initialState = {
    isFetchingTalks: false,
    count: 0,
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
                count: action.count,
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
        case REHYDRATING_TALKS:
            return {
                ...state,
                talks: [],
            };
        default:
            return state;
    }
}

export const fetchTalks = (pageNumber, limit, order) => {
    return async dispatch => {
        dispatch({ type: FETCHING_TALKS });

        const response = await dispatch(
            checkTokenAsync(getTalks, pageNumber, limit, order)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_TALKS_SUCCESS,
                count: response.count,
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

export const submitTalk = options => {
    return async dispatch => {
        dispatch({ type: SUBMITTING_TALK });

        const response = await dispatch(
            checkTokenAsync(createTalk, options)
        );

        if (isOk(response)) {
            dispatch({
                type: SUBMIT_TALK_SUCCESS,
                talk: response.talk,
            });
        } else {
            dispatch({
                type: SUBMIT_TALK_FAILURE,
                error: response.message,
            });
        }
    };
};

export const upvoteTalk = id => {
    return async dispatch => {
        dispatch({ type: UPVOTING_TALK });

        const response = await dispatch(
            checkTokenAsync(upvoteTalkById, id)
        );
        
        if (isOk(response)) {
            dispatch({ type: UPVOTE_SUCCESS });
        } else {
            dispatch({
                type: UPVOTE_FAILURE,
                error: response.message,
            });
        }
    };
};

export const downvoteTalk = id => {
    return async dispatch => {
        dispatch({ type: DOWNVOTING_TALK });

        const response = await dispatch(
            checkTokenAsync(downvoteTalkById, id)
        );

        if (isOk(response)) {
            dispatch({ type: DOWNVOTE_SUCCESS });
        } else {
            dispatch({
                type: DOWNVOTE_FAILURE,
                error: response.message,
            });
        }
    };
};

export const rehydrateTalks = (pageNumber, limit, order) => {
    return async dispatch => {
        dispatch({ type: REHYDRATING_TALKS });
        dispatch(fetchTalks(pageNumber, limit, order));
    }
};