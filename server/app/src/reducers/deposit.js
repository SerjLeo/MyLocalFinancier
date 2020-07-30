import {
    ADD_DEPOSIT,
    GET_DEPOSITS,
    GET_INCOME_DEPOSITS,
    DEPOSITS_LOADING_ON,
    DEPOSITS_LOADING_OFF,
    CLEAR_FINANCE,
    DEPOSITS_ERROR,
    DELETE_DEPOSIT,
    DELETE_RELATED_DEPOSITS
} from '../actions/types';

const initialState = {
    deposits:[],
    incomeDeposits:[],
    loading: true,
    error: {}
};

const deposit = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case DEPOSITS_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case DEPOSITS_LOADING_OFF:
            return {
                ...state, 
                loading: false
            }
        case GET_DEPOSITS:
            return {
                ...state,
                deposits: payload,
                loading: false  
            }
        case GET_INCOME_DEPOSITS:
            return {
                ...state,
                incomeDeposits: payload,
                loading: false  
            }
        case ADD_DEPOSIT: 
            return {
              ...state,
              incomeDeposits: [
              ...state.incomeDeposits,
                payload
              ],
              deposits: [
                ...state.deposits,
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
        case DEPOSITS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case DELETE_RELATED_DEPOSITS:
            return {
                ...state,
                loading: false,
                incomeDeposits: []
            }
        case DELETE_DEPOSIT:
            return {
                ...state,
                loading: false,
                incomeDeposits: [],
                deposits: []
            }
        default:
            return state;
    }
}

export default deposit