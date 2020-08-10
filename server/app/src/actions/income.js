import axios from 'axios';
import {
    ADD_INCOME,
    GET_INCOMES,
    GET_SINGLE_INCOME,
    UPDATE_INCOME,
    INCOMES_LOADING_ON,
    INCOME_ERROR,
    DELETE_INCOME
} from './types';
import {setAlert} from '.'

export const getIncomes = () => async dispatch => {

    dispatch({
        type: INCOMES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.get('/api/income', config);

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
            type: INCOME_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const getIncomeByID = id => async dispatch => {

    dispatch({
        type: INCOMES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.get(`/api/income/${id}`, config);
        
        dispatch({
            type: GET_SINGLE_INCOME,
            payload: res.data
        })

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

export const addIncome = formData => async dispatch => {
    
    dispatch({
        type: INCOMES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }

        const res = await axios.put('/api/income', formData, config);

        dispatch({
            type: ADD_INCOME,
            payload: res.data
        })

        dispatch(setAlert('Income added', 'success'))
    } catch (err) {
        console.log(err);
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const updateIncome = (id, balance) => async dispatch => {
    
    dispatch({
        type: INCOMES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
            }
        }

        const resData = {
            balance
        }
        
        const res = await axios.put(`/api/income/update/${id}`, resData, config);

        dispatch({
            type: UPDATE_INCOME,
            payload: res.data
        })

        return res.data
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteIncome = id => async dispatch => {
    
    dispatch({
        type: INCOMES_LOADING_ON
    })

    try {
        const config = {
            headers: {
                'Accept':'application/json'
            }
        }
        
        const res = await axios.delete(`/api/income/${id}`, config);

        dispatch({
            type: DELETE_INCOME,
            payload: res.data.incomes
        })

    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: INCOME_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}
