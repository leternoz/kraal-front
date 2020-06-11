import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function PersonalData(props) {
    const { t } = useTranslation();
    const person = props.person;

    return (
        <div className="profile-category">
            <h1>PersonalData</h1>
            <table>
                <tbody>
                    <tr><td>{t("profile.name")}</td><td>{person.surname} {person.name}</td></tr>
                    <tr><td>{t("profile.email")}</td><td>{person.email}</td></tr>
                    <tr><td>{t("profile.phone")}</td><td>{person.phone}</td></tr>
                    <tr><td>{t("profile.address")}</td><td>{person.address}</td></tr>
                    <tr><td>{t("profile.city")}</td><td>{person.city && (person.city.name + " " + person.city.code)}</td></tr>
                    <tr><td>{t("profile.birth")}</td><td>{person.dateOfBirth.year && (person.dateOfBirth.day + "/" + person.dateOfBirth.month + "/" + person.dateOfBirth.year)}</td></tr>
                </tbody>
            </table>
            <Link to={props.match.url + "/edit"}>{t("profile.edit")}</Link>
        </div>
    );
}

export default PersonalData;