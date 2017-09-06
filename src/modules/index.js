import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import user from './user';
import application from './application';
import team from './team';
import checkTokenAsync from './helpers/token-helper';

export default combineReducers({
    router: routerReducer,
    auth,
    user,
    application,
    team,
    checkTokenAsync,
});