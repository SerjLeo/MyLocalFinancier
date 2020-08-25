import axios from 'axios';
import {
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTIONS_BY_CATEGORY,
    GET_TRANSACTIONS_BY_INCOME,
    DELETE_SINGLE_TRANSACTION,
    DELETE_RELATED_TRANSACTIONS,
    TRANSACTION_ERROR,
    TRANSACTIONS_LOADING_ON,
    TRANSACTIONS_BY_INCOME_LOADING_ON,
    TRANSACTIONS_BY_CATEGORY_LOADING_ON
} from './types';
import {setAlert} from '.'

export const addTransaction = (formData) => async dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
        const res = await axios.post('/api/transaction', formData, config);
        dispatch({
            type: ADD_TRANSACTION,
            payload: res.data
        })
        dispatch(setAlert('transactionAdded', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getTransactions = (limit = 10000, skip = 0) => async dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }
        const res = await axios.get(`/api/transaction?limit=${limit}&skip=${skip}`, config);
        dispatch({
            type: GET_TRANSACTIONS,
            payload: res.data,
            params: {
                skip,
                limit
            }
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
export const getTransactionsByCategory = id => async dispatch => {
    dispatch({
        type: TRANSACTIONS_BY_CATEGORY_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.get(`/api/transaction/category/${id}`, config);
        dispatch({
            type: GET_TRANSACTIONS_BY_CATEGORY,
            payload: {
                category: id,
                transactions: res.data
            }
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getTransactionsByIncome = id => async dispatch => {
    dispatch({
        type: TRANSACTIONS_BY_INCOME_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const res = await axios.get(`/api/transaction/income/${id}`, config);
        dispatch({
            type: GET_TRANSACTIONS_BY_INCOME,
            payload: {
                income: id,
                transactions: res.data
            }
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteRelatedTransactions = id => async dispatch => {
    dispatch({
        type: TRANSACTIONS_BY_INCOME_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }
        await axios.delete(`/api/transaction/related/${id}`, config);
        dispatch({
            type: DELETE_RELATED_TRANSACTIONS,
            payload: id
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteSingleTransaction = id => async dispatch => {
    dispatch({
        type: TRANSACTIONS_LOADING_ON
    })
    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }
        const res = await axios.delete(`/api/transaction/${id}`, config);
        dispatch({
            type: DELETE_SINGLE_TRANSACTION,
            payload: res.data._id
        })
        dispatch(setAlert('transactionDeleted', 'success', 2000))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: TRANSACTION_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
