import axios from 'axios';
import financeService from '../services/financeService'
import {
    FINANCE_ERROR,
    GET_EXCHANGE_RATE,
    GET_FINANCE,
    UPDATE_FINANCE,
    UPDATE_INCOME,
    UPDATE_CATEGORY,
    ADD_TRANSACTION,
    GET_INCOMES,
    GET_CATEGORIES,
    SET_LOADING_ON,
    SET_LOADING_OFF
} from './types';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from '.'

const finService = new financeService();
// Get exchange cource
export const getRate = () => dispatch => {
    finService.getServerData()
        .then(resp => finService.getExchangeRates(resp))
        .then(rates => dispatch({
                type: GET_EXCHANGE_RATE,
                payload: rates
                })
            )
        .catch(error => dispatch({
            type: FINANCE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        }))

}

//Incomes
export const getIncomes = () => async dispatch => {
    dispatch({
        type: SET_LOADING_ON
    })

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get('/api/finance/incomes', config);

        dispatch({
            type: GET_INCOMES,
            payload: res.data
        })
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const getIncomeByID = id => async dispatch => {
    dispatch({
        type: SET_LOADING_ON
    })

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get(`/api/finance/incomes/${id}`, config);

        dispatch({
            type: SET_LOADING_OFF
        })
        
        return res.data
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addIncome = formData => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/finance/incomes', formData, config);

        dispatch({
            type: UPDATE_FINANCE,
            payload: res.data
        })

        dispatch(setAlert('Income added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const updateIncome = (id, balance, deposit = null) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const resData = {
            balance,
            deposit
        }
        
        const res = await axios.put(`/api/finance/incomes/${id}`, resData, config);

        dispatch({
            type: UPDATE_INCOME,
            payload: res.data.incomes
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//All Finance
export const getCurrentFinance = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/finance');

        dispatch({
            type: GET_FINANCE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Categories
export const getCategories = () => async dispatch => {
    dispatch({
        type: SET_LOADING_ON
    })

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.get('/api/finance/categories', config);
        
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
            type: FINANCE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const updateCategory = (transaction, id) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const resData = {
            transaction
        }

        const res = await axios.put(`/api/finance/category/${id}`, resData, config);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addCategory = formData => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/finance/category', formData, config);

        dispatch({
            type: UPDATE_FINANCE,
            payload: res.data
        })

        dispatch(setAlert('Category added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

//Expenses
export const addExpense = formData => async dispatch => {
    dispatch({
        type: SET_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        const res = await axios.put('/api/finance/transactions', formData, config);

        dispatch({
            type: ADD_TRANSACTION,
            payload: res.data
        })

        dispatch(setAlert('Transaction added', 'success'))
        return res
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: FINANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}