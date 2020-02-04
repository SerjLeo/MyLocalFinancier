import {
    REGISTER_SUCCSESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_NEEDED,
    CONFIRMATION_FAILED,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

const auth = (state = initialState, action) => {
    const {type, payload} = action;

    switch(type) {
        case REGISTER_SUCCSESS:
        case CONFIRMATION_NEEDED:
        case CONFIRMATION_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAILED:
        case AUTH_ERROR:
        case LOGIN_FAILED:
        case CONFIRMATION_FAILED:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user:[]
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }
}

export default auth;