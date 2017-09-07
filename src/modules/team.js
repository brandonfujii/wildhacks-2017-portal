import { push } from 'react-router-redux';
import isOk from './helpers/response-helper';
import checkTokenAsync from './helpers/token-helper';
import { getTeamById, getTeamByName, createOrJoinTeam, leaveTeam } from 'api';

export const FETCHING_TEAM = 'team/FETCHING_TEAM';
export const FETCH_TEAM_SUCCESS = 'team/FETCH_TEAM_SUCCESS';
export const FETCH_TEAM_FAILURE = 'team/FETCH_TEAM_FAILURE';
export const JOINING_TEAM = 'team/JOINING_TEAM';
export const JOIN_SUCCESS = 'team/JOIN_SUCCESS';
export const JOIN_FAILURE = 'team/JOIN_FAILURE';
export const LEAVING_TEAM = 'team/LEAVING_TEAM';
export const LEAVE_SUCCESS = 'team/LEAVE_SUCCESS';
export const LEAVE_FAILURE = 'team/LEAVE_FAILURE';

// State & Reducers
const initialState = {
    isFetchingTeam: false,
    team: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_TEAM:
            return {
                ...state,
                isFetchingTeam: true,
            };
        case FETCH_TEAM_SUCCESS:
            return {
                ...state,
                isFetchingTeam: false,
                team: action.team,
                error: null,
            };
        case FETCH_TEAM_FAILURE:
            return {
                ...state,
                isFetchingTeam: false,
                error: action.error,
            };
        case JOIN_SUCCESS:
            return {
                ...state,
                team: action.team,
                error: null,
            };
        case JOIN_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case LEAVE_SUCCESS:
            return {
                ...state,
                team: null,
                error: null,
            };
        case LEAVE_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
}

export const fetchTeamById = (teamId) => {
    return async dispatch => {
        dispatch({ type: FETCHING_TEAM });

        const response = await dispatch(
            checkTokenAsync(getTeamById, teamId)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_TEAM_SUCCESS,
                team: response.team,
            });
        } else {
            if (response.statusCode === 401) dispatch(push('/logout'));

            dispatch({
                type: FETCH_TEAM_FAILURE,
                fetchingError: 'Unable to find the requested team',
            });
        }
    };
};

export const fetchTeamByName = (teamName) => {
    return async dispatch => {
        dispatch({ type: FETCHING_TEAM });

        const response = await dispatch(
            checkTokenAsync(getTeamByName, teamName)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_TEAM_SUCCESS,
                team: response.team,
            });
        } else {
            dispatch({
                type: FETCH_TEAM_FAILURE,
                error: 'Unable to find the requested team',
            });
        }
    };
};

export const joinTeamByName = (teamName) => {
    return async dispatch => {
        dispatch({ type: JOINING_TEAM });

        const response = await dispatch(
            checkTokenAsync(createOrJoinTeam, teamName)
        );

        if (isOk(response)) {
            dispatch({
                type: JOIN_SUCCESS,
                team: response.team,
            });
        } else {
            dispatch({
                type: JOIN_FAILURE,
                error: response.message,
            });
        }
    }
};

export const leaveTeamByName = (teamName) => {
    return async dispatch => {
        dispatch({ type: LEAVING_TEAM });

        const response = await dispatch(
            checkTokenAsync(leaveTeam, teamName)
        );

        if (isOk(response)) {
            dispatch({ type: LEAVE_SUCCESS });
        } else {
            dispatch({
                type: LEAVE_FAILURE,
                error: response.message,
            });
        }
    };
};