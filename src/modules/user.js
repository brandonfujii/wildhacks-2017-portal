import {
    getUsers
} from 'api';

// Constants
export const FETCHING_USERS = 'user/FETCHING_USERS';
export const FETCH_USERS_SUCCESS = 'user/FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'user/FETCH_USERS_FAILURE'

// State & Reducers
const initialState = {
    fetchingUsers: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_USERS:
            return {
                fetchingUsers: true,
            };
        case FETCH_USERS_SUCCESS:
            return {
                fetchingUsers: false,
                page: action.page,
                instances: action.users,

            };
        case FETCH_USERS_FAILURE:
            return {
                fetchingUsers: false,
                page: -1,
                instances: [],
            }
        default:
            return state;
    }
}

// Actions
export const getUserPage = (token, pageNumber = 1, limit = 10) => {
    return async (dispatch) => {
        dispatch({ type: FETCHING_USERS });

        const response = await getUsers(token, pageNumber, limit);

        if (response && response.users && response.page) {
            dispatch({
                type: FETCH_USERS_SUCCESS,
                page: response.page,
                pageSize: response.pageSize,
                totalPages: response.totalPages,
                totalUsers: response.totalUsers,
                users: response.users,
            });
        } else {
            dispatch({
                type: FETCH_USERS_FAILURE,
            });
        }
    }
};
