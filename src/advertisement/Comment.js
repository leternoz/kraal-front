import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Comment(props) {
    const { t } = useTranslation();

    const [displayComments, setDisplayComments] = useState(false);
    const [comments,  setComments] = useState([]);

    return (
        <div className="comment">
            <div class="profile"></div>
            <div class="menu"></div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
            <button>{t("advertisement.answer")}</button>
            <span>2 months ago</span>
            <div class="comments">
                
            </div>
        </div>
    )
}

export default Comment;