import {
    LOGIN, LOGOUT, UPDATE_USER, UPDATE_USER_TYPE, CATEGORIES_LIST,
    REQUEST_SUBMISSION, EMAIL_VERIFIED
} from './Constants'
import { combineReducers, createStore } from "redux"
const initialAuthState = {
    isLoggedIn: false,
    isEmailVerified: false,
    userInfo: {},
    categories: [],
    userType: '',
    requestSubmission: {}
};

const reducer = (state = initialAuthState, action) => {
    if (action.type === LOGIN) {
        return { ...state, isLoggedIn: true };
    }
    if (action.type === LOGOUT) {
        return { ...state, isLoggedIn: false };
    }
    if (action.type === EMAIL_VERIFIED) {
        return { ...state, isEmailVerified: false };
    }
    if (action.type === UPDATE_USER) {
        return { ...state, userInfo: action.data };
    }
    if (action.type === CATEGORIES_LIST) {
        return { ...state, categories: action.data };
    }
    if (action.type === UPDATE_USER_TYPE) {
        return { ...state, userType: action.data };
    }
    if (action.type === REQUEST_SUBMISSION) {
        return { ...state, requestSubmission: action.data };
    }
    return state;
};

const reducers = combineReducers({ reducer })
const store = createStore(reducers)
export default store
