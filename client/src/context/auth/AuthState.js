import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';

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
    const loadUser = () => {
        console.log("loadUser");
    };

    // Register User (Signs up the user and gets a token back)
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            // With the proxy setup on package.json, no need to put the entire url
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    }
    // Login User (Login user and get token)
    const login = () => {
        console.log("login");
    };

    // Logout
    const logout = () => {
        console.log("logout");
    };

    // Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                register,
                loadUser,
                logout,
                login,
                clearErrors
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
