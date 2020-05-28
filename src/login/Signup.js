import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { Mutation } from 'react-apollo';
import {useTranslation} from 'react-i18next';

import {signupMutation} from '../apollo-client/ApolloClient';
import {useAuth} from '../context/auth';


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
        <div>
            <Mutation mutation={signupMutation}>
                { (mutation, { data }) =>  (
                    <form onSubmit={e=>{e.preventDefault(); postSignup(mutation, email, memberId, password, confirmPassword)}}>
                        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={t("authentication.email")}/>
                        <input type="text" value={memberId} onChange={e=>setMemberId(e.target.value)} placeholder={t("authentication.member-id")}/>
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placholder={t("authentication.password")}/>
                        <input type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placholder={t("authentication.confirm-password")}/>
                        <button type="submit">{t("authentication.signup")}</button> 
                    </form>
                )}
            </Mutation>
            <Link to="/signup">{t("authentication.have-account")}</Link>
        </div>
    );
}

export default Signup;