import {
    GET_EXCHANGE_RATE,
    SYSTEM_ERROR,
    SET_LANGUAGE
} from './types';
import FinanceService from '../services/FinanceService'

const financeService = new FinanceService();
// Get exchange course
export const getRate = () => dispatch => {
    financeService.getServerData()
        .then(resp => financeService.getExchangeRates(resp))
        .then(rates => dispatch({
                type: GET_EXCHANGE_RATE,
                payload: rates
                })
            )
        .catch(error => dispatch({
            type: SYSTEM_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        }))
}

//Set language

export const setLanguage = language => dispatch => {
    dispatch({
        type: SET_LANGUAGE,
        payload: language
    })
}
