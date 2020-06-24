import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Comment from './Comment';

function Ad(props) {
    const { t } = useTranslation();

    const [displayComments, setDisplayComments] = useState(false);
    const [comments,  setComments] = useState([]);

    return (
        <div className="ad">
            <h3>Title of the ad</h3>
            <div class="profile"></div>
            <div class="menu"></div>
            <div class="metadata">
                <span>2 months ago</span>
                <span>place</span>
                <span>event</span>
            </div>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <button class="comments-button">{t("advertisement.comments")}</button>
            <div className="reaction-buttons">
                <button className="answer-button">{t("advertisement.answer")}</button>
            </div>
            <div className="comments">
                <Comment />
            </div>
        </div>
    )
}

export default Ad;