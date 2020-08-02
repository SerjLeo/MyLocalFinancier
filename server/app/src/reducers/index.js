import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import income from './income';
import category from './category';
import system from './system';
import transaction from './transaction';

export default combineReducers({
    alert,
    auth,
    income,
    category,
    system,
    transaction
});
