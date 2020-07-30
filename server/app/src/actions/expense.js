import axios from 'axios';
import {
    ADD_EXPENSE,
    ADD_INCOME_EXPENSE,
    GET_EXPENSES,
    LOAD_MORE_EXPENSES,
    GET_INCOME_EXPENSES,
    GET_CATEGORY_EXPENSES,
    EXPENSES_LOADING_ON,
    EXPENSE_ERROR,
    DELETE_EXPENSE,
    DELETE_RELATED_EXPENSES
} from './types';
import {setAlert} from '.'

//Expenses
export const addExpense = (formData, type = 'general') => async dispatch => {

    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application'
            }
        }

        const res = await axios.put('/api/expense', formData, config);

        if (type === 'general') {
            dispatch({
                type: ADD_EXPENSE,
                payload: res.data
            })
        } else if (type === 'income') {
            dispatch({
                type: ADD_INCOME_EXPENSE,
                payload: res.data
            })
        }

        dispatch(setAlert('Expense added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getExpensesByIncome = (id, limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/expense/byincome/${id}?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_INCOME_EXPENSES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getExpensesByCategory = (id, limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/expense/bycategory/${id}?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_CATEGORY_EXPENSES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getExpenses = (limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get(`/api/expense?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: GET_EXPENSES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const loadMoreExpenses = (limit = 1000, skip = 0) => async dispatch => {

    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get(`/api/expense?limit=${limit}&skip=${skip}`, config);
        
        dispatch({
            type: LOAD_MORE_EXPENSES,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteRelatedExpenses = id => async dispatch => {
    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.delete(`/api/expense/related/${id}`, config);
        
        dispatch({
            type: DELETE_RELATED_EXPENSES
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteSingleExpense = id => async dispatch => {
    dispatch({
        type: EXPENSES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.delete(`/api/expense/${id}`, config);
        
        dispatch({
            type: DELETE_EXPENSE
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: EXPENSE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}