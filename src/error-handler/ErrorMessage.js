import React from 'react';

import './ErrorMessage.scss';

function ErrorMessage(props) {
    return (
        <div className="error-message">
            <h3>{props.errorTitle || 'Error'}</h3>
            <p>{props.errorMessage || ''}</p>
        </div>
    );
}

export default ErrorMessage;