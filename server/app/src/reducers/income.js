import {
    ADD_INCOME,
    GET_INCOMES,
    GET_SINGLE_INCOME,
    UPDATE_INCOME,
    UPDATE_ACTIVE_INCOME,
    INCOMES_LOADING_ON,
    INCOMES_LOADING_OFF,
    CLEAR_FINANCE,
    INCOME_ERROR,
    DELETE_INCOME
} from '../actions/types';

const initialState = {
    incomes: null,
    activeIncome: null,
    loading: true,
    error: {}
};

const income = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case INCOMES_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case INCOMES_LOADING_OFF:
            return {
                ...state, 
                loading: false
            }
        case GET_INCOMES:
            return {
                ...state,
                incomes: payload,
                loading: false  
            }
        case GET_SINGLE_INCOME:
            return {
                ...state,
                activeIncome: payload,
                loading: false
            }
        case ADD_INCOME: 
            return {
              ...state,
              incomes: [
                  ...state.incomes,
                  payload
              ],
              loading: false
            }
        case UPDATE_INCOME:
            if(state.incomes) {
                const index = state.incomes.findIndex(item => item._id === payload._id)
                return {
                    ...state,
                    incomes: [
                        ...state.incomes.slice(0,index),
                        payload,
                        ...state.incomes.slice(index+1)
                    ],
                    loading: false
                }
            }
            return {
                ...state,
                loading: false
            }
        case UPDATE_ACTIVE_INCOME:
            if(state.activeIncome && (payload._id === state.activeIncome._id)) {
                return {
                    ...state,
                    activeIncome: payload
                }
            }
            return state
        case DELETE_INCOME:
            const incomes = state.incomes?state.incomes.filter(i => i._id !== payload._id):null
            let activeIncome = state.activeIncome
            if(state.activeIncome && state.activeIncome._id === payload._id) {
                activeIncome = null
            }
            return {
                ...state,
                incomes,
                activeIncome,
                loading: false,
                error: {}
            }
        case CLEAR_FINANCE:
            return {
                incomes: null,
                activeIncome: null,
                loading: true,
                error: {}
            }
        case INCOME_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default income
