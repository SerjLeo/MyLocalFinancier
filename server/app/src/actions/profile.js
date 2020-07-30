import axios from 'axios';
import {
   SET_PROFILE,
   PROFILE_ERROR,
   PROFILE_LOADING_ON
} from './types';
import { setAlert } from '.';

//Load user's profile
export const getProfile = () => async dispatch => {
    try {
        dispatch({
            type: PROFILE_LOADING_ON
        })

        const res = await axios.get('/api/profile/me');

        dispatch({
            type: SET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

// Create or update profile
export const setProfile = (formData, history, edit = false) => async dispatch => {
    try {
        dispatch({
            type: PROFILE_LOADING_ON
        })

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: SET_PROFILE,
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