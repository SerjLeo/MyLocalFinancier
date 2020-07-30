import {
    GET_EXCHANGE_RATE,
    SYSTEM_ERROR,
    SET_LANGUAGE
} from './types';
import financeService from '../services/financeService'

const finService = new financeService();
// Get exchange course
export const getRate = () => dispatch => {
    finService.getServerData()
        .then(resp => finService.getExchangeRates(resp))
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