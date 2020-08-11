import {
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTIONS_BY_CATEGORY,
    GET_TRANSACTIONS_BY_INCOME,
    DELETE_SINGLE_TRANSACTION,
    DELETE_RELATED_TRANSACTIONS,
    LOAD_MORE_TRANSACTIONS,
    TRANSACTION_ERROR,
    CLEAR_FINANCE,
    TRANSACTION_LOADING_ON
} from '../actions/types';

const initialState = {
    transactions:[],
    transactionsByIncome: [],
    transactionsByCategory: [],
    loading: true,
    error: {}
};

const transaction = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case TRANSACTION_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [
                    payload,
                    ...state.transactions
                ],
                loading: false
            }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        case GET_TRANSACTIONS_BY_CATEGORY:
            return {
                ...state,
                transactionsByCategory: payload,
                loading: false
            }
        case GET_TRANSACTIONS_BY_INCOME:
            return {
                ...state,
                transactionsByIncome: payload,
                loading: false
            }
        case DELETE_SINGLE_TRANSACTION:
            return {
                ...state,
                expensesByIncome: payload,
                loading: false
            }
        case DELETE_RELATED_TRANSACTIONS:
            return {
                ...state,
                expensesByCategory: payload,
                loading: false
            }
        case LOAD_MORE_TRANSACTIONS:
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    payload
                ],
                loading: false
            }

        case CLEAR_FINANCE:
            return {
                transactions:[],
                transactionsByIncome: [],
                transactionsByCategory: [],
                loading: true,
                error: {}
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default transaction
