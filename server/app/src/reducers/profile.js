import {
    PROFILE_ERROR,
    SET_PROFILE,
    PROFILE_LOADING_ON,
    CLEAR_PROFILE
} from '../actions/types';
const initialState = {
    profile: null,
    loading: true,
    error: {}
};
const profile = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case PROFILE_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: true
            }
        default:
            return state;
    }
}

export default profile