import axios from 'axios';
import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    GET_SINGLE_CATEGORY,
    CATEGORIES_LOADING_ON,
    CATEGORY_ERROR,
    DELETE_CATEGORY
} from './types';
import {setAlert} from '.'

export const getCategories = () => async dispatch => {

    dispatch({
        type: CATEGORIES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.get('/api/category', config);
        
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addCategory = formData => async dispatch => {

    dispatch({
        type: CATEGORIES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.put('/api/category', formData, config);

        dispatch({
            type: ADD_CATEGORY,
            payload: res.data
        })

        dispatch(setAlert('Category added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const createDefaultCategories = token => async dispatch => {
    try {
        await axios.get('/api/category/default');
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getCategoryByID = id => async dispatch => {

    dispatch({
        type: CATEGORIES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/category/${id}`, config);

        dispatch({
            type: GET_SINGLE_CATEGORY,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteCategory = id => async dispatch => {

    dispatch({
        type: CATEGORIES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.delete(`/api/category/${id}`, config);

        dispatch({
            type: DELETE_CATEGORY,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: CATEGORY_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}