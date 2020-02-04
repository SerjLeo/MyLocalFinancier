import axios from 'axios';
import {
    REGISTER_SUCCSESS,
    REGISTER_FAILED,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE,
    CONFIRMATION_SUCCESS,
    CONFIRMATION_NEEDED,
    CONFIRMATION_FAILED,
    CLEAR_FINANCE
} from './types';
import {setAlert} from './alert';
import {getCurrentFinance} from './finance';
import setAuthToken from '../utils/setAuthToken';



//Load user 
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        console.log({err})
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Register
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password});
    try {
        const res = await axios.post('/api/auth/register', body, config);
        if(res.status === 200) {
            dispatch({
                type: REGISTER_SUCCSESS
            })
            dispatch(setAlert(res.data.message, 'success', 10000));
        }
        
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }

        if(err.response.status === 401) {
            dispatch(setAlert(err.response.data.message, 'warning', 10000));
            dispatch({
                type: CONFIRMATION_NEEDED
            })
        } else {
            dispatch({
                type: REGISTER_FAILED
            })
        }
    } 
}

//Confirm email
export const confirmEmail = id => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    
    try {
        const res = await axios.get(`/api/auth/confirm/${id}`, config)
        
        if (res.status === 404) {
            dispatch({
                type: CONFIRMATION_FAILED
            });
            dispatch(setAlert(res.data.message, 'danger'))
        }

        if (res.status === 208) {
            dispatch({
                type: CONFIRMATION_FAILED
            });
            dispatch(setAlert(res.data.message, 'warning'))
        }

        if (res.status === 202) {
            dispatch({
                type: CONFIRMATION_SUCCESS,
                payload: res.data
            });
            dispatch(getCurrentFinance())
            dispatch(setAlert('Email succesfully confirmed!', 'success'))
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: CONFIRMATION_FAILED
        })
    }
}

// Login
export const login = ({email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password});

    try {
        const res = await axios.post('/api/auth/login', body, config);

        if(res.status === 401) {
            dispatch({
                type: CONFIRMATION_NEEDED
            });
            dispatch(setAlert(res.data.message, 'warning'))
        }

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: LOGIN_FAILED
        })
    } 
}

// Logout/Clear profile

export const logout = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    dispatch({
        type: CLEAR_FINANCE
    });
    dispatch({
        type: LOGOUT
    });
}