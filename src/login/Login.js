import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Mutation } from 'react-apollo';

import { useTranslation } from 'react-i18next';
import {useAuth} from '../context/auth';
import { loginMutation } from '../apollo-client/apolloClient';

import './Login.scss';

function Login(props) {
    const { t } = useTranslation();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {authToken, setAuthToken} = useAuth();

    const referer = props.location.state && props.location.state.referer || '/dashboard';

    function postLogin(mutation, login, password) {
        mutation({variables: {login: login, password: password}})
        .then(res=>{
            setAuthToken(res.data.login.token);
            setLoggedIn(true);
        })
        .catch(err=> {
            console.error(err);
            setIsError(true);
        }); // TODO handle error
    }   

    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }

    return (
        <div class="login">
            <h1>{t("authentication.login")}</h1>
            <Mutation mutation={loginMutation}>
                { (mutation, { data }) =>  (
                    <form onSubmit={e=>{e.preventDefault();postLogin(mutation, login, password)}}>
                        <input type="email" value={login} onChange={e=>setLogin(e.target.value)} placeholder={t("authentication.email") + ', ' + t("authentication.member-id")}/>
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placholder={t("authentication.password")}/>
                        <button type="submit">Sign in</button> 
                    </form>
                )}
            </Mutation>
            <Link to="/forgot-password">{t("authentication.forgot-password")}</Link>
            <Link to="/signup">{t("authentication.not-have-account")}</Link>
        </div>
    );
}

export default Login;