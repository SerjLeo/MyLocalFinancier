import axios from 'axios';
import {
   GET_PROFILE,
   PROFILE_ERROR,
   SET_LANGUAGE
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from '.';

//Load current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
//Set language

export const setLanguage = language => dispatch => {
    dispatch({
        type: SET_LANGUAGE,
        payload: language
    })
}

// Create or update profile
export const changeProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

        dispatch(setAlert(edit?'Profile updated seccesfully':'Profile created', 'success'))
        
        if(!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}