import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Mutation } from 'react-apollo';


import { useTranslation } from 'react-i18next';
import {useAuth} from '../context/auth';
import { loginMutation } from '../apollo-client/ApolloClient';

function Login() {
    const { t } = useTranslation();

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthToken} = useAuth();

    function postLogin(mutation, login, password) {
        mutation({variables: {login: login, password: password}})
        // .then(res=>setAuthToken(res.data.login.token))
        .then(res=><p>res.data.login.token</p>)
        .catch(err=>console.error(err)); // TODO handle error
    }   

    if (isLoggedIn) {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <Mutation mutation={loginMutation}>
                { (mutation, { data }) =>  (
                    <form onSubmit={e=>{e.preventDefault();postLogin(mutation, login, password)}}>
                        <input type="email" value={login} onChange={e=>setLogin(e.target.value)} placeholder={t("authentication.id")}/>
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