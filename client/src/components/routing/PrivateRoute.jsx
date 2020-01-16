import React, { useContext, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading } = authContext;

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />
            }
        />
    );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
