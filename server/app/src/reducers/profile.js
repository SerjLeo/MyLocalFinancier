import {
    PROFILE_ERROR,
    GET_PROFILE,
    CLEAR_PROFILE,
    SET_LANGUAGE
} from '../actions/types';
const initialState = {
    profile: null,
    loading: true,
    language: 'rus',
    error: {}
};
const profile = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case SET_LANGUAGE:
            return {
                ...state,
                language: payload
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