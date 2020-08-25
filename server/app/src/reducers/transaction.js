import {
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTIONS_BY_CATEGORY,
    GET_TRANSACTIONS_BY_INCOME,
    DELETE_SINGLE_TRANSACTION,
    DELETE_RELATED_TRANSACTIONS,
    TRANSACTION_ERROR,
    CLEAR_FINANCE,
    TRANSACTIONS_LOADING_ON,
    TRANSACTIONS_BY_CATEGORY_LOADING_ON,
    TRANSACTIONS_BY_INCOME_LOADING_ON
} from '../actions/types';

const initialState = {
    transactions: null,
    transactions_loading: true,
    transactionsByIncome: {
        income: null,
        transactions: null
    },
    transactionsByCategory: {
        category: null,
        transactions: null
    },
    transactionsByIncome_loading: true,
    transactionsByCategory_loading: true,
    error: {}
};

const transaction = (state = initialState, action) => {
    const {type, payload, params} = action;
    switch (type) {
        case TRANSACTIONS_LOADING_ON:
            return {
                ...state,
                transactions_loading: true
            }
        case TRANSACTIONS_BY_CATEGORY_LOADING_ON:
            return {
                ...state,
                transactionsByCategory_loading: true
            }
        case TRANSACTIONS_BY_INCOME_LOADING_ON:
            return {
                ...state,
                transactionsByIncome_loading: true
            }
        case ADD_TRANSACTION:
            let newState = {}
            if(!state.transactions) {
                newState = {
                    ...state,
                    transactions: [
                        payload
                    ],
                    transactions_loading: false
                }
            } else {
                newState = {
                    ...state,
                    transactions: [
                        payload,
                        ...state.transactions
                    ],
                    transactions_loading: false
                }
            }
            if(payload.income._id === state.transactionsByIncome.income) {
                newState.transactionsByIncome.transactions.unshift(payload)
            }
            if(payload.category._id === state.transactionsByCategory.category) {
                newState.transactionsByCategory.transactions.unshift(payload)
            }
            return newState
        case GET_TRANSACTIONS:
            if(params.skip) {
                return {
                    ...state,
                    transactions: [
                        ...state.transactions.slice(0,params.skip),
                        ...payload
                    ],
                    transactions_loading: false
                }
            }
            return {
                ...state,
                transactions: payload,
                transactions_loading: false
            }
        case GET_TRANSACTIONS_BY_CATEGORY:
            return {
                ...state,
                transactionsByCategory: payload,
                transactionsByCategory_loading: false
            }
        case GET_TRANSACTIONS_BY_INCOME:
            return {
                ...state,
                transactionsByIncome: payload,
                transactionsByIncome_loading: false
            }
        case DELETE_SINGLE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions?state.transactions.filter(t => t._id !== payload):null,
                transactionsByIncome: {
                    income: null,
                    transactions: state.transactionsByIncome.transactions?state.transactionsByIncome.transactions.filter(t => t._id !== payload):null
                },
                transactionsByCategory: {
                    category: null,
                    transactions: state.transactionsByCategory.transactions?state.transactionsByCategory.transactions.filter(t => t._id !== payload):null
                },
                transactions_loading: false
            }
        case DELETE_RELATED_TRANSACTIONS:
            let transactionsByIncome_loading = state.transactionsByIncome_loading
            const transactions = state.transactions?state.transactions.filter(t => t.income && (t.income._id !== payload)):null
            const transactionsByCategory = {
                ...state.transactionsByCategory,
                transactions: state.transactionsByCategory.transactions?state.transactionsByCategory.transactions.filter(t => t.income && (t.income._id !== payload)):null
            }
            let transactionsByIncome = state.transactionsByIncome
            if(state.transactionsByIncome.income === payload) {
                transactionsByIncome = {
                    income: null,
                    transactions: null
                }
                transactionsByIncome_loading = true
            }
            return {
                ...state,
                transactions,
                transactionsByCategory,
                transactionsByIncome,
                transactionsByIncome_loading
            }
        case CLEAR_FINANCE:
            return {
                transactions: null,
                transactions_loading: true,
                transactionsByIncome: {
                    income: null,
                    transactions: null
                },
                transactionsByCategory: {
                    category: null,
                    transactions: null
                },
                transactionsByIncome_loading: true,
                transactionsByCategory_loading: true,
                error: {}
            }
        case TRANSACTION_ERROR:
            return {
                ...state,
                transactions_loading: false,
                transactionsByIncome_loading: false,
                transactionsByCategory_loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default transaction
