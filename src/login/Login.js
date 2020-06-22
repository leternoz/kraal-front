import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { useTranslation } from 'react-i18next';
import {useAuth} from '../context/context';
import { loginMutation } from '../apollo-client/apolloClient';
import { matchServerToClientError } from '../error-handler/ErrorBoundary';
import ErrorMessage from '../error-handler/ErrorMessage';

import './Login.scss';

function Login(props) {
    const { t } = useTranslation();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthToken } = useAuth();
    const [error, setError] = useState('');

    const referer = (props.location.state && props.location.state.referer) || '/dashboard';

    function postLogin(mutation, login, password) {
        // TODO validate the input
        mutation({variables: {login: login, password: password}})
        .then(res=>{
            setAuthToken(res.data.login.token);
            setLoggedIn(true);
        })
        .catch( err => {
            console.error(err);
            setError(t(matchServerToClientError(err)));
        });
    }   

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <div className="login">
            <h1>{t("authentication.login")}</h1>
            <Mutation mutation={loginMutation}>
                { (mutation, { data }) =>  (
                    <form onSubmit={e=>{e.preventDefault();postLogin(mutation, login, password)}}>
                        <label htmlFor="login">{t("authentication.email") + ', ' + t("authentication.member-id")}</label>
                        <input id="login" type="email" value={login} onChange={e=>setLogin(e.target.value)} placeholder={t("authentication.email") + ', ' + t("authentication.member-id")}/>
                        <label htmlFor="password">{t("authentication.password")}</label>
                        <input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placholder={t("authentication.password")}/>
                        <button type="submit">{t("authentication.login")}</button> 
                    </form>
                )}
            </Mutation>
            <Link to="/forgot-password">{t("authentication.forgot-password")}</Link>
            <Link to="/signup">{t("authentication.not-have-account")}</Link>
            {error && <ErrorMessage errorTitle={t("error.title")} errorMessage={error}/>}
        </div>
    );
}

export default Login;