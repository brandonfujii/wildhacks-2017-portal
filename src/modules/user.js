import isOk from './helpers/response-helper';
import checkError from './helpers/error-helper';
import checkTokenAsync from './helpers/token-helper';
import { getUsers, getUserData } from 'api';

// Constants
export const FETCHING_USERS = 'user/FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'user/FETCH_USERS_FAILURE'
export const FETCHING_USERS_ADMIN = 'user/FETCHING_USERS_ADMIN';
export const FETCH_USERS_ADMIN_SUCCESS = 'user/FETCH_USERS_ADMIN_SUCCESS';
export const FETCH_USERS_ADMIN_FAILURE = 'user/FETCH_USERS_ADMIN_FAILURE'

// State & Reducers
const initialState = {
    fetchingUsers: false,
    fetchingUsersAdmin: false,
    users: [],
    page: -1,
    totalPages: -1,
    totalUsers: -1,
    pageSize: 10,
    pageNumber: -1,
    rows: [],
    pageCount: -1,
    rowCount: -1,
    size: 10,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USERS:
            return {
                fetchingUsers: true,
            };
        case FETCHING_USERS_ADMIN:
            return {
                fetchingUsersAdmin: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                fetchingUsers: false,
                page: action.page,
                users: action.users,
                totalPages: action.totalPages,
                totalUsers: action.totalUsers,
                pageSize: action.pageSize,
            };
        case FETCH_USERS_FAILURE:
            return {
                fetchingUsers: false,
                users: [],
                page: -1,
                totalPages: -1,
                totalUsers: -1,
                pageSize: 10,
            };
        case FETCH_USERS_ADMIN_SUCCESS:
            return {
                fetchingUsersAdmin: false,
                pageNumber: action.pageNumber,
                rows: action.rows,
                pageCount: action.pageCount,
                rowCount: action.rowCount,
                size: action.size,
            };
        case FETCH_USERS_ADMIN_FAILURE:
            return {
                fetchingUsersAdmin: false,
                pageNumber: -1,
                rows: [],
                pageCount: -1,
                rowCount: -1,
                size: 10,
            };
        default:
            return state;
    }
}

// Actions
export const getUserPage = (token, pageNumber = 1, limit = 10) => {
    return async (dispatch) => {
        dispatch({ type: FETCHING_USERS });

        const response = await dispatch(
            checkTokenAsync(getUsers, pageNumber, limit)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                page: response.page,
                pageSize: response.pageSize,
                totalPages: response.totalPages,
                totalUsers: response.totalUsers,
                users: response.users,
            });
        } else {
            checkError(dispatch, response);
            dispatch({
                type: FETCH_USERS_FAILURE,
            });
        }
    }
};

export const getUserDataPage = (pageNumber = 1, limit = 10) => {
    return async dispatch => {
        dispatch({ type: FETCHING_USERS_ADMIN });
        
        const response = await dispatch(
            checkTokenAsync(getUserData, pageNumber, limit)
        );

        if (isOk(response)) {
            dispatch({
                type: FETCH_USERS_ADMIN_SUCCESS,
                pageNumber: response.page,
                size: response.pageSize,
                pageCount: response.totalPages,
                rowCount: response.totalUsers,
                rows: response.users,
            });
        } else {
            checkError(dispatch, response);
            dispatch({
                type: FETCH_USERS_ADMIN_FAILURE,
            });
        }
    };
};