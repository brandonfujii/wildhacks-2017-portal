import pick from 'lodash/pick';
import { push } from 'react-router-redux';
import isOk from './helpers/response-helper';
import checkTokenAsync from './helpers/token-helper';
import {
    registerUser,
    loginUser,
    verifyToken,
    resendVerification,
    resetPassword,
    sendRecoveryEmail,
} from 'api';
 
// Constants
export const REGISTRATION_REQUESTED = 'auth/REGISTRATION_REQUESTED';
export const REGISTRATION_SUCCESS = 'auth/REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'auth/REGISTRATION_FAILURE';
export const LOGIN_REQUESTED = 'auth/LOGIN_REQUESTED';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const LOGOUT = 'auth/LOGOUT';
export const VERIFYING_USER = 'auth/VERIFYING_USER';
export const VERIFICATION_SUCCESS = 'auth/VERIFICATION_SUCCESS';
export const VERIFICATION_FAILURE = 'auth/VERIFICATION_FAILURE';
export const RESENDING_VERIFICATION_EMAIL = 'auth/RESENDING_VERIFICATION_EMAIL';
export const VERIFICATION_EMAIL_SENT = 'auth/VERIFICATION_EMAIL_SENT';
export const VERIFICATION_EMAIL_FAILED = 'auth/VERIFICATION_EMAIL_FAILED';
export const SENDING_RECOVERY_EMAIL = 'auth/SENDING_RECOVERY_EMAIL';
export const RECOVERY_EMAIL_SENT = 'auth/RECOVERY_EMAIL_SENT';
export const RECOVERY_EMAIL_FAILED = 'auth/RECOVERY_EMAIL_FAILED';
export const RESETTING_PASSWORD = 'auth/RESETTING_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'auth/RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'auth/RESET_PASSWORD_FAILURE';

// State & Reducers
const initialState = {
    isLoggedIn: false,
    isRequestingAuth: false,
    user: null,
    token: null,
    success: null,
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
            const user = pick(action.user, [
                'id', 'email', 'privilege', 'type', 'isVerified', 'createdAt', 'updatedAt',
            ]);

            return {
                ...state,
                isRequestingAuth: false,
                isLoggedIn: true,
                user,
                token: action.token,
                error: null,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isRequestingAuth: false,
                isLoggedIn: false,
                user: null,
                token: null,
                error: action.error
            };
        case VERIFICATION_SUCCESS:
            return {
                ...state,
                user: state.user ? {
                    ...user,
                    isVerified: true,
                } : null,
                success: 'Nice! You\'ve successfully verified your account.',
                error: null,
            };
        case VERIFICATION_FAILURE:
            return {
                ...state,
                success: null,
                error: 'Yikes...Looks like we couldn\'t verify your account.'
            };
        case LOGOUT:
            return {
                ...state,
                isRequestingAuth: false,
                isLoggedIn: false,
                user: null,
                token: null,
                success: null,
                error: null,
            };
        default:
            return state;
    }
}

// Actions
export const register = (email, password) => {
    return async dispatch => {
        dispatch({ type: REGISTRATION_REQUESTED });

        const response = await registerUser(email, password);

        if (isOk(response)) {
            dispatch({ type: REGISTRATION_SUCCESS });
            dispatch(login(email, password));
        } else {
            dispatch({ 
                type: REGISTRATION_FAILURE,
                error: response.message,
            });
        }
    };
};

export const login = (email, password) => {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUESTED });

        const response = await loginUser(email, password);
        
        if (isOk(response)) {
            const {
                token,
                ...user
            } = response.user;

            dispatch({
                type: LOGIN_SUCCESS,
                user,
                token: token.value
            });

            dispatch(push('/'));
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                error: 'Login failed! Incorrect email or password',
            });
        }
    }
};

export const verifyUser = (verificationToken = "") => {
    return async dispatch => {
        dispatch({ type: VERIFYING_USER });

        const response = await dispatch(
            checkTokenAsync(verifyToken, verificationToken)
        );

        if (isOk(response)) {
            dispatch({ type: VERIFICATION_SUCCESS });
        } else {
            dispatch({ type: VERIFICATION_FAILURE });
        }
    }
};

export const resendVerificationEmail = () => {
    return async dispatch => {
        dispatch({ type: RESENDING_VERIFICATION_EMAIL });

        const response = await dispatch(
            checkTokenAsync(resendVerification)
        );

        if (isOk(response)) {
            dispatch({ type: VERIFICATION_EMAIL_SENT });
        } else {
            dispatch({ type: VERIFICATION_EMAIL_FAILED });
        }
    }
};

export const sendResetPasswordEmail = (email) => {
    return async dispatch => {
        dispatch({ type: SENDING_RECOVERY_EMAIL });

        const response = await sendRecoveryEmail(email);

        if (isOk(response)) {
            dispatch({ type: RECOVERY_EMAIL_SENT });
        } else {
            dispatch({ type: RECOVERY_EMAIL_FAILED });
        }
    };
};

export const resetUserPassword = (recoveryToken = "", password = "") => {
    return async dispatch => {
        dispatch({ type: RESETTING_PASSWORD });
        const response = await resetPassword(recoveryToken, password);

        if (isOk(response)) {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
            dispatch(logout());
            dispatch(push('/login'));
        } else {
            dispatch({ type: RESET_PASSWORD_FAILURE });
        }
    };
};

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT });
    }
};
