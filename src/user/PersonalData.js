import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {useUserInfo} from '../context/context';

function PersonalData(props) {
    const { t } = useTranslation();
    const u = useUserInfo();
    const { userInfo } = useUserInfo();
    const person = userInfo.person;

    return (
        <div className="profile-category">
            <h1>PersonalData</h1>
            <table>
                <tbody>
                    <tr><td>{t("profile.name")}</td><td>{person.surname} {person.name}</td></tr>
                    <tr><td>{t("profile.email")}</td><td>{userInfo.email}</td></tr>
                    <tr><td>{t("profile.member-id")}</td><td>{userInfo.memberId}</td></tr>
                    <tr><td>{t("profile.phone")}</td><td>{person.phone}</td></tr>
                    <tr><td>{t("profile.address")}</td><td>{person.address}</td></tr>
                    <tr><td>{t("profile.city")}</td><td>{person.city && (person.city.name + " " + person.city.code)}</td></tr>
                    <tr><td>{t("profile.date-of-birth")}</td><td>{person.dateOfBirth && (person.dateOfBirth.day + "/" + person.dateOfBirth.month + "/" + person.dateOfBirth.year)}</td></tr>
                </tbody>
            </table>
            <Link to={`${props.match.url}/edit`}>{t("profile.edit")}</Link>
        </div>
    );
}

export default PersonalData;