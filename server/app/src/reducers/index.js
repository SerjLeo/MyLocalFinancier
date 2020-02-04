import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import finance from './finance';

export default combineReducers({
    alert,
    auth,
    profile,
    finance
});