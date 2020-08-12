import axios from 'axios';
import {
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTIONS_BY_CATEGORY,
    GET_TRANSACTIONS_BY_INCOME,
    DELETE_SINGLE_TRANSACTION,
    DELETE_RELATED_TRANSACTIONS,
    LOAD_MORE_TRANSACTIONS,
    TRANSACTION_ERROR,
    TRANSACTION_LOADING_ON
} from './types';
import {setAlert} from '.'

export const addTransaction = (formData) => async dispatch => {

    dispatch({
        type: TRANSACTION_LOADING_ON
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

export const getTransactions = (limit = 50, skip = 0) => async dispatch => {

    dispatch({
        type: TRANSACTION_LOADING_ON
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
//
// export const getExpensesByCategory = (id, limit = 1000, skip = 0) => async dispatch => {
//
//     dispatch({
//         type: EXPENSES_LOADING_ON
//     })
//
//     try {
//         const config = {
//             headers: {
//                 'Content-Type':'application/json',
//                 'Accept':'application/json'
//             }
//         }
//
//         const res = await axios.get(`/api/expense/bycategory/${id}?limit=${limit}&skip=${skip}`, config);
//
//         dispatch({
//             type: GET_CATEGORY_EXPENSES,
//             payload: res.data
//         })
//
//     } catch (err) {
//         const errors = err.response.data.errors;
//
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: EXPENSE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
//
// export const getExpenses = (limit = 1000, skip = 0) => async dispatch => {
//
//     dispatch({
//         type: EXPENSES_LOADING_ON
//     })
//
//     try {
//         const config = {
//             headers: {
//                 'Content-Type':'application/json'
//             }
//         }
//
//         const res = await axios.get(`/api/expense?limit=${limit}&skip=${skip}`, config);
//
//         dispatch({
//             type: GET_EXPENSES,
//             payload: res.data
//         })
//
//     } catch (err) {
//         const errors = err.response.data.errors;
//
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: EXPENSE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
//
// export const loadMoreExpenses = (limit = 1000, skip = 0) => async dispatch => {
//
//     dispatch({
//         type: EXPENSES_LOADING_ON
//     })
//
//     try {
//         const config = {
//             headers: {
//                 'Content-Type':'application/json'
//             }
//         }
//
//         const res = await axios.get(`/api/expense?limit=${limit}&skip=${skip}`, config);
//
//         dispatch({
//             type: LOAD_MORE_EXPENSES,
//             payload: res.data
//         })
//
//     } catch (err) {
//         const errors = err.response.data.errors;
//
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: EXPENSE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
//
// export const deleteRelatedExpenses = id => async dispatch => {
//     dispatch({
//         type: EXPENSES_LOADING_ON
//     })
//
//     try {
//         const config = {
//             headers: {
//                 'Accept':'application/json'
//             }
//         }
//
//         const res = await axios.delete(`/api/expense/related/${id}`, config);
//
//         dispatch({
//             type: DELETE_RELATED_EXPENSES
//         })
//
//     } catch (err) {
//         const errors = err.response.data.errors;
//
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: EXPENSE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
//
// export const deleteSingleExpense = id => async dispatch => {
//     dispatch({
//         type: EXPENSES_LOADING_ON
//     })
//
//     try {
//         const config = {
//             headers: {
//                 'Accept':'application/json'
//             }
//         }
//
//         const res = await axios.delete(`/api/expense/${id}`, config);
//
//         dispatch({
//             type: DELETE_EXPENSE
//         })
//
//     } catch (err) {
//         const errors = err.response.data.errors;
//
//         if (errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//         }
//         dispatch({
//             type: EXPENSE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status}
//         })
//     }
// }
