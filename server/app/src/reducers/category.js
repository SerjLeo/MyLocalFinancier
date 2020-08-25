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
    categories: null,
    activeCategory:null,
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
                  ...state.categories,
                  payload
              ],
              loading: false
            }
        case CLEAR_FINANCE:
            return {
                categories: null,
                activeCategory:null,
                loading: true,
                error: {}
            }
        case DELETE_CATEGORY:
            const categories = state.categories?state.categories.filter(c => c._id !== payload._id):null
            let activeCategory = state.activeCategory
            if(state.activeCategory && state.activeCategory._id === payload._id) {
                activeCategory = null
            }
            return {
                ...state,
                categories,
                activeCategory,
                loading: false,
                error: {}
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
