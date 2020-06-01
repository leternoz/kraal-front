import React from 'react';

import { useTranslation } from 'react-i18next';

import './ErrorHandler.scss';

// the hooks have not yet been implemented for componentDidCatch
class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errorOccured: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { errorOccured: true };
      }
    
    componentDidCatch(error, info) {
        // TODO log the error
        this.setState({ errorOccured: true});
        console.error(error);
        console.log(info);
    }
    
    render() {
        // match the error message to the error caught
        if(this.state.errorOccured) {
            // const { t } = useTranslation();
            const errorMessage= '';
            return (
                <div class="error-container">
                    <h3>Error</h3>
                    <p>Something happened</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorHandler;