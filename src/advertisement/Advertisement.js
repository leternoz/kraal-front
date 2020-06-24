import React from 'react';
import { useTranslation } from 'react-i18next';

import Ad from './Ad';
import './Advertisement.scss';

function Advertisement() {
    const { t } = useTranslation();

    return (
        <div class="advertisement">
            <div className="publish">
                <h2>{t("advertisement.publish-ad")}</h2>
                <form>
                    <label></label>
                    <label for="publish-title">{t("advertisement.publish-title")}</label>
                    <input id="publish-title" type="text" placeholder={t("advertisement.publish-title")}/>
                    <label for="publish-body">{t("advertisement.publish-body")}</label>
                    <textarea id="publish-body" placeholder={t("advertisement.publish-body")}/>
                    <button class="plain-button" type="submit">{t("advertisement.publish")}</button>
                </form>
            </div>

            <div className="feed">
                <Ad/>
            </div>

        </div>
    )
}

export default Advertisement;