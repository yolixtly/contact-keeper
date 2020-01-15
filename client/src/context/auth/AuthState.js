import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
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

const AuthState = (props) => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    // State allows to access the state
    // Dispatch allows us to dispatch objects/Actions to the Reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User (Checks which User is logged and get user data)

    // Register User (Signs up the user and gets a token back)

    // Login User (Login user and get token)

    // Logout

    // Clear Errors

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
