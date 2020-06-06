import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

function PersonalData(props) {
    const { t } = useTranslation();

    return (
        <div className="profile-category">
            <h1>PersonalData</h1>
            <table>
                <tr><td>{t("profile.name")}</td><td>the name</td></tr>
                <tr><td>{t("profile.email")}</td><td>the email address</td></tr>
                <tr><td>{t("profile.phone")}</td><td>the phone number</td></tr>
                <tr><td>{t("profile.address")}</td><td>the address</td></tr>
                <tr><td>{t("profile.birth")}</td><td>the date of birth</td></tr>
            </table>
            <Link to={props.match.url + "/edit"}>{t("profile.edit")}</Link>
        </div>
    );
}

export default PersonalData;