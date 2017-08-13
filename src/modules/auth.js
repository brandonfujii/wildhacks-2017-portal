import {
    registerUser,
    loginUser,
} from 'api';
 
// Constants
export const REGISTRATION_REQUESTED = 'auth/REGISTRATION_REQUESTED';
export const REGISTRATION_SUCCESS = 'auth/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'auth/REGISTRATION_FAILURE';
export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

// Error messages
const DEFAULT_ERROR_MESSAGE = 'Oops, Something went wrong! Try again later.'

// State & Reducers
const initialState = {
    loggedIn: false,
    isRequestingAuth: false,
    user: null,
    token: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION_REQUESTED:
            return {
                ...state,
                isRequestingAuth: true,
                error: null,
            };
        case REGISTRATION_SUCCESS:
            return {
                ...state,
                isRequestingAuth: false,
            };
        case REGISTRATION_FAILURE:
            return {
                ...state,
                isRequestingAuth: false,
                error: action.error
            };
        case LOGIN_REQUESTED: 
            return {
                ...state,
                isRequestingAuth: true,
                error: null,
            };
        case LOGIN_SUCCESS: 
            return {
                ...state,
                isRequestingAuth: false,
                isLoggedIn: true,
                user: action.user,
                token: action.token,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isRequestingAuth: false,
                isLoggedIn: false,
                user: null,
                token: null,
            };
        default:
            return state;
    }
}

// Actions
export const register = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: REGISTRATION_REQUESTED });

        try {
            const response = await registerUser(email, password);
            if (response && response.success) {
                dispatch({ type: REGISTRATION_SUCCESS });
                dispatch(login(email, password));
            } else {
                dispatch({ 
                    type: REGISTRATION_FAILURE,
                    error: response.message,
                });
            }

        } catch(err) {
            dispatch({ 
                type: REGISTRATION_FAILURE,
                error: DEFAULT_ERROR_MESSAGE,
            });
        }
    };
}

export const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_REQUESTED });

        try {
            const response = await loginUser(email, password);

            if (response && response.user && response.user.token) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    user: response.user,
                    token: response.user.token
                });
            } else {
                dispatch({ type: LOGIN_FAILURE });
            }

        } catch(err) {
            dispatch({ type: LOGIN_FAILURE });
        }
    }
};
