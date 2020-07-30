import {
    CLEAR_FINANCE,
    GET_EXCHANGE_RATE,
    SYSTEM_ERROR,
    SET_LANGUAGE
} from '../actions/types';
const initialState = {
    exchangeRate: null,
    language: localStorage.getItem('language') || 'rus',
    loading: true,
    error: {}
};

const system = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_EXCHANGE_RATE:
            return {
                ...state,
                exchangeRate: payload
            }
        case SYSTEM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: payload
            }
        case CLEAR_FINANCE:
            return {
                ...state,
                exchangeRate: {},
                loading: true
            }
        default:
            return state;
    }
}

export default system