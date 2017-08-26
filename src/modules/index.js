import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import user from './user';
import application from './application';
import checkTokenAsync from './token-helper';

export default combineReducers({
    router: routerReducer,
    auth,
    user,
    application,
    checkTokenAsync,
});