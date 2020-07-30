import {
    ADD_CATEGORY,
    GET_CATEGORIES,
    GET_SINGLE_CATEGORY,
    CATEGORIES_LOADING_ON,
    CATEGORIES_LOADING_OFF,
    CLEAR_FINANCE,
    CATEGORY_ERROR,
    DELETE_CATEGORY
} from '../actions/types';

const initialState = {
    categories:[],
    activeCategory:{},
    loading: true,
    error: {}
};

const category = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CATEGORIES_LOADING_ON:
            return {
                ...state,
                loading: true
            }
        case CATEGORIES_LOADING_OFF:
            return {
                ...state, 
                loading: false
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
                loading: false
            }
        case GET_SINGLE_CATEGORY:
            return {
                ...state,
                activeCategory: payload,
                loading: false
            }
        case ADD_CATEGORY: 
            return {
              ...state,
              categories: [
                payload,
              ...state.categories
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
        case CATEGORY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}

export default category