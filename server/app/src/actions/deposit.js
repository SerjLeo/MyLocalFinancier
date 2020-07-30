import axios from 'axios';
import {
    ADD_DEPOSIT,
    GET_DEPOSITS,
    GET_INCOME_DEPOSITS,
    DEPOSITS_LOADING_ON,
    DEPOSITS_ERROR,
    DELETE_DEPOSIT,
    DELETE_RELATED_DEPOSITS
} from './types';
import {setAlert} from '.'

//Expenses
export const addDeposit = formData => async dispatch => {

    dispatch({
        type: DEPOSITS_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application'
            }
        }

        const res = await axios.put('/api/deposit', formData, config);

        dispatch({
            type: ADD_DEPOSIT,
            payload: res.data
        })

        dispatch(setAlert('Deposit added', 'success'))
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEPOSITS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getDepositsByIncome = (id, limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: DEPOSITS_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/deposit/${id}?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_INCOME_DEPOSITS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEPOSITS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getDeposits = (limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: DEPOSITS_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/deposit?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_DEPOSITS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEPOSITS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteRelatedDeposits = id => async dispatch => {

    dispatch({
        type: DEPOSITS_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/deposit/related/${id}`, config);
        
        dispatch({
            type: GET_DEPOSITS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEPOSITS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteSingleDeposit = (limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: DEPOSITS_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/deposit?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_DEPOSITS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DEPOSITS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}