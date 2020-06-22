import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {useTranslation} from 'react-i18next';

import {useUserInfo} from '../context/context';
import { matchServerToClientError } from '../error-handler/ErrorBoundary';
import ErrorMessage from '../error-handler/ErrorMessage';
import { mapNeo4JDateToVanillaDate, mapVanillaDateToNeo4jDate, mapVanillaDateToIsoDate} from '../utils/mapper';

// TODO change the city
function PersonalDataForm(props) {
    const { t } = useTranslation();
    const { userInfo, setUserInfo } = useUserInfo();
    const isoDateOfBirth = mapVanillaDateToIsoDate(mapNeo4JDateToVanillaDate(userInfo.person.dateOfBirth));

    const [surname, setSurname] = useState(userInfo.person.surname);
    const [name, setName] = useState(userInfo.person.name);
    const [phone, setPhone] = useState(userInfo.person.phone);
    const [address, setAddress] = useState(userInfo.person.address);
    const [cityName, setCityName] = useState('');
    const [cityCode, setCityCode] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(mapNeo4JDateToVanillaDate(userInfo.person.dateOfBirth));
    const [error, setError] = useState('');

    const updateProfileMutation = gql`
        mutation UpdatePerson($id: ID!, $surname: String, $name: String, $phone: String, $address: String, $dateOfBirth: _Neo4jDateInput) {
            UpdatePerson(id: $id, surname: $surname, name: $name, phone: $phone, address: $address, dateOfBirth: $dateOfBirth) {
                id
                surname
                name
                phone
                address
                dateOfBirth {
                    year,
                    month,
                    day
                }
            }
        }
    `;

    function postUpdateProfile(mutation, surname, name, phone, address, dateOfBirth) {
        // TODO validate the input
        const neoJDateOfBirth = mapVanillaDateToNeo4jDate(dateOfBirth);
        mutation({variables: {id: userInfo.person.id, surname: surname, name: name, phone: phone, address: address, dateOfBirth: neoJDateOfBirth}})
        .then(res => {
            userInfo.person = res.data.UpdatePerson;
            setUserInfo(userInfo);
            props.history.push('/profile')
        })
        .catch(err => {
            console.error(err);
            setError(t(matchServerToClientError(err)));
        });
    }

    return (
        <div>
            <h1>PersonalDataForm</h1>
            <Mutation mutation={updateProfileMutation}>
                { (mutation, { data }) => (
                    <form onSubmit={e => {e.preventDefault(); postUpdateProfile(mutation, surname, name, phone, address, dateOfBirth)}}>
                        <label htmlFor="surname">{t("profile.surname")}</label>
                        <input id="surname" type="text" defaultValue={userInfo.person.surname} onChange={e => setSurname(e.target.value)}/>
                        <label htmlFor="name">{t("profile.name")}</label>
                        <input id="name" type="text" defaultValue={userInfo.person.name} onChange={e => setName(e.target.value)}/>
                        <label htmlFor="phone">{t("profile.phone")}</label>
                        <input id="phone" type="text" defaultValue={userInfo.person.phone} onChange={e => setPhone(e.target.value)}/>
                        <label htmlFor="address">{t("profile.address")}</label>
                        <input id="address" type="text" defaultValue={userInfo.person.address} onChange={e => setAddress(e.target.value)}/>
                        <label htmlFor="date-of-birth">{t("profile.date-of-birth")}</label>
                        <input id="date-of-birth" type="date" defaultValue={isoDateOfBirth} onChange={e => setDateOfBirth(e.target.value)}/>
                        <button type="submit">{t("form.save")}</button> 
                        <Link to="/profile">{t("form.cancel")}</Link>
                    </form>
                )}
            </Mutation>
            {error && <ErrorMessage errorTitle={t("error.title")} errorMessage={error}/>}
        </div>
    );
}

export default withRouter(PersonalDataForm);