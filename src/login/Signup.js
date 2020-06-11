import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {useTranslation} from 'react-i18next';

import {signupMutation} from '../apollo-client/apolloClient';
import {useAuth} from '../context/auth';

import './Signup.scss';

function Signup() {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [memberId, setMemberId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAuthToken} = useAuth();

    function postSignup(mutation, email, memberId, password, confirmPassword) {
        if(password === confirmPassword) {
            // TODO check the email and the member id are valid
            memberId = parseInt(memberId);
            mutation({variables: {email: email, memberId: memberId, password: password}})
            .then(res=>setAuthToken(res.data.signup.token)) 
            .catch(err=>console.error(err)); // TODO handle error
        } else {
            // TODO handle error
            console.error('The passwords do not match');
        }
    }
    return (
        <div className="signup">
            <h1>{t("authentication.signup")}</h1>
            <Mutation mutation={signupMutation}>
                { (mutation, { data }) =>  (
                    <form onSubmit={e=>{e.preventDefault(); postSignup(mutation, email, memberId, password, confirmPassword)}}>
                        <label htmlFor="email">{t("authentication.your-email")}</label>
                        <input id="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="scout@sgdf.fr"/>
                        <label htmlFor="member-id">{t("authentication.your-member-id")}</label>
                        <input id="member-id" type="text" value={memberId} onChange={e=>setMemberId(e.target.value)} placeholder="123456789"/>
                        <label htmlFor="password">{t("authentication.your-password")}</label>
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
                        <label htmlFor="confirm-password">{t("authentication.confirm-password")}</label>
                        <input id="confirm-password" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                        <button type="submit">{t("authentication.signup")}</button> 
                    </form>
                )}
            </Mutation>
            <Link to="/login">{t("authentication.have-account")}</Link>
        </div>
    );
}

export default Signup;