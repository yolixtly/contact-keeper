import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        }
        case REGISTER_SUCCESS: {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload, // the token {token}
                isAuthenticated: true,
                loading: false
            }
        }
        case AUTH_ERROR:
        case REGISTER_FAIL: {
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                error: action.payload,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        }

        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            };
        }
        default:
            return state;
    }
}
