import React from 'react';
import { Translation } from 'react-i18next';

import ErrorMessage from './ErrorMessage';

// the hooks have not yet been implemented for componentDidCatch
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            errorOccured: false,
            errorMessage: ''
         };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { errorOccured: true };
      }
    
    componentDidCatch(error, info) {
        this.setState({ errorMessage: error});
        console.error("Error info : " + JSON.stringify(info));
    }
    
    render() {
        if(this.state.errorOccured) {
            return (
                <Translation>
                    { t => <ErrorMessage errorTitle={t("error.title")} errorMessage={this.state.errorMessage && this.state.errorMessage.toString().slice(6)}/> }
                </Translation>
            );
        }
        return this.props.children;
    }
}

/**
 * Match the error string to a code error on client side, that is to be used by the translation module
 * @param {*} serverError 
 */
function matchServerToClientError(serverError) {    
    if(serverError.message.includes('The login is neither')) {
        return 'error.login-format';
    }
    else if(serverError.message.includes('database')) {
        return 'error.internal-server';
    } else if(serverError.message.includes('Failed to login')) {
        return 'error.login';
    } 
    return 'error.unknown';
}

export default ErrorBoundary;
export { matchServerToClientError };