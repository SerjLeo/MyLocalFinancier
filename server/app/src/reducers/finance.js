import {
    CLEAR_FINANCE,
    GET_FINANCE,
    FINANCE_ERROR,
    UPDATE_FINANCE,
    GET_EXCHANGE_RATE,
    UPDATE_INCOME,
    UPDATE_CATEGORY,
    GET_INCOMES,
    ADD_TRANSACTION,
    GET_CATEGORIES,
    SET_LOADING_ON,
    SET_LOADING_OFF
} from '../actions/types';
const initialState = {
    finance: {
        incomes:[],
        categories:[],
        expenses:[]
    },
    exchangeRate: {},
    loading: true,
    error: {}
};

const finance = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_EXCHANGE_RATE:
            return {
                ...state,
                exchangeRate: payload
            }
        case SET_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case GET_FINANCE:
        case UPDATE_FINANCE:
        case UPDATE_CATEGORY:
        case ADD_TRANSACTION:
            return {
                ...state,
                finance: payload,
                loading: false
            }
        case GET_INCOMES:
        case UPDATE_INCOME:
            return {
                ...state,
                loading: false,
                finance: {
                    ...state.finance,
                    incomes: payload
                }
            }
        case GET_CATEGORIES:
            return {
                ...state,
                loading: false,
                finance: {
                    ...state.finance,
                    categories: payload
                }
            }
        case CLEAR_FINANCE:
            return {
                ...state,
                finance: {},
                loading: true
            }
        case FINANCE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case SET_LOADING_OFF:
            return {
                ...state, 
                loading: false
            }
        default:
            return state;
    }
}

export default finance