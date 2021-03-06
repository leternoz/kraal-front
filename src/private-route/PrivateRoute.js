import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/context';

function PrivateRoute ({component: Component, ...rest}) {
    const { authToken } = useAuth();
    return (
        <Route {...rest} render={(props) => (
            authToken 
            ? (<Component {...props} {...rest}/>)
            : (<Redirect to={{pathname: "/login", state: { referer: props.location} }}/>)
        )}>
        </Route>
    );
}

export default PrivateRoute;
