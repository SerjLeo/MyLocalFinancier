import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import income from './income';
import category from './category';
import deposit from './deposit';
import expense from './expense';
import system from './system';

export default combineReducers({
    alert,
    auth,
    profile,
    income,
    category,
    expense,
    deposit,
    system
});