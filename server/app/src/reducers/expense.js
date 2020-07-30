import {
    ADD_EXPENSE,
    GET_EXPENSES,
    LOAD_MORE_EXPENSES,
    GET_INCOME_EXPENSES,
    GET_CATEGORY_EXPENSES,
    EXPENSES_LOADING_ON,
    EXPENSES_LOADING_OFF,
    CLEAR_FINANCE,
    EXPENSE_ERROR,
    ADD_INCOME_EXPENSE,
    DELETE_EXPENSE
} from '../actions/types';

const initialState = {
    expenses:[],
    expensesByIncome: [],
    expensesByCategory: [],
    loading: true,
    error: {}
};

const expense = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case EXPENSES_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case EXPENSES_LOADING_OFF:
            return {
                ...state, 
                loading: false
            }
        case GET_EXPENSES:
            return {
                ...state,
                expenses: payload,
                loading: false  
            }
        case LOAD_MORE_EXPENSES:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    ...payload
                ],
                loading: false  
            }
        case GET_INCOME_EXPENSES:
            return {
                ...state,
                expensesByIncome: payload,
                loading: false
            }
        case GET_CATEGORY_EXPENSES:
            return {
                ...state,
                expensesByCategory: payload,
                loading: false
            }
        case ADD_EXPENSE:
            return {
              ...state,
              expenses: [
              ...state.expenses,
                payload
              ],
              loading: false
            }
        case ADD_INCOME_EXPENSE:
            return {
                ...state,
                expensesByIncome: [
                    ...state.expensesByIncome,
                    payload
                ],
                expenses: [
                ...state.expenses,
                    payload
                ],
                loading: false
                }
        case CLEAR_FINANCE:
            return {
                categories: [],
                activeCategory: {},
                error:{},
                loading: true
            }
        case EXPENSE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default expense