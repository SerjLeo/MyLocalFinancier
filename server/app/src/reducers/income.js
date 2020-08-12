import {
    ADD_INCOME,
    GET_INCOMES,
    GET_SINGLE_INCOME,
    UPDATE_INCOME,
    INCOMES_LOADING_ON,
    INCOMES_LOADING_OFF,
    CLEAR_FINANCE,
    INCOME_ERROR,
    DELETE_INCOME
} from '../actions/types';

const initialState = {
    incomes:[],
    activeIncome:{},
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
            const index = state.incomes.findIndex(item => item._id === payload._id)
            if (index === -1) {
                return {
                    ...state,
                    activeIncome: payload,
                    loading: false
                }
            }
            return {
              ...state,
              incomes: [
                ...state.incomes.slice(0,index),
                payload,
                ...state.incomes.slice(index+1)
              ],
              activeIncome: payload,
              loading: false
            }
        case CLEAR_FINANCE:
            return {
                categories: [],
                activeCategory: {},
                error:{},
                loading: true
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
